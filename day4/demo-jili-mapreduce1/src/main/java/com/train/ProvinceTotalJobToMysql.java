package com.train;

// 计算各个省份新能源汽车上牌总数量
//根据各个城市的上牌数据，计算得到各个省份的新能源汽车总数量

import com.google.gson.Gson;
import org.apache.hadoop.conf.Configuration;
import org.apache.hadoop.fs.Path;
import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.LongWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Job;
import org.apache.hadoop.mapreduce.Mapper;
import org.apache.hadoop.mapreduce.Reducer;
import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
import org.apache.hadoop.util.GenericOptionsParser;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;

//注意：类名是驼峰式命名法，并且首字母大写，名称要见闻知意

//Mapreduce计算结果存储到mysql中
public class ProvinceTotalJobToMysql {

//    MapReduce工作流程：
//    一、 Mapper阶段
//       目的：按行读取源文件
//     1 KEYIN：读取文件的位置（读取内容的偏移量）,
//       VALUEIN:读取的每行内容
//       KEYOUT：输出的key的数据类型
//       VALUEOUT：输出的value的数据类型

//    比如：读取的文件内容为：
//    Model Y,上海,3298
//    Model Y,成都,2439
//    Model Y,上海,2277
//    Model Y,北京,--
//    Model Y,成都,1355

//     输出的内容为：
//    <上海,3298>,<成都,2439>,<上海,2277>,<北京,1667>,<成都,1355>
    public static class ProvinceTotalMapper extends Mapper<LongWritable, Text,Text, IntWritable>{
//        快捷键：ctrl+o 打开继承类，重新map()
        private Text k=new Text();
        private IntWritable v=new IntWritable();
        private HashMap<String, List<String>> provinceMap=new HashMap<String, List<String>>();

//        在map()函数之前执行一次，初始化信息使用,读取省份和城市信息文件
        @Override
        protected void setup(Context context) throws IOException, InterruptedException {
           InputStream in= ProvinceTotalJobToMysql.class.getClassLoader()
                   .getResourceAsStream("province_city.txt");
            BufferedReader reader = new BufferedReader(new InputStreamReader(in));
            StringBuilder jsonContent = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                jsonContent.append(line);
            }
            // 将读取的 JSON 内容转换为 HashMap 对象
            Gson gson = new Gson();
            provinceMap = gson.fromJson(jsonContent.toString(), HashMap.class);
        }

        //根据城市名称获得省份名称
        private String getProvince(String cityName){
            for(String province:provinceMap.keySet()){
                List<String> cityList = provinceMap.get(province);
                for(String city:cityList){
                    if (city.equals(cityName) || city.contains(cityName)){
                        return province;
                    }
                }
            }
            return null;
        }

    @Override
        protected void map(LongWritable key, Text value, Context context) throws IOException, InterruptedException {
            if (key.get()==0){
                return;  //跳过第一行表头
            }
            String line = value.toString();  //读取每行数据
            String[] split = line.split(",");  //以逗号分割字符串
            if (split.length==3){  //判断数据的格式是否正确
                String province = getProvince(split[1]);
                if (province==null || province.trim().length()==0){
                    System.out.println("根据城市名称："+split[1]+",没有找到对应的省份名称");
                    return;
                }
                k.set(province);  //省份名称
                try {
                    int number=Integer.valueOf(split[2]);


                    v.set(number);  //上牌数量
                }catch (Exception e){
                    return;  //如果数量不是数字的，就跳过本行
                }
                context.write(k,v); //输出
            }
        }
    }
//    二 Reducer阶段
//    1 读取的mapper阶段的输出内容
//    读入的内容：<上海,3298>,<成都,2439>,<上海,2277>,<北京,1667>,<成都,1355>
//    在读入的时候，reducer会根据key进行分组，最后读入的值：
//   （<上海,3298>,<上海,2277>）,(<成都,2439>,<成都,1355>),(<北京,1667>)
//    2 reducer的输入的数据类型就是mapper的输出数据类型，reducer的输出数据类型，
//     上海：总销量
//      成都：总销量
//      北京：总销量
    public  static class ProvinceTotalReducer extends Reducer<Text, IntWritable,Text,IntWritable>{
        private IntWritable v=new IntWritable();
//        Text key:读入的key，Iterable<IntWritable> values：读入的value的集合

        private Connection conn = null;
        private PreparedStatement pstmt = null;
        // 数据库连接参数,mysql 8.0及以上版本使用
        private final String dbUrl = "jdbc:mysql://localhost:3306/jili-car" +
                "?allowPublicKeyRetrieval=true&characterEncoding=utf-8" +
                "&useSSL=false&serverTimezone=Asia/Shanghai";
//     mysql 8.0以下使用
    //        private final String dbUrl = "jdbc:mysql://localhost:3306/dazhouzhiye?characterEncoding=utf-8" +
//                "&useSSL=false&serverTimezone=Asia/Shanghai";
        private final String dbUsername = "root";  //数据库账户
        private final String dbPassword = "123456"; //密码

//        初始函数
        @Override
        protected void setup(Context context) throws IOException, InterruptedException {
            super.setup(context);
            try {
                // 加载MySQL驱动
                Class.forName("com.mysql.cj.jdbc.Driver");
                //mysql 8.0以下使用
    //                Class.forName("com.mysql.jdbc.Driver");
                // 建立数据库连接
                conn = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
                // 准备SQL插入语句
                pstmt = conn.prepareStatement("insert into `cat_province_total`(province,number) values(?,?)");
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        @Override
        protected void reduce(Text key, Iterable<IntWritable> values,
                              Context context) throws IOException, InterruptedException {
            int total=0;
            for (IntWritable value:values){
                total+=value.get(); //累加
            }


            // 插入统计结果到MySQL数据库
            try {
                pstmt.setString(1, key.toString());
                pstmt.setLong(2, total);
                pstmt.executeUpdate();
            }
            catch(SQLException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
            v.set(total);
            context.write(key,v);  //输出
        }
        // 执行之后的清理操作
        @Override
        protected void cleanup(Context context) throws IOException, InterruptedException {
            super.cleanup(context);
            try {
                // 关闭PreparedStatement和Connection对象
                pstmt.close();
                conn.close();
            }
            catch(SQLException e) {
                e.printStackTrace();
                throw new RuntimeException(e);
            }
        }
    }

    public static void main(String[] args) throws IOException, ClassNotFoundException, InterruptedException {
        Configuration configuration = new Configuration();
        Job job=Job.getInstance(configuration,"ProvinceTotalJob");
        job.setJarByClass(ProvinceTotalJobToMysql.class);

        job.setMapperClass(ProvinceTotalMapper.class);
        job.setReducerClass(ProvinceTotalReducer.class);

        //指定输出key的数据类型
        job.setOutputKeyClass(Text.class);
        //指定输出value的数据类型
        job.setOutputValueClass(IntWritable.class);
//        指定reducer的工作任务个数
//        job.setNumReduceTasks(2);

//        start --  Windows开发 测试环境路径
//        输入的文件路径
        String inputFilePath="src/main/java/com/train/car16888_data_registered_number_pool.csv";
//        注意:输出的文件目录的路径, 必须是一个不存在的目录
        String outputFilePath="src/main/java/com/train/out2";

//        注意: 导入的包是mapreduce里面的
//          import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
//          import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
        FileInputFormat.setInputPaths(job,new Path(inputFilePath));
        FileOutputFormat.setOutputPath(job,new Path(outputFilePath));
//        end --  Windows开发 测试环境路径

//        start -----  Linux下使用HDFS测试
//        使用命令输入参数的方式接收输入路径和输出目录
//        String[] otherArgs = new GenericOptionsParser(configuration, args).getRemainingArgs();
//        if (otherArgs.length < 2) {
//            System.err.println("参数错误");
//            System.exit(2);
//        }
//        //规定使用最后第二个参数是输入文件
//        FileInputFormat.addInputPath(job, new Path(otherArgs[otherArgs.length - 2]));
//        //规定使用最后一个参数是输出目录
//        FileOutputFormat.setOutputPath(job, new Path(otherArgs[(otherArgs.length - 1)]));
//        end -----  Linux下使用HDFS测试



        boolean b = job.waitForCompletion(true);
        if (b){
            System.out.println("ok......");
        }else{
            System.out.println("no ok..........");
        }

    }
}

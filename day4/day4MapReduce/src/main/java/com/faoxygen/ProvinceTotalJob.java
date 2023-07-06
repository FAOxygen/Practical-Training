package com.faoxygen;

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
import java.io.*;
import java.util.*;
import java.io.InputStream;
import java.io.IOException;
import java.util.HashMap;



/***
 * @author wjl
 * @desc 计算各个省份新能源汽车上牌总数量
 **/
public class ProvinceTotalJob {

    public static void main(String[] args) throws IOException, ClassNotFoundException, InterruptedException {
        Configuration conf = new Configuration();
        Job job = Job.getInstance(conf, "ProvinceTotalJob");
        job.setJarByClass(ProvinceTotalJob.class);
//      设置mapper类
        job.setMapperClass(ProvinceTotalMapper.class);
        job.setReducerClass(ProvinceTotalReducer.class);
//      设置输出的数据类型
        job.setOutputKeyClass(Text.class);
        job.setOutputValueClass(IntWritable.class);

//        job.setNumReduceTasks(2);

//          windows下测试
////        输入的路径可以是文件，目录，压缩包
//        String inputPath = "src/main/java/com/faoxygen/province/car_info.csv";
////        输出的路径必须是一个不存在的目录（mapreducer会自动创建这个目录，如果存在会报错）
//        String outPath = "src/main/java/com/faoxygen/province/out";
//        FileInputFormat.setInputPaths(job, new Path(inputPath));
//        FileOutputFormat.setOutputPath(job, new Path(outPath));

//        Linux下使用HDFS测试
//        使用命令输入参数的方式接收输入路径和输出目录
        String[] otherArgs = new GenericOptionsParser(conf, args).getRemainingArgs();
        if (otherArgs.length < 2) {
            System.err.println("参数错误");
            System.exit(2);
        }
        //规定使用最后第二个参数是输入文件
        FileInputFormat.addInputPath(job, new Path(otherArgs[otherArgs.length - 2]));
        //规定使用最后一个参数是输出目录
        FileOutputFormat.setOutputPath(job, new Path(otherArgs[(otherArgs.length - 1)]));

        boolean b = job.waitForCompletion(true);
        if (!b) {
            System.out.println("fail.................");
        } else
            System.out.println("ok....................");
    }


    public static class ProvinceTotalMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
        //    ctrl+o 快捷键
        private static final String PROVINCE_CITY_FILE = "province_city.txt";
        private HashMap<String, List<String>> provinceMap = new HashMap<String, List<String>>();
        private Text k = new Text();
        private IntWritable v = new IntWritable();

        //map函数执行之前执行（只执行一次）
        @Override
        protected void setup(Context context) throws IOException, InterruptedException {
            // 读取txt文件内容
            // 读取resources目录下的文件
            InputStream inputStream = ProvinceTotalJob.class.getClassLoader().getResourceAsStream("province_city.txt");
            try (BufferedReader br = new BufferedReader(new InputStreamReader(inputStream))) {
                StringBuilder jsonContent = new StringBuilder();
                String line;
                while ((line = br.readLine()) != null) {
                    jsonContent.append(line);
                }
                // 将读取的 JSON 内容转换为 HashMap 对象
                Gson gson = new Gson();
                provinceMap = gson.fromJson(jsonContent.toString(), HashMap.class);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }


        //根据城市名称获得省份名称
        private String getProvince(String cityName) {
            for (String province : provinceMap.keySet()) {
                List<String> list = provinceMap.get(province);
                for (String c : list)
                    if (c.equals(cityName)
                            || c.substring(0, c.length() - 1).equals(cityName)
                            || c.contains(cityName))
                        return province;
            }
            return null;
        }

        @Override
        protected void map(LongWritable key, Text value, Context context)
                throws IOException, InterruptedException {
            if (key.get() == 0)  //跳过第一行表头数据
                return;
            String line = value.toString(); //读取的每行数据
            String[] split = line.split(",");
            if (split.length == 3) {
                String city = split[1];
                String province = getProvince(city);
                if (province != null && province.trim().length() > 0) {
                    k.set(province);
                    v.set(Integer.valueOf(split[2]));
                    context.write(k, v);
                } else {
                    System.out.println("=======没有找到对应的省份名称，city=" + city + ",count=" + split[2]);
                }
            }
        }
    }

    public static class ProvinceTotalReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
        private IntWritable v = new IntWritable();

        @Override
        protected void reduce(Text key, Iterable<IntWritable> values, Context context)
                throws IOException, InterruptedException {
            int sum = 0;
            for (IntWritable value : values) {
                sum += value.get();  //累加数值
            }
            v.set(sum);
            context.write(key, v);
        }
    }


}

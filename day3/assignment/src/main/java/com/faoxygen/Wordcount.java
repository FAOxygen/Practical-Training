package com.faoxygen;

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

import java.io.IOException;

public class Wordcount {
    public static class WordcountMapper extends Mapper<LongWritable, Text, Text, IntWritable> {
        @Override
        protected void map(LongWritable key, Text value, Mapper<LongWritable, Text, Text, IntWritable>.Context context) throws IOException, InterruptedException {
            String line = value.toString();
            String[] words = line.split(",");
            for (String word : words) {
//结果（值，1） 这个1可以为后面累加统计使用
                context.write(new Text(word), new IntWritable(1));
            }
        }
    }
    public static class WordCountReducer extends Reducer<Text, IntWritable, Text, IntWritable> {
        @Override
        protected void reduce(Text key, Iterable<IntWritable> values, Context context) throws IOException, InterruptedException {
            Integer count = 0;
            for (IntWritable value : values) {
                count += value.get();
            }
            context.write(key, new IntWritable(count));
        }
    }

    public static void main(String[] args) throws IOException, ClassNotFoundException, InterruptedException {
        Configuration configuration = new Configuration();
        Job job = Job.getInstance(configuration, "wordcount");
        job.setJarByClass(Wordcount.class);

        job.setMapperClass(WordcountMapper.class);
        job.setReducerClass(WordCountReducer.class);

        //指定输出key的数据类型
        job.setOutputKeyClass(Text.class);
        //指定输出value的数据类型
        job.setOutputValueClass(IntWritable.class);
//        指定reducer的工作任务个数
//        job.setNumReduceTasks(2);

//        输入的文件路径
        String inputFilePath = "src/main/java/com/faoxygen/assignment.txt";
//        注意:输出的文件目录的路径, 必须是一个不存在的目录
        String outputFilePath = "src/main/java/com/faoxygen/out";

//        注意: 导入的包是mapreduce里面的
//          import org.apache.hadoop.mapreduce.lib.input.FileInputFormat;
//          import org.apache.hadoop.mapreduce.lib.output.FileOutputFormat;
        FileInputFormat.setInputPaths(job, new Path(inputFilePath));
        FileOutputFormat.setOutputPath(job, new Path(outputFilePath));
        boolean b = job.waitForCompletion(true);
        if (b) {
            System.out.println("ok......");
        } else {
            System.out.println("no ok..........");
        }

    }

}

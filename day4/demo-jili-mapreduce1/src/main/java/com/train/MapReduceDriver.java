package com.train;

import org.apache.hadoop.util.ProgramDriver;

/***
 * @author wjl
 * @date 2023/7/6
 * @desc mapreduce执行主类
 **/
public class MapReduceDriver {

    public static void main(String[] args) {
        int exitCode = -1;
        ProgramDriver pgd = new ProgramDriver();
        try {
//            利用输入的参数与反射机制运行设置的类的main
            pgd.addClass("my_province", ProvinceTotalJob.class, "this is my Province Total Job test");
//            pgd.addClass("my_wordcount", WordCountJob.class, "this is my word count  Job test");
            exitCode = pgd.run(args);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        System.exit(exitCode);
    }
}

package com.faoxygen;

import org.apache.hadoop.util.ProgramDriver;

public class MapReduceDriver {
    public static void main(String[] args) {
        int exitCode = -1;
        ProgramDriver pgd = new ProgramDriver();
        try {
//            利用输入的参数与反射机制运行设置的类的main
            pgd.addClass("ProvinceTotal", ProvinceTotalJob.class, "this is my Province Total Job test");
            exitCode = pgd.run(args);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        System.exit(exitCode);
    }

}

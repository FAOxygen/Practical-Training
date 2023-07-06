package com.example.demo.entity;

/***
 * @author wjl
 * @date 2023/7/6
 * @desc 实体类
 **/
public class Car {

    private int id;
    private String province;
    private int number;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }
}

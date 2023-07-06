package com.example.demo.controller;

import com.example.demo.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/***
 * @author wjl
 * @date 2023/7/6
 * @desc 控制层
 **/
@Controller
@RequestMapping("/chart")  //映射地址
public class ChartController {

    @Autowired  //依赖注入
    private ChartService service;

//    localhost:8080/chart/chartmap
    @GetMapping("/chartmap")
    @ResponseBody  //添加这个注解，返回的内容是json格式的字符串，不添加就返回的是一个视图（页面）
    public List chartMap(){
       return service.getChartMapData();
    }


}

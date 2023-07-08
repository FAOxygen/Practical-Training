package com.example.jilispringboot.controller;

import com.example.jilispringboot.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/chart")
public class ChartController {
    @Autowired
    private ChartService service;

    @GetMapping("/chartmap")
    @ResponseBody
    public List chartMap(){
        return service.getChartMapData();

    }
}

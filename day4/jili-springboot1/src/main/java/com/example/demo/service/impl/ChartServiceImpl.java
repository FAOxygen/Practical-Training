package com.example.demo.service.impl;

import com.example.demo.mapper.ChartMapper;
import com.example.demo.service.ChartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/***
 * @author wjl
 * @date 2023/7/6
 * @desc
 **/
@Service
public class ChartServiceImpl implements ChartService {
    @Autowired
    private ChartMapper mapper;

    @Override
    public List getChartMapData() {
        return mapper.getChartMapData();
    }
}

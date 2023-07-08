package com.example.jilispringboot.service.impl;

import com.example.jilispringboot.mapper.ChartMapper;
import com.example.jilispringboot.service.ChartService;
import org.apache.catalina.mapper.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChartServiceImpl implements ChartService {
    @Autowired
    private ChartMapper mapper;
    @Override
    public List getChartMapData() {

        return mapper.getChartMapData();
    }
}

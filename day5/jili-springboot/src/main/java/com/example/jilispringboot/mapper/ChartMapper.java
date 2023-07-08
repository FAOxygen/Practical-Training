package com.example.jilispringboot.mapper;

import com.example.jilispringboot.entity.Car;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

@Mapper
@Component
public interface ChartMapper {
    @Select("SELECT*FROM cat_province_total")
    public List<Car> getChartMapData();
}

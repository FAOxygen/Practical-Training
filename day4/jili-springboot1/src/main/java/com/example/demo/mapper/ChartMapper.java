package com.example.demo.mapper;

import com.example.demo.entity.Car;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Component;

import java.util.List;

/***
 * @author wjl
 * @date 2023/7/6
 * @desc
 **/
@Mapper
@Component
public interface ChartMapper {

    @Select("SELECT * FROM `cat_province_total`")
    public List<Car> getChartMapData();
}

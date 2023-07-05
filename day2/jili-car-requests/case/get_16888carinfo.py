# -*-coding:utf-8 -*-
import os
import random
import threading
import time
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime

import requests
from lxml import etree


def create_store_file():
    # 存储主页面数据
    file1 = os.getcwd() + '/car16888_multi_page_with_attr_data.csv'
    if os.path.exists(file1):
        os.remove(file1)  # 删除旧文件
    with open(file=file1, mode="w", encoding="utf-8") as f:
        f.write("车型,销量,厂商,最低价(万元),最高价(万元),历史销量,上牌数量\n")  # 新建文件

    # 存储历史销量数据
    file2 = os.getcwd() + '/car16888_data_historical_sales.csv'
    if os.path.exists(file2):
        os.remove(file2)  # 删除旧文件
    with open(file=file2, mode="w", encoding="utf-8") as f:
        f.write("车型,时间,月销量(俩)\n")

    # 存储城市上牌数据
    file3 = os.getcwd() + '/car16888_data_registered_number.csv'
    if os.path.exists(file3):
        os.remove(file3)  # 删除旧文件
    with open(file=file3, mode="w", encoding="utf-8") as f:
        f.write("车型,城市,上牌量\n")
    return file1, file2, file3


# 获取页面数据
def get_page_info(new_url, file1, file2, file3):
    print(datetime.now(), '======【开始】爬取页面url=', new_url)
    response = requests.get(url=new_url, headers=headers)
    tree = etree.HTML(response.text)
    list_li = tree.xpath('//table[@class="xl-table-def xl-table-a"]/tr')
    is_first = True
    result = "";
    historical_sales_url_dict = {}
    registered_number_url_dict = {}

    test_skip = 1
    for li in list_li:

        # # start 为了方便测试，只爬取主页前3条数据
        # if test_skip == 5:
        #     break
        # test_skip = test_skip + 1
        # # end 为了方便测试，只爬取主页前3条数据

        if is_first:
            is_first = False
            continue  # 跳过第一行表格表头
        # 车型
        car_model = li.xpath("./td[2]/a/text()")
        # 销量
        sale_number = li.xpath("./td[3]/text()")
        # 厂商
        factory = li.xpath("./td[4]/a/text()")
        # 价格
        price = li.xpath("./td[5]/a/text()")
        # 历史销量url /s/128864/
        historical_sales_url = li.xpath("./td[6]/div/a[1]/@href")
        # 上牌数量url  //xl.16888.com/city-2023-05-0-0-0-0-128864-1.html
        registered_number_url = li.xpath("./td[6]/div/a[2]/@href")
        car_model = car_model[0].strip() if len(car_model) >= 1 else ""
        sale_number = sale_number[0].strip() if len(sale_number) >= 1 else ""
        factory = factory[0].strip() if len(factory) >= 1 else ""
        price = price[0].strip() if len(price) >= 1 else ""
        # 最低价
        min_price = price.split("-")[0]
        # 最高价
        max_price = price.split("-")[-1]
        historical_sales_url = historical_sales_url[0].strip() if len(historical_sales_url) >= 1 else ""
        registered_number_url = registered_number_url[0].strip() if len(registered_number_url) >= 1 else ""
        historical_sales_url_dict[car_model] = historical_sales_url
        registered_number_url_dict[car_model] = registered_number_url
        result += car_model + "," + sale_number + "," + factory + "," + min_price + "," \
                  + max_price + "," + historical_sales_url + "," + registered_number_url + "\n"

    # 爬取一页数据就存储
    with open(file=file1, mode="a", encoding="utf-8") as f:
        f.write(result)
    print(datetime.now(), '======【结束】爬取页面url=', new_url)

    get_historical_sales_data(historical_sales_url_dict, file2)
    get_registered_number_data(registered_number_url_dict, file3)
    return result


# 采集历史销量数据
def get_historical_sales_data(dict_historical_sales, file):
    for model, value in dict_historical_sales.items():
        print(datetime.now(), "XXXXX【开始采集历史销量数据】,车型=", model)
        last_slash_index = value.rfind("/")  # 查找最后一个斜杠的索引位置
        if last_slash_index != -1:
            new_value = value[:last_slash_index] + "-{}.html"  # 将最后一个斜杠以及之后的部分替换
        data = ""
        found_data = True
        for i in range(1, 10):  # 每行50条数据，450包含10多年的月份了
            if found_data == False:
                break
            time.sleep(random.uniform(1, 3))  # 睡眠1到3之间小数
            new_url = "https://xl.16888.com" + new_value.format(i)
            print(datetime.now(), "XXXXX【采集历史销量数据】,url=", new_url)
            response = requests.get(url=new_url)
            if response.status_code == 200:
                tree = etree.HTML(response.text)
                list_li = tree.xpath('//table[@class="xl-table-def xl-table-a"]/tr')
                is_first = True
                for li in list_li:
                    if is_first:
                        is_first = False
                        continue  # 跳过第一行表格表头
                    if len(li.xpath("./td")) != 7:
                        found_data = False
                        break  # 没有相关数据
                    # 时间
                    date_time = li.xpath("./td[1]/text()")
                    # 月销量(辆)
                    month_sale = li.xpath("./td[2]/text()")
                    date_time = date_time[0].strip() if len(date_time) >= 1 else ""
                    month_sale = month_sale[0].strip() if len(month_sale) >= 1 else ""
                    if len(date_time) == 0 or len(month_sale) == 0:
                        continue
                    data += model + "," + date_time + "," + month_sale + "\n"
        if not os.path.isfile(file):
            with open(file=file, mode="w", encoding="utf-8") as f:  # 文件不存在就创建新文件
                f.write("车型,时间,月销量(俩)\n")
        with open(file=file, mode="a", encoding="utf-8") as f:
            f.write(data)
        print(datetime.now(), "XXXXX【结束采集历史销量数据】,车型=", model)


# 采集上牌数量数据
def get_registered_number_data(dict_registered_number, file):
    for model, value in dict_registered_number.items():
        print(datetime.now(), "######【开始采集上牌数量数据】,车型=", model)
        last_slash_index = value.rfind("-1.html")  # 查找位置
        if last_slash_index != -1:
            new_value = value[:last_slash_index] + "-{}.html"  # 替换
        data = ""
        found_data = True
        for i in range(1, 21):  # 每行50条数据，1000大于全国所有的城市数量
            if found_data == False:
                break
            time.sleep(random.uniform(1, 3))  # 睡眠1到3之间小数
            new_url = "http:" + new_value.format(i)
            print(datetime.now(), "######【采集上牌数量数据】,url=", new_url)
            response = requests.get(url=new_url)
            if response.status_code == 200:
                tree = etree.HTML(response.text)
                list_li = tree.xpath('//div[@class="mod-table g-mt10"]/table/tbody/tr')
                for li in list_li:
                    if len(li.xpath("./td")) != 7:
                        found_data = False
                        break  # 没有相关数据
                    # 城市
                    city = li.xpath("./td[3]/a/text()")
                    # 上牌量
                    number = li.xpath("./td[4]/a/em/text()")
                    city = city[0].strip() if len(city) >= 1 else ""
                    number = number[0].strip() if len(number) >= 1 else ""
                    if len(city) == 0 or len(number) == 0:
                        continue
                    number = convert_to_int(number)
                    if number == 0:
                        continue  # 没有销量就跳过
                    data += model + "," + city + "," + str(number) + "\n"
        if not os.path.isfile(file):
            with open(file=file, mode="w", encoding="utf-8") as f:  # 文件不存在就创建新文件
                f.write("车型,城市,上牌量\n")
        with open(file=file, mode="a", encoding="utf-8") as f:
            f.write(data)
        print(datetime.now(), "######【结束采集历史销量数据】,车型=", model)


# 把销量字符串转换为整数
def convert_to_int(string):
    try:
        integer = int(string)
        if integer < 0:
            integer = 0
        return integer
    except ValueError:
        return 0


# 爬取电动车销量排行榜 (2014.01 - 2023.05)翻页数据（含历史销量+上牌数据）并存储到文档
if __name__ == '__main__':
    start_time=datetime.now()
    print("***********开始时间：",start_time)
    file1, file2, file3 = create_store_file()
    url = "https://xl.16888.com/ev-201401-202305-{}.html"
    headers = {}
    for page in range(1, 2):
        time.sleep(random.uniform(1, 3))  # 睡眠1到3之间小数
        new_url = url.format(page)
        get_page_info(new_url, file1, file2, file3)

    end_time= datetime.now()
    print("***********结束时间：",end_time)
    print("***********时长：",end_time-start_time)
# -*-coding:utf-8 -*-
import random
import time
from datetime import datetime

import requests
from lxml import etree


# 爬取单页面数据
def get_single_page_info():
    # 爬取的网址
    url = "https://xl.16888.com/ev-201401-202305-1.html"
    # 使用requests发送请求并得到响应内容
    response = requests.get(url=url)
    # 只有响应状态为200的才是正确的响应
    # HTML()解析HTML页面
    tree = etree.HTML(response.text)
    # 建议同学们学会使用断点跟踪并调式代码
    list_tr = tree.xpath("//table[@class='xl-table-def xl-table-a']/tr")
    row_1 = True
    result = "车型,销量,厂商,价格,历史销量,上牌数量\n"
    for tr in list_tr:
        if row_1:  # 跳过第一行table表头
            row_1 = False
            continue
        # 车型
        model = tr.xpath("./td[2]/a/text()")
        # 销量
        number = tr.xpath("./td[3]/text()")
        # 厂商
        factory = tr.xpath("./td[4]/a/text()")
        # 价格
        price = tr.xpath("./td[5]/a/text()")
        # 历史销量url 采集的是属性的值:/s/128864/
        historical_sales_url = tr.xpath("./td[6]/div/a[1]/@href")
        # 上牌数量url  //xl.16888.com/city-2023-05-0-0-0-0-128864-1.html
        registered_number_url = tr.xpath("./td[6]/div/a[2]/@href")

        if len(model) > 0 \
                and len(number) > 0 \
                and len(factory) > 0 \
                and len(price) > 0 \
                and len(historical_sales_url) > 0 \
                and len(registered_number_url) > 0:
            model = model[0].strip()  # strip() 去掉前后空格及制表符等等
            number = number[0].strip()
            factory = factory[0].strip()
            price = price[0].strip()
            historical_sales_url = historical_sales_url[0].strip()
            registered_number_url = registered_number_url[0].strip()
            result = result + model + "," + number + "," + factory + "," + price + "," \
                     + historical_sales_url + "," + registered_number_url + "\n"
    file = "get_single_page_info.csv"
    # mode='a' 以追加的形式写入内容,如果csv中文乱码,把utf-8修改为utf-8-sig
    with open(file, mode='a', encoding="utf-8") as f:
        f.write(result)


# F8一步一步执行代码
# F9 跳转到下一个断点，如果没有断点了，就会继续执行并结束
# 使用  ctr+/  快捷注释
# 使用ctrl+alt+l 快捷格式化代码

# 爬取翻页数据
def get_multi_page_info():
    url = "https://xl.16888.com/ev-201401-202305-{}.html"

    result = "车型,销量,厂商,价格,历史销量,上牌数量\n"
    file = "get_mulit_page_info.csv"
    with open(file, mode='a', encoding="utf-8") as f:
        f.write(result)
    for page in range(1, 9):
        time.sleep(random.uniform(2, 4))  # 每页爬取的时候休眠几秒钟
        new_url = url.format(page)
        # get_page_info(new_url)  存储到文档中
        get_page_info_to_mysql(new_url) #存储到mysql数据库中

# 爬取翻页数据-获得每页数据-存储到文档中
def get_page_info(url):
    # 使用requests发送请求并得到响应内容
    print("========[开始爬取]url=", url)
    response = requests.get(url=url)
    # 只有响应状态为200的才是正确的响应
    # HTML()解析HTML页面
    tree = etree.HTML(response.text)
    # 建议同学们学会使用断点跟踪并调式代码
    list_tr = tree.xpath("//table[@class='xl-table-def xl-table-a']/tr")
    row_1 = True
    result = ""
    for tr in list_tr:
        if row_1:  # 跳过第一行table表头
            row_1 = False
            continue
        # 车型
        model = tr.xpath("./td[2]/a/text()")
        # 销量
        number = tr.xpath("./td[3]/text()")
        # 厂商
        factory = tr.xpath("./td[4]/a/text()")
        # 价格
        price = tr.xpath("./td[5]/a/text()")
        # 历史销量url 采集的是属性的值:/s/128864/
        historical_sales_url = tr.xpath("./td[6]/div/a[1]/@href")
        # 上牌数量url  //xl.16888.com/city-2023-05-0-0-0-0-128864-1.html
        registered_number_url = tr.xpath("./td[6]/div/a[2]/@href")

        if len(model) > 0 \
                and len(number) > 0 \
                and len(factory) > 0 \
                and len(price) > 0 \
                and len(historical_sales_url) > 0 \
                and len(registered_number_url) > 0:
            model = model[0].strip()  # strip() 去掉前后空格及制表符等等
            number = number[0].strip()
            factory = factory[0].strip()
            price = price[0].strip()
            historical_sales_url = historical_sales_url[0].strip()
            registered_number_url = registered_number_url[0].strip()
            result = result + model + "," + number + "," + factory + "," + price + "," \
                     + historical_sales_url + "," + registered_number_url + "\n"
    file = "get_mulit_page_info.csv"
    # mode='a' 以追加的形式写入内容,如果csv中文乱码,把utf-8修改为utf-8-sig
    with open(file, mode='a', encoding="utf-8") as f:
        f.write(result)
    print("========[结束爬取]url=", url)


# 爬取翻页数据-获得每页数据-存储到mysql数据库中
def get_page_info_to_mysql(url):
    # 使用requests发送请求并得到响应内容
    print("========[开始爬取]url=", url)
    response = requests.get(url=url)
    # 只有响应状态为200的才是正确的响应
    # HTML()解析HTML页面
    tree = etree.HTML(response.text)
    # 建议同学们学会使用断点跟踪并调式代码
    list_tr = tree.xpath("//table[@class='xl-table-def xl-table-a']/tr")
    row_1 = True
    result = []
    for tr in list_tr:
        if row_1:  # 跳过第一行table表头
            row_1 = False
            continue
        # 车型
        model = tr.xpath("./td[2]/a/text()")
        # 销量
        number = tr.xpath("./td[3]/text()")
        # 厂商
        factory = tr.xpath("./td[4]/a/text()")
        # 价格
        price = tr.xpath("./td[5]/a/text()")
        # 历史销量url 采集的是属性的值:/s/128864/
        historical_sales_url = tr.xpath("./td[6]/div/a[1]/@href")
        # 上牌数量url  //xl.16888.com/city-2023-05-0-0-0-0-128864-1.html
        registered_number_url = tr.xpath("./td[6]/div/a[2]/@href")

        if len(model) > 0 \
                and len(number) > 0 \
                and len(factory) > 0 \
                and len(price) > 0 \
                and len(historical_sales_url) > 0 \
                and len(registered_number_url) > 0:
            model = model[0].strip()  # strip() 去掉前后空格及制表符等等
            number = number[0].strip()
            factory = factory[0].strip()
            price = price[0].strip()
            historical_sales_url = historical_sales_url[0].strip()
            registered_number_url = registered_number_url[0].strip()
            result.append((model,number,factory,price,historical_sales_url,registered_number_url))

    # 保存数据库到mysql数据库中
    save_page_info(result)
    print("========[结束爬取]url=", url)


import pymysql


# 获得操作mysql数据库的对象
def getMysqlConn():
    # host = '127.0.0.1'  主机ip
    # port = 3306 端口号
    # user = 'root' 数据库账户
    # password = '123456' 数据库密码
    # db = 'jili-car' 数据库名称
    # charset = 'utf8' 编码格式
    conn = pymysql.connect(host='127.0.0.1', port=3306, user='root',
                           password='123456', db='jili-car', charset='utf8')
    # 创建操作的游标
    cursor = conn.cursor();
    # 设置字符编码及自动提交
    cursor.execute('set names utf8')  # 固定格式
    cursor.execute('set autocommit=1');  # 设置自动提交
    return conn, cursor

# 把数据存储到mysql数据库中，要求数据为元组数据集合
def save_page_info(dataList):
    print("======【开始】mysql插入数据")
    conn, cursor = getMysqlConn()
    sql = "insert into `car_main_info`(`model`,`sale_number`,`factory`,`price`," \
          "`historical_sales_url`,`registered_number_url`) " \
          "values(%s,%s,%s,%s,%s,%s)";
    for data in dataList:
        # 获取元组数据替换占位符存储到mysql中,这里的data的数据格式为元组 (''，''，'')
        cursor.execute(sql, data)
    # 关闭连接
    cursor.close()
    conn.close()
    print("======【结束】mysql插入数据")


if __name__ == '__main__':
    # get_single_page_info()
    start_time = datetime.now()
    print(start_time, "********[开始爬取数据]*********")
    get_multi_page_info()
    end_time = datetime.now()
    print(end_time, "********[结束爬取数据]*********")
    print("数据爬取完成,耗时:", end_time - start_time)

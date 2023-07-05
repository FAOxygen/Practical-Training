# -*-coding:utf-8 -*-
import os
import random
import time
from datetime import datetime

import requests
from lxml import etree


# 获取页面数据
def get_page_info():
    print(datetime.now(), '======【开始】爬取页面url=', new_url)
    response = requests.get(url=new_url, headers=headers)
    tree = etree.HTML(response.text)
    list_li = tree.xpath('//table/tbody/tr')
    is_first = True
    result = ""
    for li in list_li:
        if is_first:
            is_first = False
        # 车型
        car_model = li.xpath("./td[2]/a/text()")
        # 城市
        city = li.xpath("./td[3]/a/text()")
        # 上牌量
        num = li.xpath("./td[4]/a/em/text()")
        car_model = car_model[0].strip() if len(car_model) >= 1 else ""
        city = city[0].strip() if len(city) >= 1 else ""
        num = num[0].strip() if len(num) >= 1 else ""
        result += car_model + "," + city + "," + num + "," + "\n"
    print(result)
    print(datetime.now(), '======【结束】爬取页面url=', url)
    return result


# 爬取电动车销量排行榜 (2014.01 - 2023.05)翻页数据并存储
if __name__ == '__main__':
    file = os.getcwd() + '/211123110701-谷承锴-全国宏光MINIEV上牌数据.csv'
    if os.path.exists(file):
        os.remove(file)  # 删除旧文件
    with open(file=file, mode="w", encoding="utf-8-sig") as f:
        f.write("车型,城市,上牌量\n")  # 新建文件

    url = "https://xl.16888.com/city-2023-05-0-0-0-0-128864-{}.html"
    headers = {}
    for page in range(1, 6):
        time.sleep(random.uniform(1, 3))  # 睡眠1到3之间小数
        new_url = url.format(page)
        data = get_page_info()
        # 爬取一页数据就存储
        with open(file=file, mode="a", encoding="utf-8-sig") as f:
            f.write(data)

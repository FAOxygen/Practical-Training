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
    list_li = tree.xpath('//table[@class="xl-table-def xl-table-a"]/tr')
    is_first = True
    result = ""
    for li in list_li:
        if is_first:
            is_first = False
            continue  # 跳过第一行表格表头
        # 时间
        sj = li.xpath("./td[1]/text()")
        # 销量
        sale_number = li.xpath("./td[2]/text()")
        sj = sj[0].strip() if len(sj) >= 1 else ""
        sale_number = sale_number[0].strip() if len(sale_number) >= 1 else ""
        result += sj + "," + sale_number + "\n"
    print(result)
    print(datetime.now(), '======【结束】爬取页面url=', url)
    return result


if __name__ == '__main__':
    file = os.getcwd() + '/211123110701-谷承锴-吉利新能源汽车销量数据.csv'
    if os.path.exists(file):
        os.remove(file)  # 删除旧文件
    with open(file=file, mode="w", encoding="utf-8-sig") as f:
        f.write("时间,销量(辆)\n")  # 新建文件

    url = "https://xl.16888.com/f/128270-{}.html"
    headers = {}
    for page in range(1, 3):
        time.sleep(random.uniform(1, 3))  # 睡眠1到3之间小数
        new_url = url.format(page)
        data = get_page_info()
        # 爬取一页数据就存储
        with open(file=file, mode="a", encoding="utf-8") as f:
            f.write(data)

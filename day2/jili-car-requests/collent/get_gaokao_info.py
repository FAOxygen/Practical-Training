# -*-coding:utf-8 -*-
import json
import random
import time
from datetime import datetime

import requests
from lxml import etree

# 获取动态json格式的数据
def get_json_info():
    # 如果出现防爬机制造成请求失败，那么可以尝试使用简单的模拟浏览器发送请求方式解决
    header = {
        "Accept": "application / json, text / plain, * / *"
        ,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36"
    }
    url = "https://api.eol.cn/gkcx/api?local_province_id=11&min=1&page=6&province_id=&school_type=&signsafe=c9f272b8e1f2367447b5272d0ac62b63&size=12&uri=apidata/api/gk/score/province&year=2022&"
    res = requests.get(url, headers=header)
    json_datas = json.loads(res.text)
    item = json_datas['data']['item'][0]
    for k, v in item.items():
        print('%s:%s' % (k, v))


if __name__ == '__main__':
    get_json_info()

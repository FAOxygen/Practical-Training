from pyecharts.charts import Bar
from pyecharts import options as opts

bar = (
    Bar()
        .add_xaxis(["python开发工程师", "hadoop开发工程师", "spark开发工程师", "scala开发工程师", "机器学习开发工程师"])
        .add_yaxis("微软提供的职位数", [20, 35, 15, 5, 50])
        .add_yaxis("三星提供的职位数", [55, 25, 30, 45, 80])
        .set_global_opts(title_opts=opts.TitleOpts(title="科技企业招聘职位数"))
)
bar.render()

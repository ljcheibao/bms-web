### 积木系统各页面介绍

#### 站点管理

搭建的任何一个页面，都是隶属于某一个站点，从站点列表中点击【进入站点】就可以看到该站点下面的所有搭建的页面。任何一个系统管理角色，都可以拥有多个站点的页面管理能力，只要被赋予权限

![image](https://github.com/ljcheibao/bms-web/blob/master/docs/images/website.png)

#### 页面管理

这里管理着隶属于某一个站点的所有页面，在页面管理模块，用户进行可以创建页面，编辑页面，预览页面，以及搭建页面

![image](https://github.com/ljcheibao/bms-web/blob/master/docs/images/page.png)

#### 母版管理(母版设置尚未开发)

母版管理这个是针对开发者而设置的，所谓母版，是某几个或者所有页面通用部分的管理。**注意：母版中某块内容占位符的容器必须要以place标明，且必须唯一，比如:**
```html
<!DOCTYPE html>

<html lang="en">

<head>

 <meta charset="UTF-8">

 <meta name="keyword" content="积木世界，积木">

 <meta name="description" content="积木世界，积木">

 <title>积木世界</title>
<link rel="stylesheet" href="http://www.51qututu.com/libs/bootstrap/css/bootstrap.min.css">
</head>

<body>

 <div class="main" place="first">

 </div>

 <div class="right" place="second">

 </div>
</body>
</html>
```

![image](https://github.com/ljcheibao/bms-web/blob/master/docs/images/master.png)

#### 页面搭建

页面搭建是赋予给运营根据自己需要，选择不同页面模块，自由搭建页面的一个可视化模块，这也是积木系统的核心。

![image](https://github.com/ljcheibao/bms-web/blob/master/docs/images/design.png)

#### 模块

运营在进入页面搭建的时候，点击模块增加按钮【+】会弹出系统中已有的模块，供运营选择

![image](https://github.com/ljcheibao/bms-web/blob/master/docs/images/addmodule.png)



同时，可以自由对页面中的模块进行排序、对页面中的模块进行数据的编辑

![image](https://github.com/ljcheibao/bms-web/blob/master/docs/images/sortmodule.png)

#### 页面预览

搭建完页面以后，可以进行页面预览，查看页面搭建的实际效果

![image](https://github.com/ljcheibao/bms-web/blob/master/docs/images/preview.png)

#### 页面发布记录

这里记录了一个用户发布的所有页面，并且给用户提供了在发布的多个页面版本间切换的能力，以达到线上页面回滚的目的

![image](https://github.com/ljcheibao/bms-web/blob/master/docs/images/history.png)

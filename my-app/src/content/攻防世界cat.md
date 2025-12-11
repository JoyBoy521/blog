---
isOriginal: true
date: 2024-02-29
---



# 攻防世界cat

<!-- more -->



![001](/ctf/cat/001.png)

下载后打开压缩包，发现里面有两个文件。

然后看到图片以为是高度隐藏了，试了之后，发现并没有什么东西。

![image-20240229134301265](/ctf/cat/002.png)

然后拖到 formost分离，也没有什么任何东西分离出来。

最后看了一下wirteup，发现了这是新的东西。

写这篇文章就是怕自己忘了，并总结一下。

![](/ctf/cat/003.png)

发现了可以用strings查找可打印的字符串。

就试了一下

![image-20240229135229265](/ctf/cat/004.png)

发现有个 passwordis..catflag..]

密码是 catflag。

不知道密码有什么用

然后记事本我还没有看，名字是 ‘我养了一只叫兔子的91岁的猫猫’

打开记事本也是一脸的懵逼。

![image-20240229135514977](/ctf/cat/005.png)

然后还是根据wirteup知道了一个兔子加密。刚好记事本名字也有兔子。

![image-20240229135632806](/ctf/cat/006.png)

这时候密码也就派上了用场。

![image-20240229135740163](/ctf/cat/007.png)

```
]DW35W/HqUYt3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_o6cTf=[BBo!9/qB>ie50F%*6Y@Flxax*L.IzI9g1RLRX~PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s){{9y|u5.cL]D)=9W/Hr%Rt3P_ow"3P_o%"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzIwX1RLRf%PjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%Rt3P_ow"3P_o%"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)QI8y|u@^eL]D(g2W/Hr%Rt3P_ow"3P_o%"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWis}f+s)d[8y|u@^eL]D(g2W/HqUYt3P_o%"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxax*L.IzI9g1RLRX~PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/qB>ie50F%*6Y@Flxax*L.IzI9g1RLRX~PjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%Rt3P_oj"3P_oj"3P_otcTf=[jBo!9/DC>ie50F%*6Y@FlxaxeQ.IzI5s1RLRFvPjWiIEf+s)QI8y|u5.cL]D)=9W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzIwX1RLRX~PjWiIEf+s)QI8y|u5.cL]D)=9W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxcW.IzI9g1RLRX~PjWiIEf+s)d[8y|u@^eL]DW35W/HqUYt3P_oj"3P_ow"3P_o;cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWiIEf+s){{9y|uhQbL]D(g2W/HqUYt3P_o%"3P_oj"3P_otcTf=[&AUf=[&AUf=[&AUf=[&AUf=[jBo!9/DC>ie50F%*6Y@FlxaxeQ.IzI5s1RLRFvPjWiIEf+s)QI8y|uhQbL]D(gLH/Hr%Rt3P_oj"3P_oj"3P_oj"3P_oj"3P_oj"3P_ow"3P_o%"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)QI8y|u@^eL]D(g2W/Hr%Rt3P_ow"3P_o%"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_o%"3P_o6cTf=[jBo!9/qB>ie5HE%*6YOLlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_oj"3P_ow"3P_o;cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_oj"3P_o;cTf=[&AUf=[&AUf=[BBo!9/,C>ie5`C%*6Y@Flxax*L.IzIwX1RLRFvPjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%Rt3P_otcTf=[&AUf=[jBo!9/DC>ie50F%*6Y@FlxaxeQ.IzI5s1RLRFvPjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%Rt3P_oj"3P_o6cTf=[jBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]D(g2W/Hr%gt3P_oj"3P_oj"3P_o6cTf=[jBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u@^eL]DW35W/Hr%gt3P_oj"3P_ow"3P_o;cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)QI8y|u5.cL]D)=9W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/Hr%Rt3P_o%"3P_oj"3P_otcTf=[BBo!9/,C>ie5`C%*6Y@Flxax*L.IzIwX1RLRFvPjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%Rt3P_oj"3P_oj"3P_otcTf=[&AUf=[jBo!9/DC>ie50F%*6Y@FlxaxeQ.IzI5s1RLRFvPjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%Rt3P_oj"3P_otcTf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[BBo!9/,C>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.0D]DW35W/HqUYt3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_oj"3P_o%"3P_oj"3P_oj"3P_ow"3P_o;cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/,C>ie5HE%*6YOLlxax*L.IzI9g1RLRX~PjWi8of+s)d[8y|u5.cL]DW35W/Hr%Rt3P_ow"3P_o%"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)QI8y|u@^eL]D(g2W/Hr%Rt3P_ow"3P_o%"3P_otcTf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[jBo!9/DC>ie50F%*6Y@FlxaxeQ.IzI5s1RLRFvPjWiIEl)s)QI8y|uhQbL]D(g2W/Hr%Rt3P_oj"3P_oj"3P_oj"3P_ow"3P_oj"3P_oj"3P_oj"3P_oj"3P_oj"3P_oj"3P_otcTf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[BBo!9/,C>ie5Ix7*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_oj"3P_o%"3P_oj"3P_oj"3P_o6cTf=[jBo!9/qB>ie5`C%*6Y@Flxax*L.IzIwX1RLRFvPjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%gt3P_ow"3P_o%"3P_otcTf=[BBo!9/,C>ie5`C%*6Y@Flxax*L.IzIwX1RLRFvPjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%Rt3P_oj"3P_oj"3P_otcTf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[BBo!9/,C>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%SiWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_oj"3P_o%"3P_oj"3P_oj"3P_o6cTf=[jBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[jBo!9/DC>ie50F%*6Y@FlxaxeQ.IzI5s1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxax*L.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzIwX1RLRf%PjWis}f+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxax*L.IzI5s1RLRFvPjWiIEf+s)d[8y|u@^eL]D(g2W/Hr%Rt3P_oj"3P_oj"3P_otcTf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[jBo!9/DC>ie50F%*6Y@FlxaxeQ.IzI5s1RLRFvPjWiIEf+s)QI8y|u5.0D]DW35W/HqUYt3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_ow"3P_oj"3P_ow"3P_o%"3P_ow"3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzIwX1RLRX~PjWiIEf+s)QI8y|u5.cL]D)=9W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxcW.IzI9g1RLRX~PjWiIEf+s)d[8y|u@^eL]DW35W/HqUYt3P_ow"3P_ow"3P_otcTf=[BBo!9/qB>ie5`C%*6Y@FlxaxeQ.IzI5s1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_oj"3P_o;cTf=[&AUf=[&AUf=[BBo!9/,C>ie5`C%*6Y@Flxax*L.IzIwX1RLRFvPjWiIEf+s){{9y|u5.cL]D)=9W/Hr%Rt3P_o6cTf=[jBo!9/qB>ie5`C%*6Y@Flxax*L.IzIwX1RLRFvPjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%Rt3P_oj"3P_oj"3P_o6cTf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[BBo!9/xY;ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|uhQbL]DW35W/Hr%Rt3P_oj"3P_oj"3P_oj"3P_oj"3P_o6cTf=[jBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]D(g2W/Hr%gt3P_oj"3P_oj"3P_o6cTf=[jBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u@^eL]DW35W/Hr%gt3P_oj"3P_ow"3P_o;cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRFvPjWi8of+s){{9y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6Y@FlxaxcW.IzIwX1RLRFvPjWi8of+s){{9y|uhQbL]D(g2W/Hr%Rt3P_oj"3P_oj"3P_otcTf=[&AUf=[&AUf=[jBo!9/DC>ie50F%*6Y@FlxaxeQ.IzI5s1RLRFvPjWiIEf+s)QI8y|u5.cL]D(g2W/Hr%Rt3P_otcTf=[&AUf=[&AUf=[BBo!9/,C>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/Hr%Rt3P_o;cTf=[&AUf=[&AUf=[BBo!9/,C>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]D)=9W/HqUYt3P_o;cTf=[&AUf=[BBo!9/,C>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)QI8y|u5.cL]D)=9W/HqUYt3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/qB>ie50F%*6Y@Flxax*L.IzI9g1RLRX~PjWiIEf+s)QI8y|uhQbL]D(g2W/Hr%Rt3P_oj"3P_oj"3P_otcTf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[&AUf=[jBo!9/DC>ie50F%*6Y@FlxaxeQyIzI5s1RLRFvPjWiIEf+s)QI8y|uhQbL]D(g2W/HqUYt3P_oj"3P_ow"3P_oj"3P_ow"3P_o%"3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/qB>ie50F%*6Y@Flxax*L.IzI9g1RLRX~PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]D)=9W/HqUYt3P_o%"3P_oj"3P_o6cTf=[jBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)d[8y|u5.cL]DW35W/HqUYt3P_ow"3P_ow"3P_o6cTf=[BBo!9/DC>ie5HE%*6YPIlxaxeQ.IzI9g1RLRf%PjWi8of+s)QI8y|u5.cL]D)=9W/HqUYtA
```

得到这么一串东西

不知道是什么编码，一般我都是从base开始下手，名字里面有91，我们先试一下base91.

![image-20240229140010140](/ctf/cat/008.png)

把结果复制到记事本上，然后把cat全部替换为ook。

![image-20240229140115319](/ctf/cat/009.png)

然后解密ook。

得到

![image-20240229140211417](/ctf/cat/010.png)

```
CATCTF{Th1s_V3ry_cute_catcat!!!}
```



##### 总结

1.  知道了strings工具。
2. 知道了兔子加密。
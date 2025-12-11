---
isOriginal: true
date: 2024-09-22
---

# 御网杯

## ez_apk

主要代码如下。

<!-- more -->

![image-20240923014852111](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923014852111.png)

看代码，我们需要key和cipher。

![image-20240923014159572](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923014159572.png)

```
cipher= **f`vgvkXknxfznQv|gz|}c|G~bh{{x|VVFGX**

key=**aptxcony**
```

字符串找到后，就可以根据代码解题。

```java
    public void onStart() {
        super.onStart();
        String string = getString(C0340R.string.cipher);
        byte[] bytes = string.getBytes();
        for (int i = 0; i < string.length(); i++) {
            bytes[i] = (byte) (bytes[i] ^ i);
        }
        this.cipher = new String(bytes);
    }

```

这里对cipher进行异或了。

```java
 public boolean checkcin(String str)//传入了我们输入的字符串 {
        byte[] bytes = getString(C0340R.string.key).getBytes();
        char[] charArray = str.toCharArray(); //我们输入的字符串
        char[] cArr = new char[charArray.length];
        for (int i = 0; i < charArray.length; i++) {
            if (charArray[i] == '_' || charArray[i] == '{' || charArray[i] == '}') {
                cArr[i] = charArray[i];  //是_ { }  的话 就不变
            } else {
                if (charArray[i] < 'a' || charArray[i] > 'z') {
                    break;   //不是小写字母就跳出循环
                }
                cArr[i] = (char) (((((bytes[i % bytes.length] - 97) + charArray[i]) - 97) % 26) + 97);   //咱们输入的一定是字母，又%26了，所以一直在26个字母里循环，下面写代码有用到。                       
            }
        }
        return this.cipher.equals(new String(cArr));//最后进行比较，返回比较结果。

```

我们现在能求出变化后的cipher，知道了key，然后能倒回去求出str，也就是flag。

还原字符串遇到坑了，还原出来的是错的。

在网上搜索，突然发现原题了。

[2021山东省大学生网络技术大赛网络安全赛道决赛WP_-CSDN博客](https://blog.csdn.net/q20010619/article/details/120939448)
最下面有他们写的代码。



```python
cipher = 'f`vgvkXknxfznQv|gz|}c|G~bh{{x|VVFGX'
flag = ''
for i in range(0,len(cipher)):
    cipher2 += chr(ord(cipher[i:i+1]) ^ i)
print(cipher2)

//fatd{sm_cgrmvc_ylvhokhuk_gxsgffc_wtec}
```

```python
cipher = ['f', 'a', 't', 'd', '{', 's', 'm', '_', 'c', 'g', 'r', 'm', 'v', 'c', '_', 'y', 'l', 'v', 'h', 'o', 'k', 'h', 'u', 'k', '_', 'g', 'x', 's', 'g', 'f', 'f', 'c', '_', 'w', 't', 'e', 'c', '}']
key = ['a', 'p', 't', 'x', 'c', 'o', 'n', 'y']
flag = ''
for i in range(0,len(cipher)):
    if ((cipher[i] != '_') and (cipher[i] != '{') and (cipher[i] != '}')):
        if (cipher[i] < key[i % len(key)]):
            flag += chr((ord(cipher[i]) - ord(key[i % len(key)]) + 26) % 26 + 97)
            //如果不加26的话，会出现负数，然后不会出现字符。也是容易出错的一步。
            如果理解不了，根据前面源代码，flag一定是小写字母。
   
        else:
            flag += chr((ord(cipher[i]) - ord(key[i % len(key)]))  % 26 + 97)
    else:
        flag += cipher[i]
print(flag)

```

在理解不了上面为啥还加26的话，举个例子，

```
 cArr[i] = (char) (((((bytes[i % bytes.length] - 97) + charArray[i]) - 97) % 26) + 97);   
```

上面的flag是charArray[i]。 -97是想让他们在27范围内(26个字母)，最后再加97是转换为字母的ASCII码。

比如  (25+2)%26=1， 这个算法就是 25+2先比较26，大了就减26，所以说，反过来，要先比较一下，小了就加26

flag{ez_crypto_algorithm_reverse_haha}

## 叮当猫

用IDA64打开

![image-20240923162432772](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923162432772.png)

发现了一些没看懂的函数参数。

网上查了一下。

![image-20240923163819058](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923163819058.png)

有可能用了Pyinstaller打包成exe了。

![image-20240923163954426](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923163954426.png)

我们下载 pyinstxtractor.py提取出来

![image-20240923164123784](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923164123784.png)

提取出来后，放到网页工具里反编译，然后复制代码。

![image-20240923164218780](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923164218780.png)

![image-20240923164307407](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923164307407.png)

运行代码，发现画了一个哆啦A梦

![image-20240923164430816](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923164430816.png)

末尾有个这个

![image-20240923164443006](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923164443006.png)

cyberchef一把嗦

![image-20240923164644925](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923164644925.png)

发现有点倒转，加个倒转。

![image-20240923164707776](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923164707776.png)

![image-20240923164859040](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923164859040.png)

flag{HNCTFdw3b08416PKvydw3b08416PK}

## 😎CSMazeee

放到die里看

![image-20240924003641320](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924003641320.png)

发现有壳。去网上查一下名称。

![image-20240924003838357](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924003838357.png)

发现脱net壳，好像都会需要用到de4net，

![image-20240924080652306](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924080652306.png)

![image-20240924080402558](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924080402558.png)

我们去github下载最新版

![image-20240924080740019](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924080740019.png)

![image-20240924080859952](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924080859952.png)

然后.net core构建一下。构建的时候他有两个方案一个netframework,一个netcore，我不知道怎么指定，所以我用哪个就把另一个给删除了，就构建成功了。在构建不成功就装一下Visual Studio 2022 里面弄个C的环境。

然后把程序托上去，

![image-20240924080938243](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924080938243-1727136737266-1.png)

![image-20240924081059544](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924081059544.png)

发现.net壳没了。

![image-20240924081136015](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924081136015.png)

然后放到dnspy分析，这里可以看到，要点100下按钮，才能生成迷宫地图。（真恶心）

![image-20240923233508176](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923233508176.png)

在这里下断点，然后动调，然后再点100下，会出现这个局部变量，显而易见array就是生成的迷宫

![image-20240923234342094](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240923234342094.png)

然后在内存中显示。

![image-20240924000252797](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924000252797.png)

![image-20240924000344119](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924000344119.png)

这就是迷宫。

![image-20240924000556231](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924000556231.png)

可以推测出 u是上  d 是下 l是左  r是右。

```
00******0000
*000000*0**0
******0*0**0
**100*000**0
****0******0
****00000000                             
```

走出迷宫
rdrrrrrddrruuurrrdddddllllllluull

输入然后重新点100下（这一百下真恶心）

![image-20240924002719164](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924002719164.png)

## 文件分析

![image-20240924163810346](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924163810346.png)

输出方程组的结果。

然后用python解开方程组。

```python
from z3 import *

flag = [Int(f'p{i}') for i in range(12)]
solver = Solver()

solver.add(And([p >= 0 for p in flag]))
solver.add(And([p <= 255 for p in flag]))
solver.add(flag[0] + flag[1] == 101)
solver.add(flag[1] + flag[2] == 143)
solver.add(flag[0] * flag[2] == 5035)

solver.add(flag[3] + flag[5] == 163)
solver.add(flag[3] + flag[4] == 226)
solver.add(flag[4] * flag[5] == 5814)

solver.add(flag[7] + flag[8] == 205)
solver.add(flag[6] + flag[8] == 173)
solver.add(flag[6] * flag[7] == 9744)

solver.add(flag[9] + flag[10] * flag[11] == 5375)
solver.add(flag[10] + flag[9] * flag[11] == 4670)
solver.add(flag[9] + flag[10] ==205)

if solver.check() == sat:
    model = solver.model()
    solution = ''.join(chr(model[p].as_long()) for p in flag)
    print("Found password:", solution)
else:
    print("No solution found")
    
Found password: 50_pr3TtY_n0
```

![image-20240924171832968](/ctf/%E5%BE%A1%E7%BD%91%E6%9D%AF/image-20240924171832968.png)

记得加上最后的w就可以了。

`flag{50_pr3TtY_n0w}`


---
isOriginal: true
date: 2024-06-01
---

# ISCC RE

### Which is the flag

<!-- more -->

![image-20240601174411160](/ctf/ISCC-RE/which-is-the-flag/image-20240601174411160.png)

发现有反调试和MD5校验。

咱们先在开头下断点，然后通过修改rip，来跳过反调试，和MD5对比的阶段(注意不能直接跳过MD5全部过程)

动调的时候如果缺环境，去下mingw

![image-20240601174733883](/ctf/ISCC-RE/which-is-the-flag/image-20240601174733883.png)

我们可以看到反调试函数后面的地址，把地址复制给rip，就可以跳到那里。但是在这之前，我们要动调到调用反调试函数之前，F8步进。

![image-20240601175132416](/ctf/ISCC-RE/which-is-the-flag/image-20240601175132416.png)

然后换rip地址跳过去。

![077003a538c3eb322a4827f10764b155_720](/ctf/ISCC-RE/which-is-the-flag/077003a538c3eb322a4827f10764b155_720.jpg)

然后中间会卡住，叫我输入东西。少于等于24个就可以了。

![image-20240601175337999](/ctf/ISCC-RE/which-is-the-flag/image-20240601175337999.png)

![image-20240601175531572](/ctf/ISCC-RE/which-is-the-flag/image-20240601175531572.png)

动调到这里，有个判断，咱们直接跳过判断。还是修改rip指针。

![image-20240601175537264](/ctf/ISCC-RE/which-is-the-flag/image-20240601175537264.png)

去汇编界面，会发现没有到jz跳转那里，我们动调到这里，然后修改rip，跳过他。

![image-20240601175629654](/ctf/ISCC-RE/which-is-the-flag/image-20240601175629654.png)

直接动调完，然后会出现ISCC。

提交发现不对

![image-20240531203758333](/ctf/ISCC-RE/which-is-the-flag/image-20240531203758333.png)

放进cyberchef一把过

![f09862665ed058b7f32f7ab8acef3841](/ctf/ISCC-RE/which-is-the-flag/f09862665ed058b7f32f7ab8acef3841.png)
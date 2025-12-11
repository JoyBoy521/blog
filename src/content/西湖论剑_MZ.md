---
isOriginal: true
date: 2024-02-07
---



# 西湖论剑 MZ

<!-- more -->

直接拖进ida里

![](/ctf/MZ/001.png)

查看main函数



```cpp
int __cdecl main(int argc, const char **argv, const char **envp)
{
  char v4; // [esp+0h] [ebp-26Ch]
  int v5; // [esp+D0h] [ebp-19Ch]
  unsigned __int8 v6; // [esp+DFh] [ebp-18Dh]
  int i; // [esp+E8h] [ebp-184h]
  char Buf1[52]; // [esp+F4h] [ebp-178h] BYREF
  _BYTE v9[264]; // [esp+128h] [ebp-144h] BYREF
  char Str[56]; // [esp+230h] [ebp-3Ch] BYREF

  __CheckForDebuggerJustMyCode(&unk_444018);
  memset(Str, 0, 0x31u);
  memset(v9, 0, 0x100u);
  memset(Buf1, 0, 0x29u);
  sub_401020();
  sub_434D00("%48s", (char)Str);
  if ( strlen(Str) != 48 )
  {
    sub_434C80("Wrong length\n", v4);
    exit(0);
  }
  for ( i = 0; i < 48; ++i )
  {
    v6 = Str[i];
    v5 = off_439000[2 * v6];
    if ( v6 - 5 == v5 )
    {
      v9[i] = ~(v6 + 1);
    }
    else
    {
      if ( v6 + 5 != v5 )
      {
        sub_434C80("Wrong flag\n", v4);
        exit(0);
      }
      v9[i] = ~(v6 - 1);
    }
    off_439000 = (int *)off_439000[2 * v6 + 1];
  }
  sub_434190((int)v9, 48, 0, Buf1);
  if ( !memcmp(Buf1, aDc0562f86bec0a, 0x28u) )
    sub_434C80("Right, the flag is DASCTF{%s}\n", (char)Str);
  else
    sub_434C80("Wrong flag\n", v4);
  return 0;
}
```

一开始初始化了三个值，分别是Str,v9和Buf1。

  sub_401020这个函数我点进去，加载了好一会

![image-20240206162815202](/ctf/MZ/002.png)

进去之后

![](/ctf/MZ/003.png)

全是赋值，而且还有地址，学长提示说这是链表

然后回到main函数，接下来的就是输入str,输入的内容是“%48s”。

这时str刚好就是48位

```cpp
for ( i = 0; i < 48; ++i )
  {
    v6 = Str[i];
    v5 = off_439000[2 * v6];
    if ( v6 - 5 == v5 )
    {
      v9[i] = ~(v6 + 1);
    }
    else
    {
      if ( v6 + 5 != v5 )
      {
        sub_434C80("Wrong flag\n", v4);
        exit(0);
      }
      v9[i] = ~(v6 - 1);
    }
    off_439000 = (int *)off_439000[2 * v6 + 1];
  }
```

接着往下看

v6就是我们输入的，

v5等于off_439000[2 * v6]数组

v6-5=v5,  v6也要满足 v6+5=v5，否则就退出了。

v9就是取反了。

v5 = off_439000[2 * v6];

所以接下来要知道off_439000[2 * v6]

双击进去

![](/ctf/MZ/004.png)



发现 定义了一个双子，地址偏移到了dword_439078的地址。

双击dword_439078

![](/ctf/MZ/005.png)

 

发现还没有值

而这个439078在之前好像见过

![image-20240207162134121](/ctf/MZ/006.png)

之前那一堆赋值的函数里有他们，所以，得先拿到数据，才能往下解。

![image-20240207162219740](/ctf/MZ/007.png)

设个断点，然后动调。

![image-20240207162426994](/ctf/MZ/008.png)

![image-20240207162437979](/ctf/MZ/009.png)

![image-20240207162454578](/ctf/MZ/010.png)

发现有数据了。然后我们得把数据提取出来

![image-20240207163718857](/ctf/MZ/011.png)

看了一眼，根据规律，应该有10000个数据。

![image-20240207164041438](/ctf/MZ/012.png)

提示最大10001，然后我们就写10001

![image-20240207164101231](/ctf/MZ/013.png)

顿时略卡

![image-20240207164148002](/ctf/MZ/014.png)

右键 convert把数据提取出来，然后复制粘贴。

![image-20240207164350390](/ctf/MZ/015.png)

点开sub_BA4190函数

```cpp
void *__cdecl sub_BA4190(int a1, __int64 a2, char *Buffer)
{
  void *result; // eax
  int v4; // [esp+Ch] [ebp-4D4h]
  int v5; // [esp+10h] [ebp-4D0h]
  int v6; // [esp+14h] [ebp-4CCh]
  int v7; // [esp+18h] [ebp-4C8h]
  int v8; // [esp+1A0h] [ebp-340h]
  int v9; // [esp+1ACh] [ebp-334h]
  int v10; // [esp+1B8h] [ebp-328h]
  int v11; // [esp+1C4h] [ebp-31Ch]
  int v12; // [esp+1D0h] [ebp-310h]
  int v13; // [esp+1DCh] [ebp-304h]
  int v14; // [esp+1E4h] [ebp-2FCh]
  int v15; // [esp+1E8h] [ebp-2F8h]
  int v16[2]; // [esp+1ECh] [ebp-2F4h]
  int v17; // [esp+1F4h] [ebp-2ECh]
  int v18; // [esp+200h] [ebp-2E0h]
  int v19[2]; // [esp+204h] [ebp-2DCh]
  int v20; // [esp+20Ch] [ebp-2D4h]
  int v21[167]; // [esp+218h] [ebp-2C8h]
  int i; // [esp+4B4h] [ebp-2Ch]
  size_t Size; // [esp+4C0h] [ebp-20h]
  unsigned int v24; // [esp+4CCh] [ebp-14h]
  unsigned int v25; // [esp+4D8h] [ebp-8h]

  __CheckForDebuggerJustMyCode(&unk_BB4018);
  v12 = 1732584193;
  v11 = -271733879;
  v10 = -1732584194;
  v9 = 271733878;
  v8 = -1009589776;
  for ( i = 0; i < 20; ++i )
    v21[i + 85] = 1518500249;
  for ( i = 20; i < 40; ++i )
    v21[i + 85] = 1859775393;
  for ( i = 40; i < 60; ++i )
    v21[i + 85] = -1894007588;
  for ( i = 60; i < 80; ++i )
    v21[i + 85] = -899497514;
  if ( a2 % 64 <= 56 )
    v4 = 64 - a2 % 64;
  else
    v4 = 128 - a2 % 64;
  Size = v4 + a2;
  result = malloc(v4 + a2);
  v25 = (unsigned int)result;
  if ( result )
  {
    for ( i = 0; i < a2; ++i )
      *(_BYTE *)(v25 + i + 3 - 2 * (i % 4)) = *(_BYTE *)(i + a1);
    *(_BYTE *)(v25 + i + 3 - 2 * (i % 4)) = 0x80;
    ++i;
    while ( i < (int)Size )
    {
      *(_BYTE *)(v25 + i + 3 - 2 * (i % 4)) = 0;
      ++i;
    }
    *(_DWORD *)(Size + v25 - 4) = 8 * a2;
    *(_DWORD *)(Size + v25 - 8) = a2 >> 29;
    v24 = Size + v25;
    while ( v25 < v24 )
    {
      for ( i = 0; i < 16; ++i )
        v21[i + 3] = *(_DWORD *)(v25 + 4 * i);
      for ( i = 16; i < 80; ++i )
      {
        dword_BA9078[10000] = *(&v14 + i) ^ v16[i] ^ v19[i] ^ v21[i];
        v21[i + 3] = (2 * dword_BA9078[10000]) | (dword_BA9078[10000] >> 31) & 1;
      }
      v20 = v12;
      v18 = v11;
      v17 = v10;
      v15 = v9;
      v13 = v8;
      for ( i = 0; i < 80; ++i )
      {
        dword_BA9078[10000] = v20;
        if ( i >= 40 )
        {
          if ( i >= 60 )
            v5 = v15 ^ v17 ^ v18;
          else
            v5 = v15 & v17 | v15 & v18 | v17 & v18;
          v6 = v5;
        }
        else
        {
          if ( i >= 20 )
            v7 = v15 ^ v17 ^ v18;
          else
            v7 = v15 & ~v18 | v17 & v18;
          v6 = v7;
        }
        v21[0] = v21[i + 85] + v21[i + 3] + v13 + v6 + ((32 * dword_BA9078[10000]) | (dword_BA9078[10000] >> 27) & 0x1F);
        v13 = v15;
        v15 = v17;
        dword_BA9078[10000] = v18;
        v17 = (v18 << 30) | (v18 >> 2) & 0x3FFFFFFF;
        v18 = v20;
        v20 = v21[0];
      }
      v12 += v20;
      v11 += v18;
      v10 += v17;
      v9 += v15;
      v8 += v13;
      v25 += 64;
    }
    free((void *)(v25 - Size));
    return (void *)sub_BA4D80(Buffer, "%08x%08x%08x%08x%08x", v12);
  }
  return result;
}
```

应该是加密，具体什么加密，我去问了一下gpt，是sha1加密。

由于不可逆，只能爆破然后和aDc0562f86bec0a一一比较，得出明文

代码实在不知道怎么写，这周计划就是研究爆破代码，正好学一点python，也为以后到时候需要写代码解题积累一些经验。

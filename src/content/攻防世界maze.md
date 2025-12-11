---
isOriginal: true
date: 2024-03-12
---



# 攻防世界 maze

<!-- more -->

```cpp
__int64 __fastcall main(int a1, char **a2, char **a3)
{
  __int64 v3; // rbx
  int v4; // eax
  bool v5; // bp
  bool v6; // al
  const char *v7; // rdi
  unsigned int v9; // [rsp+0h] [rbp-28h] BYREF
  int v10[9]; // [rsp+4h] [rbp-24h] BYREF

  v10[0] = 0;
  v9 = 0;
  puts("Input flag:");
  scanf("%s", &s1);
  if ( strlen(&s1) != 24 || strncmp(&s1, "nctf{", 5uLL) || *(&byte_6010BF + 24) != '}' )   // 输入的位数是24位
  {
LABEL_22:
    puts("Wrong flag!");
    exit(-1);
  }
  v3 = 5LL;
  if ( strlen(&s1) - 1 > 5 )
  {
    while ( 1 )
    {
      v4 = *(&s1 + v3);
      v5 = 0;
      if ( v4 > 78 )
      {
        if ( (unsigned __int8)v4 == 'O' )
        {
          v6 = sub_400650(v10);
          goto LABEL_14;
        }
        if ( (unsigned __int8)v4 == 'o' )
        {
          v6 = sub_400660(v10);
          goto LABEL_14;
        }
      }
      else
      {
        if ( (unsigned __int8)v4 == '.' )
        {
          v6 = sub_400670(&v9);
          goto LABEL_14;
        }
        if ( (unsigned __int8)v4 == '0' )
        {
          v6 = sub_400680((int *)&v9);
LABEL_14:
          v5 = v6;
        }
      }
      if ( !(unsigned __int8)sub_400690(asc_601060, (unsigned int)v10[0], v9) )
        goto LABEL_22;
      if ( ++v3 >= strlen(&s1) - 1 )
      {
        if ( v5 )
          break;
LABEL_20:
        v7 = "Wrong flag!";
        goto LABEL_21;
      }
    }
  }
  if ( asc_601060[8 * v9 + v10[0]] != '#' )     // 等于35
    goto LABEL_20;
  v7 = "Congratulations!";
LABEL_21:
  puts(v7);
  return 0LL;
}
```

 题目是迷宫题，之前做过一次迷宫题

可以很容易的看出这段代码是 上下左右的操作

```cpp
if ( v4 > 78 )
      {
        if ( (unsigned __int8)v4 == 'O' )
        {
          v6 = sub_400650(v10);
          goto LABEL_14;
        }
        if ( (unsigned __int8)v4 == 'o' )
        {
          v6 = sub_400660(v10);
          goto LABEL_14;
        }
      }
      else
      {
        if ( (unsigned __int8)v4 == '.' )
        {
          v6 = sub_400670(&v9);
          goto LABEL_14;
        }
        if ( (unsigned __int8)v4 == '0' )
        {
          v6 = sub_400680((int *)&v9);
```

难点就在于怎么分辨上下左右

我分别点进去它们的函数。发现两个两个一样，能区别左右，不能找出上下

```cpp
bool __fastcall sub_400650(_DWORD *a1)
{
  int v1; // eax

  v1 = (*a1)--;
  return v1 > 0;
}
```

```cpp
bool __fastcall sub_400660(int *a1)
{
  int v1; // eax

  v1 = *a1 + 1;
  *a1 = v1;
  return v1 < 8;
}
```

```cpp
bool __fastcall sub_400670(_DWORD *a1)
{
  int v1; // eax

  v1 = (*a1)--;
  return v1 > 0;
}
```

```cpp
bool __fastcall sub_400680(int *a1)
{
  int v1; // eax

  v1 = *a1 + 1;
  *a1 = v1;
  return v1 < 8;
}
```

可以看出 400650和400670可能向左或向上的，另外两个就是可能向右或向下的。

所以第一个关键应该就是分辨出方向。

 去网上找了很久，找到了一篇好文章。学到了很多东西。

反编译有问题就去看汇编

```cpp
.text:0000000000400650 ; bool __fastcall sub_400650(_DWORD *)
.text:0000000000400650 sub_400650      proc near               ; CODE XREF: main+103↓p
.text:0000000000400650 ; __unwind {
.text:0000000000400650                 mov     eax, [rdi]
.text:0000000000400652                 lea     ecx, [rax-1]
.text:0000000000400655                 mov     [rdi], ecx
.text:0000000000400657                 test    eax, eax
.text:0000000000400659                 setnle  al
.text:000000000040065C                 retn
.text:000000000040065C ; } // starts at 400650
.text:000000000040065C sub_400650      endp
.text:000000000040065C
.text:000000000040065C ; ---------------------------------------------------------------------------
.text:000000000040065D                 align 20h
.text:0000000000400660
.text:0000000000400660 ; =============== S U B R O U T I N E =======================================
.text:0000000000400660
.text:0000000000400660
.text:0000000000400660 ; bool __fastcall sub_400660(int *)
.text:0000000000400660 sub_400660      proc near               ; CODE XREF: main+E0↓p
.text:0000000000400660 ; __unwind {
.text:0000000000400660                 mov     eax, [rdi]
.text:0000000000400662                 inc     eax
.text:0000000000400664                 mov     [rdi], eax
.text:0000000000400666                 cmp     eax, 8
.text:0000000000400669                 setl    al
.text:000000000040066C                 retn
.text:000000000040066C ; } // starts at 400660
.text:000000000040066C sub_400660      endp
.text:000000000040066C
.text:000000000040066C ; ---------------------------------------------------------------------------
.text:000000000040066D                 align 10h
.text:0000000000400670
.text:0000000000400670 ; =============== S U B R O U T I N E =======================================
.text:0000000000400670
.text:0000000000400670
.text:0000000000400670 ; bool __fastcall sub_400670(_DWORD *)
.text:0000000000400670 sub_400670      proc near               ; CODE XREF: main+F3↓p
.text:0000000000400670 ; __unwind {
.text:0000000000400670                 mov     eax, [rdi]
.text:0000000000400672                 lea     ecx, [rax-1]
.text:0000000000400675                 mov     [rdi], ecx
.text:0000000000400677                 test    eax, eax
.text:0000000000400679                 setnle  al
.text:000000000040067C                 retn
.text:000000000040067C ; } // starts at 400670
.text:000000000040067C sub_400670      endp
.text:000000000040067C
.text:000000000040067C ; ---------------------------------------------------------------------------
.text:000000000040067D                 align 20h
.text:0000000000400680
.text:0000000000400680 ; =============== S U B R O U T I N E =======================================
.text:0000000000400680
.text:0000000000400680
.text:0000000000400680 ; bool __fastcall sub_400680(int *)
.text:0000000000400680 sub_400680      proc near               ; CODE XREF: main+BE↓p
.text:0000000000400680 ; __unwind {
.text:0000000000400680                 mov     eax, [rdi]
.text:0000000000400682                 inc     eax
.text:0000000000400684                 mov     [rdi], eax
.text:0000000000400686                 cmp     eax, 8
.text:0000000000400689                 setl    al
.text:000000000040068C                 retn
.text:000000000040068C ; } // starts at 400680
.text:000000000040068C sub_400680      endp
.text:000000000040068C
.text:000000000040068C ; ---------------------------------------------------------------------------
.text:000000000040068D                 align 10h
.text:0000000000400690
.text:0000000000400690 ; =============== S U B R O U T I N E =======================================
.text:0000000000400690
.text:0000000000400690
.text:0000000000400690 ; __int64 __fastcall sub_400690(__int64, int, int)
.text:0000000000400690 sub_400690      proc near               ; CODE XREF: main+117↓p
.text:0000000000400690 ; __unwind {
.text:0000000000400690                 movsxd  rax, esi
.text:0000000000400693                 add     rax, rdi
.text:0000000000400696                 movsxd  rcx, edx
.text:0000000000400699                 movzx   eax, byte ptr [rax+rcx*8]
.text:000000000040069D                 cmp     eax, 20h ; ' '
.text:00000000004006A0                 setz    cl
.text:00000000004006A3                 cmp     eax, 23h ; '#'
.text:00000000004006A6                 setz    al
.text:00000000004006A9                 or      al, cl
.text:00000000004006AB                 retn
.text:00000000004006AB ; } // starts at 400690
.text:00000000004006AB sub_400690      endp
.text:00000000004006AB
.text:00000000004006AB ; ---------------------------------------------------------------------------
.text:00000000004006AC                 align 10
```



看汇编发现400690有一个乘以8的，就是看400690函数的反编译

```cpp
__int64 __fastcall sub_400690(__int64 a1, int a2, int a3)
{
  __int64 result; // rax

  result = *(unsigned __int8 *)(a1 + a2 + 8LL * a3);
  LOBYTE(result) = (_DWORD)result == 32 || (_DWORD)result == 35;
  return result;
}
```

发现只有a3乘以8，而a1,a2都是原本的。

```cpp
if ( !(unsigned __int8)sub_400690((__int64)asc_601060, v10[0], v9) )
```

而a1,a2,a3分别是asc_601060, v10[0], v9。

所以可以推断出有v9的是上下，因为乘以8了，而v10只是左右。

然后现在重要的是得出迷宫的样子。

shift+f12找字符串

![image-20240312195450068](/ctf/攻防世界maze/001.png)

发现最后一行非常可疑,还有个井号，应该是终点

![image-20240312195338325](/ctf/攻防世界maze/002.png)



因为上面乘以8了，可以退出按照八个一行的排



![image-20240312195816328](/ctf/攻防世界maze/004.png)

一个一个数出来的，发现不太好看，就把空格换成了a

![image-20240312204500900](/ctf/攻防世界maze/image-20240312204500900.png)

然后就能看到路径了。

O是左，o是右,  '.'是上，0是下

o0oo00O000oooo..OO


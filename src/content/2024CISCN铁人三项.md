---
isOriginal: true
date: 2025-01-01

---

# 2024CISCN铁人三项_RE2

<!-- more -->

发现调用函数的顺序，check，rc4_init，rc4_crypt，cmp_result



![1](/ctf/2024CISCN铁人三项/1.jpg)

![2](/ctf/2024CISCN铁人三项/rId23.png)

 上面是key,下面是密文。

 ![3](/ctf/2024CISCN铁人三项/rId26.png)

968FB8085DA76844F2649264427A78E6EAC278B8639E5B3DD9283FC87306EE6B8D0C4BA323AECA40EDD1

然后用在线解密发现解不开，自己写脚本也解不开。

 ![4](/ctf/2024CISCN铁人三项/rId29.png)



发现左侧有个xor，差了一步异或，然后我检查check函数时，发现了xor函数。最后一步就是异或了。
![5](/ctf/2024CISCN铁人三项/5.jpg)

```python
from Crypto.Cipher import ARC4 
 
 # 定义密钥 
 key = b"testkey" 
 
 # 加密数据（十六进制表示） 
 enc = [ 
   0x96, 0x8F, 0xB8, 0x08, 0x5D, 0xA7, 0x68, 0x44, 0xF2, 0x64, 
   0x92, 0x64, 0x42, 0x7A, 0x78, 0xE6, 0xEA, 0xC2, 0x78, 0xB8, 
   0x63, 0x9E, 0x5B, 0x3D, 0xD9, 0x28, 0x3F, 0xC8, 0x73, 0x06, 
   0xEE, 0x6B, 0x8D, 0x0C, 0x4B, 0xA3, 0x23, 0xAE, 0xCA, 0x40, 
   0xED, 0xD1 
 ] 
 
 # 初始化 ARC4 解密器 
 cipher = ARC4.new(key) 
 
 # 将加密的整数列表转换为字节并解密 
 decrypted_data = cipher.decrypt(bytes(enc)) 
 
 # 转换为 bytearray 以支持位操作 
 flag = bytearray(decrypted_data) 
 
 # 逐字节解密操作 
 for i in range(len(flag) - 1, 0, -1): 
   flag[i - 1] ^= flag[i] # 当前字节与下一个字节异或 
 
 # 输出解密结果 
 print(flag.decode("utf-8", errors="replace")) # 尝试将字节解码为字符串 
#flag{d0f5b330-9a74-11ef-9afd-acde48001122}
```


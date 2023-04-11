/*
 * @Author: caokangkang hkd_ckk@163.com
 * @Date: 2022-11-15 16:24:15
 * @LastEditors: caokangkang hkd_ckk@163.com
 * @LastEditTime: 2022-11-15 18:33:39
 * @FilePath: \Daily-interview-Question\统计一个字符串中，出现次数最多的字符，出现了 多少次\review3.js
 * @Description: 
 * 
 * Copyright (c) 2022 by caokangkang hkd_ckk@163.com, All Rights Reserved. 
 */
const testStr = "bianchengsanmei,xuexiyouqudezhishi,jieshiyouqudepengyou,suzaoyouqudelinghun.ii";

// 方法一：
/**
 * @description: 使用对象
 * 1.遍历字符串，一各个字符为key,重复次数为value, 存入一个对象；
 * 2.遍历对象，得到value的最大值
 * 3.遍历对象，根据获得的最大 value 值，获取到对应的字符串 key;
 * 4.输出结果
 * @param {*} str
 * @return {*}
 */
function objMaxStr(str){
  let obj = {};
  let maxNum = 0;
  let maxStr = ''
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]]) {
      obj[str[i]] +=1
    }else{
      obj[str[i]] = 1;
    }
  }
  for (const key in obj) {
    if (obj[key] > maxNum) {
      maxNum = obj[key]
      maxStr = key
    }
  }
  console.log(`当前最大字符是${maxStr},数量是${maxNum}`)
}
// maxStr(testStr)


// 方法二： 数组&指针

/**
 * @description: 
 * 1.将字符串转为数组并排序，使重复字符排在一起；
 * 2.使用指针思想，获得最大重复数和对应的字符数组
 * 3.输出结果;
 * @param {*} str
 * @return {*}
 */

function arrMaxStr(str){
  const arr = str.split('').sort()
  let startIndex = 0;
  let endIndex = 1;
  let maxNum = 0;
  let strArr = [];

  while(endIndex < arr.length){
    if (arr[startIndex] !== arr[endIndex]) {
      const rangeNum = endIndex - startIndex
      if (rangeNum > maxNum) {
        maxNum = rangeNum
        strArr = [arr[startIndex]]
      }else if(rangeNum === maxNum){
        strArr.push(arr[startIndex])
      }
      startIndex = endIndex
    }
    endIndex++
  }

  console.log(`当前最字符是${strArr.join(',')}, 最大数是${maxNum}`);
}
arrMaxStr(testStr)
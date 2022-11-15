/*
 * @Author: caokangkang hkd_ckk@163.com
 * @Date: 2022-11-08 17:42:51
 * @LastEditors: caokangkang hkd_ckk@163.com
 * @LastEditTime: 2022-11-15 18:33:36
 * @FilePath: \Daily-interview-Question\浅拷贝与深拷贝\clone_review1.js
 * @Description: 
 * 
 * Copyright (c) 2022 by caokangkang hkd_ckk@163.com, All Rights Reserved. 
 */

/* 
  浅拷贝方法：
  Object.assign(); 方法将所有可枚举的自有属性从一个或多个源对象复制到目标对象，返回修改后的对象
*/
let obj1 = { person: { name: 'kobe', age: 41 }, sports: 'basketball' };
let obj2 = Object.assign({
  color: 'yellow'
}, obj1);
obj2.person.name = 'ckk';
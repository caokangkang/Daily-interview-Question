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
function findStrMax(str) {
  let obj = {};
  let max = null;
  let charAt = '';
  // 1
  for (let i = 0; i < str.length; i++) {
    const char = str.charAt(i);
    if (obj[char]) {
      obj[char] += 1;
    } else {
      obj[char] = 1;
    }
  }

  // 2
  for (const key in obj) {
    if (obj[key] > max) {
      max = obj[key]
      charAt = key;
    }
  }
  console.log('obj:>> ', obj);
  console.log('max :>> ', max);
  console.log('charAt :>> ', charAt);
}

// findStrMax(testStr)


// 方法二： 数组&指针

/**
 * @description: 
 * 1.将字符串转为数组并排序，使重复字符排在一起；
 * 2.使用指针思想，获得最大重复数和对应的字符数组
 * 3.输出结果;
 * @param {*} str
 * @return {*}
 */
function maxCharAt(str) {
  const arr = str.split('').sort();
  let startIndex = 0;
  let endIndex = 1;
  let resultArr = [];
  let max = 0;
  while (startIndex < str.length) {
    if (arr[startIndex] !== arr[endIndex]) {
      const ranged = endIndex - startIndex;
      if (ranged > max) {
        max = ranged;
        resultArr = [arr[startIndex]]
      } else if (ranged == max) {
        resultArr.push(arr[startIndex])
      }
      startIndex = endIndex;
    }
    endIndex++
  }
  console.log('resultArr :>> ', resultArr);

  // console.log(`字符串最多的子母是${resultArr.map(item => ',' + item)}, 最大个数是max`);
}
maxCharAt(testStr)

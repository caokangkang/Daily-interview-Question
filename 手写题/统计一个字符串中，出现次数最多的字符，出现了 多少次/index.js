// 统计一个字符串中，出现次数最多的字符，出现了多少次？
// 方法一
const str = 'zhaochucishuzuiduodezifu';
let o = {};
for (let i = 0; i < str.length; i++) {
  const char = str.charAt(i);
  
  if (o[char]) {
    o[char]++;
  }else{
    o[char] = 1;
  }
  
}

// 遍历对象，找到出现次数最多的字符和次数
let max = 0;
let maxChar = null;

for (const key in o) {
  if (max < o[key]) {
    max = o[key];
    maxChar = key;
  }
}

/* console.log('最对的字符串' + maxChar);
console.log('出现的次数是' + max); */


// 方法二  数组&指针


const testStr = "bianchengsanmei,xuexiyouqudezhishi,jieshiyouqudepengyou,suzaoyouqudelinghun.ii";

// 将字符串转为数组并排序
const testStrArr = testStr.split('').sort();
console.log('testStrArr :>> ', testStrArr);
let startIndex = 0;
let endIndex = 1;
let maxNum = 0;
let validWords = [];

// 使用指针法，获取最大重复次数及最大次数对应的字符串数组
while(startIndex < testStrArr.length){

  // startIndex 和 endIndex 位置的字符不同
  if (testStrArr[startIndex] !== testStrArr[endIndex]) {
    // 计算startIndex 和 endIndex 之间的字符个数
    const rangeNum = endIndex - startIndex;
    if (rangeNum > maxNum) {
      maxNum = rangeNum;

      validWords = [testStrArr[startIndex]];
    }else if (rangeNum == maxNum) {
      validWords.push(testStrArr[startIndex])
    }
    startIndex = endIndex;
  }
  endIndex++
}
console.log('validWords', validWords);


// 打印结果
for (let i = 0; i < validWords.length; i++) {
  const word = validWords[i];
  console.log(`重复次数最多的是：${word}, 重复次数为：${maxNum}`);
}
const str = 'zhaochucishuzuiduohdezifuh';
let obj = {}
for (const key in str) {
  if (obj[str[key]]) {
    obj[str[key]] += 1;
  } else {
    obj[str[key]] = 1;
  }
}
console.log('obj', obj)

// 遍历找出对象中的最大值
let maxNum = 0;
let maxChar = null;
for (const key in obj) {
  if (obj[key] > maxNum) {
    maxNum = obj[key];
    maxChar = key;
  }
}
console.log('出现最多字符串是字母 :>> ', maxChar);
console.log('次数是 :>> ', maxNum);


/**
 * 1.遍历字符串，并让其成为对象的属性；
 * 2.判断这个字符串属性是否存在，存在加一，不存在赋值一；
 * 3.遍历对象比对，找出对象中最大值字符串；
 */
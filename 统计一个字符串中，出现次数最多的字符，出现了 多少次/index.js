// 统计一个字符串中，出现次数最多的字符，出现了多少次？
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
console.log('o', o)


// 遍历对象，找到出现次数最多的字符和次数
let max = 0;
let maxChar = null;

for (const key in o) {
  if (max < o[key]) {
    max = o[key];
    maxChar = key;
  }
}

console.log('最对的字符串' + maxChar);
console.log('出现的次数是' + max);

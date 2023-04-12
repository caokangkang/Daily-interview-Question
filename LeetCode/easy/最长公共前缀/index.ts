// 方法一：横向比较方法
const longestCommonPrefix1 = (strs: Array<string>): string => {
  if (!strs || !strs.length) return '';
  const n: number = strs.length;
  let result: string = '';

  for (let i = 0; i < strs[0].length; i++) {
    // 这里去掉第一个字符串的每个字符
    const c = strs[0][i];
    // 接下来遍历字符串数组，让其每个字符串的字符去对比第一个字符串的每个位置的字符
    for (let j = 1; j < n; j++) {
      // 当第一个字符的下标大于当前字符的下标，跳过；
      // 如果当前第一个字符串的字符不等于了当前字符串的字符了，跳过；
      if (i > strs[j].length || strs[j][i] !== c) {
        return result;
      }
    }
    result += c;
  }
  return result;
}

// 方法二： 纵向比较方法；
const longestCommonPrefix2 = (strs: Array<string>): string => {
  if (!strs || !strs.length) return '';
  const n: number = strs.length;
  const m: number = strs[0].length;
  for (let i = 0; i < m; i++) {
    const c = strs[0][i];
    for (let j = 1; j < n; j++) {
      if (i >= strs[j].length || strs[j][i] !== c) {
        return strs[0].substring(0, i)
      }
    }
  }
  return strs[0];
}


// 解法三
function CommonPrefix(strs: Array<string>): string {
  // 当字符串数组长度为`0`时则公共前缀为空，直接返回；
  if (strs.length === 0) return "";
  //- 令最长公共前缀`ans`的值为第一个字符串，进行初始化；
  let ans = strs[0];
  for (let i = 0; i < strs.length; i++) {
    let j = 0;
    // 历后面的字符串，依次将其与`ans`比较，两两找出公共前缀，最终结果即为最长公共前缀；
    for (; j < strs[i].length; j++) {
      if (ans[j] !== strs[i][j]) {
        break;
      }
    }
    ans = ans.substr(0, j);
    // 如果查找过程中出现了`ans`为空的情况，则公共前缀不存在直接返回；
    if (ans === "") return ans;
  }
  return ans;
}
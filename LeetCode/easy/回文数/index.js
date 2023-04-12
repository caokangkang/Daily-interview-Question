var isPalindrome = function(x) {
  if (!(-231 <= x <= 231 - 1)) return false;
  const palindrome = x.toString().split("").reverse().join("") - 0;
  if (x === palindrome) {
    return true
  }else{
    return false
  }
};
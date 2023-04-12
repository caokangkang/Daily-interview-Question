/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
const nums = [2, 7, 11, 15];
const target = 9;
// 方法一：暴力发
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target && i != j) {
        return [i, j]
      }
    }
  }
};
// console.log(twoSum([2, 4, 7,6], 8))

// 方法二: 

const tweSum2 = function (nums, target) {

}

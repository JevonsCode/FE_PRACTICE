/**
 * 试一下斐波那契数列
 *
 * 0 1 1 2 3 5 8 13 21
 *
 *
 * f(n-1) + f(n-2)
 */

function fibo(x) {
  let nums = [0, 1];
  for (let i = 2; i <= x; i++) {
    nums.push(nums[i - 1] + nums[i - 2]);
  }
  return nums[x];
}

function fibo_dyn(x) {
  const arr = new Array(x);
  arr[0] = 0;
  arr[1] = 1;
  for (let i = 2; i <= x; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[x];
}

// function fibo(n) {
//   if (n < 2) return n;
//   return fibo(n - 1) + fibo(n - 2);
// }

const ind = 300;

console.log(fibo(ind));

console.log(fibo_dyn(ind));

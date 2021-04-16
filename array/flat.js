// function flat(arr) {
//   let result = [];

//   for (let i = 0; i < arr.length; i++) {
//     if (Array.isArray(arr[i])) {
//       result.push(...flat(arr[i]));
//     } else {
//       result.push(arr[i]);
//     }
//   }

//   console.log("--> ", result);
//   return result;
// }

function flat(arr) {
  while (arr.some((i) => Array.isArray(i))) {
    arr = [].concat(...arr);
  }
  return arr;
}

console.log(
  JSON.stringify(flat([1, [2, 3], [4, [5, [6]]]])) ===
    JSON.stringify([1, 2, 3, 4, 5, 6])
);

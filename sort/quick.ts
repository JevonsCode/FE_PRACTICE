const arr = [40, 33, 99, 23, 11, 45, 66, 86, 1024, -100, 0];

function quick_sort(arr) {

  if (arr.length <= 1) return arr;

  //  中间这个选中的锚点就不用放在下面排序了
  const anchor = arr.splice(~~(arr.length / 2), 1)[0];
  
  const left = [];
  
  const right = [];
  
  for(let i = 0; i < arr.length; i++) {
    if (arr[i] > anchor) {
      right.push(arr[i]);
    } else {
      left.push(arr[i]);
    }
  }

  return [...quick_sort(left), anchor, ...quick_sort(right)];
}

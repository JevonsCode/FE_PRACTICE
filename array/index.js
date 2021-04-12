// 实现一个 map
function map(dealwithItemFn, arr) {
  const r = [];
  for (let item of arr) {
    r.push(dealwithItemFn(item));
  }
  return r;
}

// 实现一个 filter
function filter(judgeItem, arr) {
  let r = [];
  for (let item of arr) {
    if (judgeItem(item)) {
      r.push(item);
    }
  }
  return r;
}

// 实现一个 reduce
function reduce(fn, init, arr) {
  let ini = init;
  for (let item of arr) {
    ini = fn(ini, item);
  }
  return ini;
}

var _map = function (dealwithitem, arr) {
  return arr.reduce((a, b) => [...a, dealwithitem(b)], []);
};
var _filter = function (judgeItem, arr) {
  return arr.reduce((a, b) => (judgeItem(b) ? [...a, b] : [...a]), []);
};

var arr = [1, 2, 3, 4, 5, 6];

// var mapFn = (item) => item + " 个";
// var map1 = arr.map(mapFn);
// var map2 = map(mapFn, arr);
// var map3 = _map(mapFn, arr);

var f1 = arr.filter((i) => i < 4);
// var f2 = filter((i) => i < 4, arr);
var f3 = _filter((i) => i < 4, arr);

// var r1 = arr.reduce((i, n) => i + n, 0);
// var r2 = reduce((i, n) => i + n, 0, arr);

// console.log("map1 ", map1, "\nmap2 ", map2);
// console.log("map1 ", map1, "\nmap3 ", map3);
// console.log("f1 ", f1, "\nf2 ", f2);
console.log("f1 ", f1, "\nf3 ", f3);
// console.log("r1 ", r1, "\nr2 ", r2);

const [PENDING, FULFILLED, REJECTED] = ["pending", "fulfilled", "rejected"];

class PromiseA {
  /**
   * 当前状态
   */
  status;

  value;

  resolves = [];
  rejects = [];

  constructor(executor) {
    this.status = PENDING;

    const resolve = (value) => {
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        this.resolves.forEach((rFn) => rFn());
      }
    };

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.value = reason;
        this.rejects.forEach((rFn) => rFn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  /**
   * then 会返回一个新的 Promise 对象
   * 该对象的状态和结果由返回值决定
   *    如果返回值是 Promise 对象，返回值就是新 Promise 成功/失败
   *    如果不是 -- ，新的 promise 就是成功，值就是返回值
   */
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (e) => {
            throw e;
          };

    const thenPromise = new PromiseA((resolve, reject) => {
      const resolvePromise = (fn) => {
        queueMicrotask(() => {
          try {
            const cb = fn(this.value);
            if (cb === thenPromise) {
              throw new Error("不能两个是同一个方法");
            }
            if (cb instanceof PromiseA) {
              cb.then(resolve, reject);
            } else {
              resolve(cb);
            }
          } catch (e) {
            reject(e);
          }
        });
      };

      if (this.status === PENDING) {
        this.resolves.push(() => {
          resolvePromise(onFulfilled);
        });
        this.rejects.push(() => {
          resolvePromise(onRejected);
        });
      } else if (this.status === FULFILLED) {
        resolvePromise(onFulfilled);
      } else if (this.status === REJECTED) {
        resolvePromise(onRejected);
      }
    });

    return thenPromise;
  }

  /**
   * 接收一个数组
   *
   * 有一个失败就失败
   *
   * 成功返回成功的数组
   */
  static all(arr) {
    const result = [];
    let n = 0;

    return new PromiseA((resolve, reject) => {
      arr.forEach((item, index) => {
        if (item instanceof PromiseA) {
          item.then((v) => {
            result[index] = v;
            ++n;
            if (n === arr.length) {
              resolve(result);
            }
          }, reject);
        } else {
          result[index] = item;
          ++n;
          if (n === arr.length) {
            resolve(result);
          }
        }
      });
    });
  }

  /**
   * 数组中谁先得到的结果直接输出
   */
  static race(arr) {
    return new PromiseA((resolve, reject) => {
      arr.forEach((item) => {
        if (item instanceof PromiseA) {
          item.then(resolve, reject);
        } else {
          queueMicrotask(() => {
            resolve(item);
          });
        }
      });
    });
  }

  static resolve(val) {
    if (val instanceof PromiseA) return val;
    return new PromiseA((resolve) => resolve(val));
  }
  static reject(reason) {
    return new PromiseA((resolve, reject) => reject(reason));
  }
}

const MPromise = Promise;

const A = new MPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("AAA");
  }, 1000);
});
// const B = new MPromise((resolve, reject) => {
//   resolve("BBB");
// });

// const x = A.then((a) => {
//   console.log("-> ", a);
//   return 233;
// })
//   .then((b) => {
//     console.log("--> ", b);
//     return new PromiseA((r, rj) => {
//       rj(123123);
//     });
//   })
//   .then(
//     (c) => {
//       console.log("---> ", c);
//     },
//     (e) => {
//       console.log("~--> ", e);
//     }
//   );

// (async function Y() {
//   const r = await B.then();
//   console.log("-----> ", r);
// })();

// const x = MPromise.all(["x", A, B]).then((v) => {
//   console.log("xxxx ", v);
// });

// const x = MPromise.race([A, B, "aaa", A]).then((v) => {
//   console.log("xxxx ", v);
// });

const x = MPromise.resolve(A).then((x) => {
  console.log("xxxx ", x);
});
const xx = MPromise.resolve(1000);
console.log("xxxx ", xx);

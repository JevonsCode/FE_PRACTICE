
type IResolve = (r: unknown) => void;
type IReject = () => void;
type IPromiseProp = (resolve: IResolve, reject: IReject) => void;

class _Promise {
  private _resolve: unknown = undefined;

  constructor(p: IPromiseProp) {
    p(this.resolve, this.reject)
  }

  private resolve: IResolve = () => {

  }

  private reject = () => {

  }

  then() {
    // 
  }

  catch() {
    // 
  }

}

const A = new _Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("AAA")
  }, 2000)
});


(async function X() {
  const a = await A.then();
  console.log(a);
})()
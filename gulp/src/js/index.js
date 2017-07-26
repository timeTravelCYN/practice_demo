async function fn() {
  return 30
}

console.log(fn())

/**
 * result 
 * Promise = {
    __proto__: Promise,
    [[PromiseStatus]]: "resolved",
    [[PromiseValue]]: 30
}
 */

 fn().then(res => {
   console.log(res);
 })
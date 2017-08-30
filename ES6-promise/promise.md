# Promise与异步编程


### 异步编程
1. 事件模型

浏览器初次渲染DOM的时候，我们会给一些DOM绑定事件函数，只有当触发了这些DOM事件函数，才会执行他们。

``` JavaScript
    const btn = document.querySelector('.button')
    btn.onclick = function(event) {
      console.log(event)
    }
```
2. 回调函数

![](https://p1.ssl.qhimg.com/t012ba4a8fb02337f2f.jpg)

会产生回调地狱

3. 发布/订阅(观察者)模式

设计模式的一种，[JavaScript之观察者模式](http://www.cnblogs.com/TomXu/archive/2012/03/02/2355128.html)

4. Promise

今天主要分享的内容

5. async/await

### 浅入浅出Promise

>Promise 对象用于一个异步操作的最终完成（或失败）及其结果值的表示。(简单点说就是处理异步请求。。我们经常会做些承诺，如果我赢了你就嫁给我，如果输了我就嫁给你之类的诺言。这就是promise的中文含义。一个诺言，一个成功，一个失败。)      ---MDN

1. 语法

``` JavaScript
let p1 = new Promise((resolve, reject) => {
  // 参数是一个函数，仅接受一个参数,被称为执行器
  // resolve 和 reject 函数被调用时，分别将promise的状态改为fulfilled(完成)或rejected（失败）
  console.log('new Promise...')
  resolve()
})
console.log('h1')
p1.then(()=> {
  console.log('p1.then')
})
```

2. Promise的生命周期
* pending

    初始状态，操作尚未完成
* resolved(fulfilled)
    
    操作完成，继续往下执行
* rejected

    操作失败，拒绝执行

    这三种状态不受外界影响，而且状态只能从 `pending` 改变为  `resolved` 或者 `rejected` ，并且不可逆

```JavaScript
var p1 = new Promise(function(resolve,reject){
  resolve(1);
});
var p2 = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve(2);  
  }, 500);      
});
var p3 = new Promise(function(resolve,reject){
  setTimeout(function(){
    reject(3);  
  }, 500);      
});

console.log(p1);
console.log(p2);
console.log(p3);
setTimeout(function(){
  console.log(p2);
}, 1000);
setTimeout(function(){
  console.log(p3);
}, 1000);

p1.then(function(value){
  console.log(value);
});
p2.then(function(value){
  console.log(value);
});
p3.catch(function(err){
  console.log(err);
});
```

3. then方法

    所有的 `Promise` 都有then方法，接受两个参数，第一个是当Promise的状态变为resolved的时候要调用的函数，与异步操作相关的数据都会传递给这个函数，第二个是当Promise的状态变为 rejected 的时候调用的，可以传递失败相关信息。

``` JavaScript
function fn(num) {
    return new Promise(function(resolve, reject) {
        if (typeof num == 'number') {
            resolve();
        } else {
            reject();
        }
    })
}

fn('hahha').then(function() {
    console.log('参数是一个number值');
}, function() {
    console.log('参数不是一个number值');
});

fn('hahha').then(function() {
    console.log('参数是一个number值');
}).catch(function() {
    console.log('参数不是一个number值');
});

fn('hahha').then(function() {
    console.log('参数是一个number值');
}).then(null, function() {
    console.log('参数不是一个number值');
});
```
4. promise.all()

Promise.all接收一个Promise对象组成的数组作为参数，返回的也是一个Promise,当这个数组所有的Promise对象状态都变成resolved或者rejected的时候，它才会去调用then方法。

```JavaScript
let p1 = new Promise(function(resolve, reject) {
    resolve(42)
})

let p2 = new Promise(function(resolve,reject) {
    resolve(43)
})

let p2 = new Promise(function(resolve,reject) {
    resolve(43)
})

let p4 = Promise.all([p1, p2, p3])
p4.then(function(value) {
    console.log(Array.isArray(value))
    console.log(value)
})
```

```JavaScript
let p1 = new Promise(function (resolve, reject) {
    resolve(42)
  })

  let p2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(43)
    }, 500)
  })

  let p3 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(44)
    }, 1000)
  })

  let p4 = Promise.all([p1, p2, p3])
  p4.catch(function (value) {
    console.log(Array.isArray(value))
    console.log(value)
  })
```

5. promise.race()

```JavaScript
  let p1 = new Promise(function (resolve, reject) {
    reject(42)
  })

  let p2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(43)
    }, 500)
  })

  let p3 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve(44)
    }, 1000)
  })

  let p4 = Promise.race([p1, p2, p3])
  p4.then(function (value) {
    console.log(value)
  }).catch(function(value) {
    console.log('error  ' + value)
  })
```

Promise.all接收一个Promise对象组成的数组作为参数，返回的也是一个Promise,当这个数组有一个Promise对象状态变成resolved或者rejected的时候，它才会去调用then方法。

6. 链式调用
```JavaScript
var p = new Promise(function (resolve, reject) {
  resolve(1);
});
p.then(function (value) { //第一个then
  console.log(value);
  return value * 2;
}).then(function (value) { //第二个then
  console.log(value);
}).then(function (value) { //第三个then
  console.log(value);
  return Promise.resolve('resolve');
}).then(function (value) {
  console.log(value)
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(111)
    }, 1000)
  })
}).then(function (value) { //第四个then
  console.log(value);
  return Promise.reject('reject');
}).then(function (value) { //第五个then
  console.log('resolve: ' + value);
}, function (err) {
  console.log('reject: ' + err);
})
```

Promise对象的then方法返回一个新的Promise对象，因此可以通过链式调用then方法。then方法接收两个函数作为参数，第一个参数是Promise执行成功时的回调，第二个参数是Promise执行失败时的回调。两个函数只会有一个被调用，函数的返回值将被用作创建then返回的Promise对象。这两个参数的返回值可以是以下三种情况中的一种：

* return 一个同步的值 ，或者 undefined（当没有返回一个有效值时，默认返回undefined），then方法将返回一个resolved状态的Promise对象，Promise对象的值就是这个返回值。
* return 另一个 Promise，then方法将根据这个Promise的状态和值创建一个新的Promise对象返回。
* throw 一个同步异常，then方法将返回一个rejected状态的Promise, 值是该异常。

### 扩展阅读

事件循环(Event Loop)机制

[总是一知半解的Event Loop](https://juejin.im/post/5927ca63a0bb9f0057d3608e)

[深入核心，详解事件循环机制](http://www.jianshu.com/p/12b9f73c5a4f)
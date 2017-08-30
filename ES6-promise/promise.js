// promise的立即执行性 then异步
{
  var p = new Promise(function (resolve, reject) {
    console.log("create a promise");
    resolve("success");
  });

  p.then(function (value) {
    console.log(value);
  });

  console.log("after new Promise");

  
}

// promise 的三种状态
{
  var p1 = new Promise(function (resolve, reject) {
    resolve(1);
  });
  var p2 = new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(2);
    }, 500);
  });
  var p3 = new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject(3);
    }, 500);
  });

  console.log(p1);
  console.log(p2);
  console.log(p3);
  setTimeout(function () {
    console.log(p2);
  }, 1000);
  setTimeout(function () {
    console.log(p3);
  }, 1000);

  p1.then(function (value) {
    console.log(value);
  });
  p2.then(function (value) {
    console.log(value);
  });
  p3.catch(function (err) {
    console.log(err);
  });
}

// promise 的不可逆性
{
  var p1 = new Promise(function (resolve, reject) {
    resolve("success1");
    resolve("success2");
  });

  var p2 = new Promise(function (resolve, reject) {
    reject("reject");
    resolve("success");
  });

  p1.then(function (value) {
    console.log(value);
  });

  p2.catch(function (value) {
    console.log(value);
  });
}

// 链式调用
{
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
}

// 链式调用2
{
  let p1 = new Promise((resolve, reject) => {
    resolve(1)
  })

  p1.then(val => {
    console.log(val)
    throw new Error('Boom')
  }).catch(val => {
    console.log(val)
    return 3 // 返回一个值，所以返回的promise是resolved状态的，执行then方法
  }).then(val => console.log(val))
}

// promise.all()
{
  let p1 = new Promise(function (resolve, reject) {
    resolve(42)
  })

  let p2 = new Promise(function (resolve, reject) {
    resolve(43)
  })

  let p3 = new Promise(function (resolve, reject) {
    resolve(44)
  })

  let p4 = Promise.all([p1, p2, p3])
  p4.then(function (value) {
    console.log(Array.isArray(value))
    console.log(value)
  })
}

{
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
}

// promise.race()
{
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
      while(1) {
        resolve(1)
      }
    }, 20000)
  })

  let p4 = Promise.race([p1, p2, p3])
  p4.then(function (value) {
    console.log(value)
  }).catch(function (value) {
    console.log('error  ' + value)
  })
}

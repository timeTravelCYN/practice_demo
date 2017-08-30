let p1 = new Promise(function (resolve, reject) {
    reject(42)
  })

  let p2 = new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject(43)
    }, 500)
  })

  let p3 = new Promise(function (resolve, reject) {
    while(1) {
      resolve(1)
    }
  })

  let p4 = Promise.race([p1, p2, p3])
  p4.then(function (value) {
    console.log(value)
  }).catch(function (value) {
    console.log('error  ' + value)
  })
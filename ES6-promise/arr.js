var valueArr = [
  {
      kpi: 3001,
      nodeId: [141935137496068, 141935137496069],
      value: [29, 3]
  },
  {
      kpi: 3002,
      nodeId: [141935137496066, 141935137496067],
      value: [5095, 869]
  }
]

let arr = new Array();

valueArr.forEach((item) => {
  let itemArr = new Array();
  item.nodeId.forEach((node, index) => {
    itemArr.push({
      name: node,
      value: item.value[index]
    })
  })
  arr.push(itemArr)
})
console.log(arr)
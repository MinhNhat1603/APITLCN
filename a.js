let arr1 = ['id1', 'id2', 'id3', 'id4', 'id5'];
let arr2 = [
  { objectID: 'id2', field2: 'value1' },
  { objectID: 'id4', field2: 'value2' },
  { objectID: 'id6', field2: 'value3' }
];
let result = arr2
  .map(item => item.objectID) // Chuyển đổi mảng arr2 sang mảng objectID
  .filter(id => arr1.includes(id)) // Lọc ra các objectID có trong arr1
  .map(id => arr2.find(item => item.objectID === id)); // Lấy lại các đối tượng có objectID tương ứng

console.log(result); // [{ objectID: 'id2', field2: 'value1' }, { objectID: 'id4', field2: 'value2' }]

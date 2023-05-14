function compareArrays(arr1, arr2, arr3) {
	let result = [];
	
	if (arr1 === null) {
	  result = arr2.filter(obj2 => arr3.find(obj3 => JSON.stringify(obj3) === JSON.stringify(obj2)));
	} else if (arr1.length === 0 && arr2.length === 0) {
	  result = arr3;
	} else if (arr2.length === 0) {
	  result = arr1.filter(obj1 => arr3.find(obj3 => JSON.stringify(obj3) === JSON.stringify(obj1)));
	} else if (arr3.length === 0) {
	  result = arr1.filter(obj1 => arr2.find(obj2 => JSON.stringify(obj2) === JSON.stringify(obj1)));
	} else {
	  for (let i = 0; i < arr1.length; i++) {
		let obj1 = arr1[i];
		if (arr2.find(obj2 => JSON.stringify(obj2) === JSON.stringify(obj1)) &&
			arr3.find(obj3 => JSON.stringify(obj3) === JSON.stringify(obj1))) {
		  result.push(obj1);
		}
	  }
	}
	
	return result;
  }
  const arr1 = [
	{ id: 1, name: "John" },
	{ id: 2, name: "Jane" },
	{ id: 3, name: "Adam" }
  ];
  
  const arr2 = [
	{ id: 2, name: "Jane" },
	{ id: 4, name: "Bob" },
	{ id: 5, name: "Mary" }
  ];
  
  const arr3 = [
	{ id: 1, name: "John" },
	{ id: 2, name: "Jane" },
	{ id: 6, name: "Tom" }
  ];
  
  console.log(compareArrays(null, arr2, arr3)); // Output: [ { id: 2, name: 'Jane' } ]
  console.log(compareArrays([], [], arr3)); // Output: [ { id: 1, name: 'John' }, { id: 2, name: 'Jane' }, { id: 6, name: 'Tom' } ]
  console.log(compareArrays(arr1, arr2, arr3)); // Output: [ { id: 2, name: 'Jane' } ]
	
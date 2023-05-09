const _ = require("lodash");

const search = "nhan sinh";
const products = [
  { name: "Nhân Sinh", price: 10 },
  { name: "nhan-sinh", price: 15 },
  { name: "Nhận Sinh", price: 20 },
  { name: "Nhan Sinh", price: 25 },
  { name: "Nhan Bao", price: 25 },
];

const filteredProducts = products.filter(product =>
  _.toLower(_.deburr(product.name)).includes(_.toLower(_.deburr(search)))
);

console.log(filteredProducts);

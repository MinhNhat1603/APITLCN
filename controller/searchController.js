const category= require("../model/categoryModel");
const product = require("../model/productModel");
const brand = require("../model/brandModel");
const author = require("../model/authorsModel");
const _ = require("lodash");
const unorm = require('unorm');
const  productController = {
    searchProduct:async (req, res)=>{
        try {
            const search = req.query.search;            
            const products = await product.find(
                { $text:{ $search: '\"' + search +'\"'} },
                {score: {$meta: 'textScore'}}
            ).populate("category").populate("brand").populate("author");
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json(error);
        }

    },
    searchByName: async (req, res)=>{
        try {
            const search = unorm.nfd(req.query.search).replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const products = await product.find().populate("category").populate("brand").populate("author");
            const result = products.filter((product) =>{
                const normalizedString = unorm.nfd(product.name).replace(/[\u0300-\u036f]/g, '').toLowerCase();
                return normalizedString.includes(search);
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchByDescription: async (req, res)=>{
        try {
            const search = unorm.nfd(req.query.search).replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const products = await product.find().populate("category").populate("brand").populate("author");
            const result = products.filter((product) =>{
                const normalizedString = unorm.nfd(product.description).replace(/[\u0300-\u036f]/g, '').toLowerCase();
                return normalizedString.includes(search);
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    searchByAuthor: async (req, res)=>{
        try {
            const search = unorm.nfd(req.query.search).replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const products = await product.find().populate("category").populate("brand").populate("author");
            const result = products.filter((product) =>{
                const normalizedString = unorm.nfd(product.author.name).replace(/[\u0300-\u036f]/g, '').toLowerCase();
                return normalizedString.includes(search);
            });
            res.status(200).json(result);
        } catch (error) {
            res.status(500).json(error);
        }
    },
    filter: async (req, res)=>{
        try {
            const allProduct = await product.find().populate("category").populate("brand").populate("author");
            //Product
            const productSearch = unorm.nfd(req.query.name).replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const resultProduct = allProduct.filter((product) =>{
                const normalizedString = unorm.nfd(product.name).replace(/[\u0300-\u036f]/g, '').toLowerCase();
                return normalizedString.includes(productSearch);
            });
            //Author
            const AnAuthor = unorm.nfd(req.query.author).replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const resultAuthor = allProduct.filter((product) =>{
                const normalizedString = unorm.nfd(product.author.name).replace(/[\u0300-\u036f]/g, '').toLowerCase();
                return normalizedString.includes(AnAuthor);
            });

            //Description
            const description = unorm.nfd(req.query.description).replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const resultDescription = allProduct.filter((product) =>{
                const normalizedString = unorm.nfd(product.description).replace(/[\u0300-\u036f]/g, '').toLowerCase();
                return normalizedString.includes(description);
            });
            if(req.query.name == null && req.query.author == null && req.query.description == null){               
                res.status(200).json();
            }
            if(req.query.name != null && req.query.author != null && req.query.description != null){
                const result = compareArrays(resultProduct, resultAuthor, resultDescription);
                res.status(200).json(result);
            }
            if(req.query.name == null && req.query.author != null && req.query.description != null){
                const result = compare2Arrays(resultAuthor, resultDescription);
                res.status(200).json(result);
            }
            if(req.query.name != null && req.query.author == null && req.query.description != null){
                const result = compare2Arrays(resultProduct, resultDescription);
                res.status(200).json(result);
            }
            if(req.query.name != null && req.query.author != null && req.query.description == null){
                const result = compare2Arrays(resultProduct, resultAuthor);
                res.status(200).json(result);
            }
            if(req.query.name != null && req.query.author == null && req.query.description == null){
                res.status(200).json(resultProduct);
            }
            if(req.query.name == null && req.query.author != null && req.query.description == null){
                res.status(200).json(resultAuthor);
            }
            if(req.query.name == null && req.query.author == null && req.query.description != null){
                res.status(200).json(resultDescription);
            }
            //res.status(200).json(resultProduct);
        } catch (error) {
            res.status(500).json(error);
        }
    },
}
module.exports =productController;

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

function compare2Arrays(arr1, arr2) {
    let result = [];
  
    if (arr1 === null) {
      result = arr2.slice();
    } else if (arr1.length === 0 && arr2.length === 0) {
      result = [];
    } else if (arr2.length === 0) {
      result = [];
    } else {
      for (let i = 0; i < arr1.length; i++) {
        let obj1 = arr1[i];
        if (arr2.find(obj2 => JSON.stringify(obj2) === JSON.stringify(obj1))) {
          result.push(obj1);
        }
      }
    }
  
    return result;
  }
const authenticator = require('authenticator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const resetPass=require("../models/ResetPassword");
const { SECRET } = require("../config");

const products=require("../models/products")




/**
 * @DESC To Insert Product
 */
const insert_product = async (userDets,filename, res) => {
  try {
    // create a new user
    const newProduct = new products({
      ...userDets,
      image:filename.path
    });

    await newProduct.save();
    return res.status(201).json({
      message: "SuccessFully added the product",
      success: true
    });
  } catch (err) {
    // Implement logger function (winston)
    return res.status(500).json({
      message: "Unable to create your product.",
      success: false
    });
  }
};

const get_products= async (res)=>{
  all = await products.find((err, docs) => {
    if (!err) {
      res.send(docs);
      return docs;
      console.log(docs);
    }
    else { console.log('Error:' + JSON.stringify(err, undefined, 2)); }
  });
  //console.log(all)
};

const delete_product = async (id,res)=>{
  console.log(id)
  await products.findByIdAndDelete({_id:id},(err,docs)=>{
    //console.log(docs)
  })
  res.status(200).send('Deleted')
}


module.exports = {
    insert_product,
    get_products,
    delete_product
};

const { Schema, model } = require("mongoose");

const products = new Schema(
  {
    product_name: {
      type: String,
      required: true
    },
    product_id: {
      type: String,
      required: true
    },
    prise: {
      type: String,
      required: true
    },
    Sale_prise: {
      type: String,
    },
    categor: {
      type: String,
      required: true
    },
    featured:{
        type:Boolean
    },
    product_sd:{
        type:String,
        require:true
    },
    product_ld:{
        type:String,
        require:true
    },
    image:{
      type:String,
      require:true
    }
  },
  { timestamps: true }
);

module.exports = model("products", products);

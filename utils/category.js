const category=require("../models/category")


/**
 * @DESC To Insert Product
 */
 const insert_category = async (userDets, res) => {
    try {
      // create a new user
      const newCategory = new category({
        ...userDets,
      });
  
      await newCategory.save();
      return res.status(201).json({
        message: "Successfully Added The New Category",
        success: true
      });
    } catch (err) {
      // Implement logger function (winston)
      return res.status(500).json({
        message: "Unable to create Category.",
        success: false
      });
    }
  };

  const get_category= async (data,res)=>{
    all = await category.find({"category_name":data},(err, docs) => {
      if (!err) {
        res.send(docs);
        return docs;
        console.log(docs);
      }
      else { console.log('Error:' + JSON.stringify(err, undefined, 2)); }
    });
    //console.log(all)
  };


  module.exports = {
    insert_category,
    get_category
};
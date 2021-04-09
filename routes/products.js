const router = require("express").Router();
const products = require("../models/products");
const cors = require("cors");
const multer = require('multer');


//storage startegy
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});
//file filter
const fileFilter = (req, file, cb) => {
    //reject file
    if (file.mimetype === 'image/jpg' ||file.mimetype === 'image/jpeg'||file.mimetype === 'image/png') {
        cb(null, true);
    } 
    else{
    cb(new Error('Message wrong file type.'), false);
    }
}

const upload = multer({ 
    storage: storage ,
    fileFilter:fileFilter
});



//imorting function product
const {
    insert_product,
    get_products,
    delete_product
} = require("../utils/products");


// inserting a product

router.post("/insert_products", upload.single('productimage'), async (req, res, next) => {
    console.log(req.body)
    console.log(req.files)
    await insert_product(req.body, req.file,res);
    //res.status(202)
});

// Delet Product 
router.post("/delete_product",async(req,res,next)=>{
    //console.log(req.body)
    await delete_product(req.body.id,res)
})

//Get all Product from db
router.get('/get_products',async (req,res,next)=>{
    await get_products(res)
})


module.exports = router;




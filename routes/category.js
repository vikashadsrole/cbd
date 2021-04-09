const router = require("express").Router();
const category = require("../models/category");
const cors = require("cors");

const {
    insert_category,
    get_category
} = require("../utils/category");

router.post("/insert_category", async (req, res, next) => {
    console.log(req.body)
    await insert_category(req.body,res);
    res.status(202)
});


router.get("/get_category",async(req,res,next)=>{
    let cat=req.body.category_name
    await get_category(cat,res)
})

module.exports = router;
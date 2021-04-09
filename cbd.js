const cors = require("cors");
const exp = require("express");
const bp = require("body-parser");
const passport = require("passport");
const { connect } = require("mongoose");
const { success, error } = require("consola");
const User = require("./models/User");
const multer =require('multer')
const path = require('path')


const storage=multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'./uploads/')
  },
  filename:function(req,file,cb){
    cb(null,new Date().toISOString()+file.originalname);
  }
})

const upload= multer({storage:storage});
// Bring in the app constants
const { DB, PORT } = require("./config");

// Initialize the application
const app = exp();

// Middlewares
//##app.use(exp.static('event'))
app.use(cors());
app.use(bp.json());
app.use(passport.initialize());
app.use('/uploads',exp.static('uploads'));
app.use(exp.static('dist'))


app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
})

app.get('/test', (req, res) => {
  res.send('Test Worked...');
})


// User Router Middleware
app.use("/cbd/api/users", require("./routes/users"));
app.use("/cbd/api/products", require("./routes/products"));
app.use("/cbd/api/category", require("./routes/category"));

const startApp = async () => {
  try {
    // Connection With DB
    await connect(DB, {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true
    });

    success({
      message: `Successfully connected with the Database \n${DB}`,
      badge: true
    });

    // Start Listenting for the server on PORT
    app.listen(PORT, () =>
      success({ message: `Server started on PORT ${PORT}`, badge: true })
    );
  } catch (err) {
    error({
      message: `Unable to connect with Database \n${err}`,
      badge: true
    });
    startApp();
  }
};

app.get('/list',cors(),async (req,res)=>{

  all=await	User.find((err,docs)=>{
		if(!err){res.send(docs);return docs}
		else{console.log('Error:'+ JSON.stringify(err,undefined,2));}
	});
  //console.log(all)
  
});





startApp();

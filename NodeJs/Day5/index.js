const express = require('express');
const mongoose=require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/day1naode').then(()=>{
    console.log("connnected");
    
}).catch((err)=>{
    console.log("can not connect");
    
})

const multer  = require('multer')
const dotenv=require('dotenv')
const rodosRouter=require('./routes/todos');
const rodosUser=require('./routes/users');
const todomodel=require('./models/todos');
const AppError = require('./utils/AppError');

const app = express();
const port = 3000;
// const cors = require('cors')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + '_'+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })


app.post('/profile', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file);
    res.send("file uploaded")
    
  })

app.use(express.json());
// app.use(cors())   // origin :* with front end 




dotenv.config();
// middelware static 
app.use(express.static('./static'))

// view app
app.set('view engine','pug')
app.set('views','./views')

app.get('/todos/views',async (req,res)=>{
    let todos =await todomodel.find()
    res.render('todos',{todos})
})

app.use('/todos',rodosRouter)
app.use('/users',rodosUser)





// not found 
app.use((req,res,next)=>{
    // res.status(404).json({status:'fail',message:'notfound'})
    next( new AppError(404,"not found ") );
    
})

// error handel middelwear 
app.use((err,req,res,next)=>{
    // console.log(err.stack);
    // err.name='' 
    
    res.status(err.statuscode||500).json({status:'fail',message:err.message||'error try again'})
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

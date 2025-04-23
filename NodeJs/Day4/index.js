const express = require('express');
const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/day1naode').then(()=>{
    console.log("connnected");
    
}).catch((err)=>{
    console.log("can not connect");
    
})

const dotenv=require('dotenv')
const rodosRouter=require('./routes/todos');
const rodosUser=require('./routes/users');
const todomodel=require('./models/todos')

const app = express();
const port = 3000;
// const cors = require('cors')
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
    res.status(404).json({status:'fail',message:'notfound'})
})

// error handel middelwear 
app.use((err,req,res,next)=>{
    console.log(err.stack);
    
    res.status(500).json({status:'fail',message:'error try again'})
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

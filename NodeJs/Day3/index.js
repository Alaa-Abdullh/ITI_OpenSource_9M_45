const express = require('express');
const mongoose=require('mongoose');
require('dotenv').config();
// mongoose.connect('mongodb://127.0.0.1:27017/day1naode').then(()=>{
//     console.log("connnected");
    
// }).catch((err)=>{
//     console.log("can not connect");
    
// })


const rodosRouter=require('./routes/todos');
const rodosUser=require('./routes/users');

const app = express();
const port = process.env.PORT || 3000;
// const cors = require('cors')
app.use(express.json());
// app.use(cors())   // origin :* with front end 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error("Cannot connect to MongoDB Atlas:", err);
  });

// middelware static 
app.use(express.static('./static'))

app.use('/todos',rodosRouter)
app.use('/users',rodosUser)



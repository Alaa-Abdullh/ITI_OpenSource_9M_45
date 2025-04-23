const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;
// const cors = require('cors')
app.use(express.json());
// app.use(cors())   // origin :* with front end 

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});




// middelware static 
app.use(express.static('./static'))
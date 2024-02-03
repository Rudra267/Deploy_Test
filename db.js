require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGOURL

mongoose.connect(url,{

    // useUnifiedTopology:true,
    // useNewUrlParser:true
}).then(()=>{
    console.log("database connected")
}).catch((err)=>{
    console.log("database connection Error : "+err);
})
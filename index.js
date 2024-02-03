const express = require('express');
const cors = require('cors');
const app = express();
const port = 8009;
require('./db');
const router = require('./routes/router')


app.use(cors());
app.use('/user',router);
app.use(express.json());



// app.get('/',(req,resp)=>{
//     resp.status(201).json({message:"Server start"});
// })

app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
})
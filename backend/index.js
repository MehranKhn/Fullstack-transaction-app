const express = require("express");
const app=express();
const mainRouter=require('./routes/index')
const cors = require('cors');

app.use(express.json());

app.use(cors());

app.use('/api/v1',mainRouter)

app.listen(3000,()=>{
    console.log("Server is up and running");
});


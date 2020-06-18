const path=require('path');
const express=require('express');


const app=express();

//set static folder
app.use(express.static());


const PORT=3000 || p
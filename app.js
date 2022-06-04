const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({ path: './.env' })


const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABSE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});


const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

app.set('view engine','hbs');


db.connect( (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MySQL connected...")
    }
    
})


app.get("/", (req,res)=>{
    // res.send("<h1>test<h1>")
    res.render("index")
});

app.get("/register", (req,res)=>{
    // res.send("<h1>test<h1>")
    console.log("dasda")
    res.render("register")
});

app.listen(420  ,()=>{
    console.log("testtt")
})
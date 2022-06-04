const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require('path');

dotenv.config({ path: './.env' })

//defining db
const app = express();
const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABSE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE

});

//create public folder
const publicDirectory = path.join(__dirname,'./public')
app.use(express.static(publicDirectory))

//grabing data as json
app.use(express.urlencoded({extended:false}))
app.use(express.json());



//templates
app.set('view engine','hbs');

//db connection msg
db.connect( (error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("MySQL connected...")
    }
    
})
//routes
app.use('/', require('./routes/pages'))

app.use("/auth", require('./routes/auth'))


app.listen(5000  ,()=>{
    console.log("testtt")
})
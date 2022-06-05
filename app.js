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

db.connect(function(err) {
    if (err) throw err;
    //Select all customers and return the result object:
    db.query("SELECT * FROM user", function (err, result, fields) {
      if (err) throw err;
      console.log(result);
    });
});
  

//routes
app.use('/', require('./routes/pages'))

app.use("/auth", require('./routes/auth'))

app.use("/auth/pumps",require('./routes/auth'))

app.listen(5000  ,()=>{
    console.log("testtt")
})

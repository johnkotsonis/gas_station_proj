const express = require("express");

const router = express.Router();

router.get('/', (req,res)=>{
    res.render('index');
})

router.get('/login', (req,res)=>{
    res.render('login');
})



router.get('/moves', (req,res)=>{
    res.render('moves');
})

module.exports = router;
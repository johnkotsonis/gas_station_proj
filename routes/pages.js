const express = require("express");

const router = express.Router();

router.get('/', (req,res)=>{
    res.render('index');
})

router.get('/login', (req,res)=>{
    res.render('login');
})

router.get('/homepage', (req,res)=>{
    res.render('index');
})


router.get('/auth/pumps', (req,res)=>{
    res.render('pumps');
})
module.exports = router;
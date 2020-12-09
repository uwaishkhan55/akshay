const express = require('express')
const mongoose = require('mongoose')
const app = express()
const fetch = require('node-fetch');
const { stringify } = require('querystring');
const { connnectDB, User, Data } = require('./models/User')
const jwt = require('jsonwebtoken');
const authenticateJWT  = require('./authenticate')
app.use(express.static('public'))
connnectDB();
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

var cookieParser = require('cookie-parser')
app.use(cookieParser())
app.post('/login', (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    console.log(email+" "+password)
    User.findOne({ email, password }).then(user => {
        if (user)
        {
            const accessToken = jwt.sign({ email: user.email }, 'akshay');
            console.log(accessToken)
            return res.cookie('token',accessToken).cookie('name',user.name.split(' ')[0]).redirect('/user.html');
        }    
        else res.redirect('/');
    })
     
})




app.post('/url', authenticateJWT, (req, res) => {
    let email = req.user.email
    console.log(email)

    
    let url = req.body.url;
    fetch(url)
    .then(res => res.text())
        .then(text => {
            User.updateOne({ email }, {
                $push: { data: { url:text}}
            }).then((user) => {
                console.log(user)
            return res.json({status:200,Data:text})
        })
        
        })
    // User.findOne({ email, password }).then(user => {
    //     if (user) return res.redirect('/user.html');
    //     else res.redirect('/');
    // })
     
})










app.listen(process.env.PORT || 5000);
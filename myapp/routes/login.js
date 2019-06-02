const express = require('express');
const router = express.Router();
const md5 = require('md5');
const user = require('../models/user');

router.get("/", function (req, res) {
    res.render("login");
})

router.post('/', function (req, res) {
    user.find({
        username: req.body.username,
        password: md5(req.body.password)
    }, function (err, result) {
        if (err) throw err;
        if (result.length) { 
            //匹配成功
            req.session.username = req.body.username;
            req.session.password = md5(req.body.password);
            res.redirect('/add/list');
        } else { 
            // 匹配不成功  重新登录
            res.render('login');
        }
    })
})
module.exports = router;
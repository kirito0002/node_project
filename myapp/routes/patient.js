const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const patient = require('../models/patient');
const login=require('../middlewares/login')

router.get('/delete/:id', login,function (req, res) {
    //req.params.id
    //根据id查询数据库  删除这个数据
    patient.findByIdAndRemove(req.params.id, function (err) {
        if (err) throw err;
        console.log("数据库删除成功");
        //删除相应的图片 
        fs.unlink(path.join(__dirname, "../", 'uploads', req.query.img), function (err) {
            if (err) throw err;
            console.log("图片删除成功");
        });
        //客户端保持list页面展示
        //res.redirect("back");
        res.redirect("/add/list");
    })
})
router.get('/update/:id', login,function (req, res) {
    // req.params.id
    //更具id查询数据
    patient.findById(req.params.id, function (err, result) {
        if (err) throw err;
        //提供更新数据的页面  update.ejs
        res.render("update", {
            data: result
        })
    })
})
var arr = [];
router.get('/search',function(req,res){
    patient.find({"title": new RegExp(req.query.title)},function(err,result){
        if(err) throw err;
        console.log(result);
        res.render('list',{arr:result})
    })
})

router.post('/update/:id', function (req, res) {
    //解析数据
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, "../", "uploads");
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        //组装数据
        var obj = {
            ...fields
        }
        //判断数据图片有没有更新
        if (files.pic.name) { //图片更新
            obj.pic = "/" + path.basename(files.pic.path);
        } else { //图片没有更新  使用原来的图片

        }
        patient.findByIdAndUpdate(req.params.id,obj,function(err){
            if(err) throw err;
            console.log("更新成功");
            //重定向到展示页面list页面
            res.redirect('/add/list');
        })
    })
})


module.exports = router;
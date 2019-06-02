const express = require('express');
const path = require('path');
const formidable = require('formidable');
const patient=require("../models/patient");
const login=require('../middlewares/login');
const router = express.Router();

router.get("/", login,function (req, res) {
    res.render("add");
})

router.post('/', function (req, res) {
    const form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.uploadDir = path.join(__dirname, "../", "uploads");
    form.parse(req, function (err, fields, files) {
        if (err) throw err;
        //保存数据放到数据库
        var obj = {
            ...fields,
            pic: "/" + path.basename(files.pic.path)
        }
        var patientIstance=new patient(obj);
        patientIstance.save();
        res.redirect('/add/list');
    })
})
//获取数据库数据
router.get('/list', function (req, res) {
    
    patient.find({},function(err,results){
        if(err) throw err;
        res.render('list', {arr:results})
    })
})

module.exports = router;
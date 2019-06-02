//定义上传商品字段
const mongoose=require('mongoose');
const Schema= mongoose.Schema;
const patientSchema=new Schema({
    title:{type:String,required:true},
    pic:String,
    price:Number,
    fee:String,
    description:String,
    createAt:String,
    updateAt:{type:String,default:"未出院"}
});

//指定数据库中的存储集合
const patient=mongoose.model("patient",patientSchema);
//暴露模块
module.exports=patient;


//module.exports=mongoose.model("product",productSchema);;

var express = require('express');
var path = require('path');
const moment = require('moment');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const MongoStore=require('connect-mongo')(session);
var app = express();
app.locals.moment = moment;


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser());
app.use(cookieParser("123456"));
app.use(session({
  secret:"123456",
  name:"sessionId",
  cookie:{maxAge:60*1000},
  rolling:true,
  store:new MongoStore({
    url:"mongodb://localhost:27017/app" 
  })
}));


//链接数据库
mongoose.connect("mongodb://localhost/app", {
  useNewUrlParser: true,
  useFindAndModify: false
});
const con = mongoose.connection;
con.on('open', function () {
  console.log("数据库连接成功");
})

app.use('/login',require('./routes/login'));
app.use('/register',require('./routes/register'));
app.use('/add', require('./routes/add'));
app.use('/patient', require('./routes/patient'));



// error handler
app.listen(4000);
module.exports = app;
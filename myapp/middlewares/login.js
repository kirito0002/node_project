//判断登录权限的
//如果你登录 req.cookies
//数据库匹配

module.exports = function (req, res, next) {
    if(req.session.username&&req.session.password){
        next()
    }else{
        res.redirect('/login');
    }
    
}
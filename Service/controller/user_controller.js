const user_model = require('../model/user_model');

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(cookieParser());




module.exports = {

    async c_UserJoin(req, res) {

        const name = req.body.name;
        const age = req.body.age;
        const gender = req.body.gender;
        const id = req.body.id;
        const password = req.body.password;

        let [result, err_message] = await user_model.m_UserJoin(name, age, gender, id, password);

        if (result) {
            res.render('join-complete', {
                name: name
            });
        } else {
            res.render('join-fail', {
                message: err_message
            });
            // 409 Conflict 리소스의 현재 상태와 충돌해서 해당 요청을 처리할 수 없기때문에
            // 클라이언트에서 충돌을 수정해서 다시 요청을 보내야함.

            // res.status(409);

            // res.send(err_message);
        }
    },

    async c_UserList(req, res) {
        let user_list = await user_model.m_GetUserList();
        res.status(200);
        res.json(user_list);
    },
    async c_UserLeave(req, res) {

        const id = req.body.id;
        const password = req.body.password;

        let [result, err_message] = await user_model.m_UserLeave(id, password);

        if (result) {
            res.render('leave-complete', {
                name: id
            });
        } else {

            res.render('leave-fail', {
                message: err_message
            });

        }
    },
    async c_UserLogin(req, res) {

        const name = req.body.name;
        const age = req.body.age;
        const gender = req.body.gender;
        const id = req.body.id;
        const password = req.body.password;

        let [result, err_message] = await user_model.m_UserLogin(name, age, gender, id, password);

        if (result) {
           
            res.cookie('loginId', id);
            // cookie 읽기
            console.log(req.cookies);
            res.render('login-complete', {
                id: id
                
            });
            
        

        } else {
            res.render('login-fail', {
                message: err_message
            });
        }
    }

}
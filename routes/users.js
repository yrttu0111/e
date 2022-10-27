var express = require('express');
var router = express.Router();

const user_controller = require('../Service/controller/user_controller');



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


// 전체 경로 localhost:3000/users/join
router.get('/join', function (req, res) {
  // 회원가입 페이지를 보여준다.
  res.render('join');
});

// router.post('/join', function (req,res) {
//   console.log(req.body);
//   res.json(req.body);
// });

router.post('/join', user_controller.c_UserJoin);
// 전체 경로 localhost:3000/users/list

router.get('/list', user_controller.c_UserList);

router.get('/leave', function (req, res) {
  // 탈퇴 페이지를 보여준다.
  res.render('leave');
});
router.post('/leave', user_controller.c_UserLeave);

router.get('/login', function (req, res, next) {
  // 로그인 페이지를 보여준다.
  var userId = "";
  if (req.cookies['loginId'] !== undefined) {
    console.log("로그인 정보 있음");
    userId = req.cookies['loginId'];
    
  }
  res.render('login', {
    userId: userId
  });
});
router.post('/login', user_controller.c_UserLogin);

module.exports = router;
const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()
router.get('/', async (ctx) => {
  ctx.body = "这是用户操作首页"
})
// 注册
router.post('/register', async (ctx) => {
  //取得Model
  const User = mongoose.model('User')
  //把从前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body)
  //用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(() => {
    //成功返回code=200，并返回成功信息
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(error => {
    //失败返回code=500，并返回错误信息
    ctx.body = {
      code: 500,
      message: error
    }
  })
})
// 登陆
router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  console.log(loginUser)
  let userName = loginUser.userName
  let password = loginUser.password

  // 引入User的model
  const User = mongoose.model('User');
  await User.findOne({ userName: userName }).exec().then(async (res) => {
    console.log(res)
    if (res) {
      let newUser = new User()
      await newUser.comparePassword(password, res.password).then(isMatch => {
        ctx.body = { code: 200, message: isMatch }
      }).catch(err => {
        console.log(err)
        ctx.body = { code: 500, message: err }
      })
    } else {
      ctx.body = { code: 200, message: '用户名不存在' }
    }
  }).catch(err => {
    console.log(err)
    ctx.body = { code: 500, message: err }
  })
})
module.exports = router

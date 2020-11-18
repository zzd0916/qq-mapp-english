'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.model.User.find({});
  }

  async login() {
    const { ctx, app } = this;
    const param = ctx.request.body;
    const ret  = await ctx.model.User.findOne({ username: param.username, pwd: param.pwd }, { pwd: 0 }, (err, user) => {
    });
    if (ret) {

      const token = app.jwt.sign({
        realName: ret.realName,
        username: ret.username,
        _id: ret._id,
        role: ret.role ? ret.role:  'member',
      }, app.config.jwt.secret);

      ctx.body = {
        state: 1,
        msg: '登录成功',
        data: {
          user: ret,
          token: `Bearer ${token}`
        },
      };
    } else {
      ctx.body = {
        state: 0,
        msg: '用户名或密码不正确',
      };
    }
  }
}

module.exports = HomeController;

// exports.index = function* (ctx) {
//   ctx.body = yield ctx.model.User.find({});
// }

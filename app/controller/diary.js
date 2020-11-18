'use strict';

const Controller = require('egg').Controller;

class DiaryController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.model.Diary.find({});
  }
  async save() {
    const { ctx } = this;
    const params = this.ctx.request.body
    const ret = await ctx.model.Diary.create(params);
    if(ret) {
      ctx.body = {
        state: 1,
        data: {
          user: ret
        }
      }
    } else {
      ctx.body = {
        state: 0,
        msg: '保存数据失败'
      }
    }
  }
  async del() {
    const { ctx } = this;
    const params = this.ctx.request.body
    const ret = await ctx.model.Diary.deleteOne({_id: params._id});
    if(ret && ret.deletedCount > 0 ) {
      ctx.body = {
        state: 1,
        data: {
          user: ret
        }
      }
    } else {
      ctx.body = {
        state: 0,
        msg: '保存数据失败'
      }
    }
  }
}

module.exports = DiaryController;

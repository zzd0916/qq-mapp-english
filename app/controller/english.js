'use strict';

const Controller = require('egg').Controller;
const typeMap = {
  '1': "EnglishHome",
  '2': "EnglishWord",
  '3': "EnglishListen",
  '4': "EnglishVideo",
}
class EnglishController extends Controller {
  async getOne() {
    const { ctx } = this;
    const { type, p, ps } = ctx.request.query;
    if(!type) ctx.body = {state: 0, msg: "params error"}
    let t = typeMap[type] || 'EnglishHome'
    ctx.body = await ctx.model[t].aggregate([{$sample: {size:1}}]);
  }
  
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.model.Soup.find({});
  }

  async list() {
    const { ctx } = this;
    let { p, ps } = ctx.request.query;
    // const count = await ctx.model.find({}).count();
    // if(p < 1) {
      // p = 1;
    // }
    // if(p > (count/ps)) {
      //p = parseInt(count/ps)
    //}
    ctx.body = await ctx.model.Soup.find({}).skip((p-1)*parseInt(ps)).limit(parseInt(ps));
  } 
 
  async save() {
    const { ctx } = this;
    const params = this.ctx.request.body
    const ret = await ctx.model.Soup.create(params);
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
    const ret = await ctx.model.Soup.deleteOne({_id: params._id});
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

module.exports = EnglishController;

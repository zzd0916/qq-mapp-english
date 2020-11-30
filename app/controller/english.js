'use strict';
const puppeteer = require('puppeteer');
const Controller = require('egg').Controller;

const typeMap = {
  '1': "EnglishHome",
  '2': "EnglishWord",
  '3': "EnglishListen",
  '4': "EnglishVideo",
}

class EnglishController extends Controller {
  async detail() {
    const { ctx } = this;
    const { url } = ctx.request.body;
    console.log( url, '=================' )
    const browser = await puppeteer.launch({
      headless: true,
    })
    
    const page = await browser.newPage();
    await page.goto(url, {waitUntil: 'domcontentloaded'});
    // 其他操作...
    // detailData = await page.content()
    let content = await page.$$eval('#Content > p', els => {
      let json = []
      for(let i = 0; i < els.length; i++) {
        if(els[i].innerText.length > 10) {
          json.push({
            type: els[i].tagName,
            content: els[i].innerText
          })
        }
      }
      return json
    })

    let audio = await page.$$eval('#Content audio', el => el.getAttribute('src'))
    console.log(audio)

    let img = await page.$$eval('#Content img', el => el.getAttribute('src'))
    console.log(audio)

    await browser.close();

    ctx.body = {
      state: 1,
      data: {
        detailData: content
      }
    }
    
  }
  
  async index() {
    const { ctx } = this;
    ctx.body = await ctx.model.Soup.find({});
  }

  async list() {
    const { ctx } = this;
    const { type, p=1, ps=10 } = ctx.request.query;
    if(!type) {
      ctx.body = {state: 0, msg: "params error"}
      return
    }
    let t = typeMap[type] || 'EnglishHome'
    ctx.body = await ctx.model[t].find({}).skip((p-1)*parseInt(ps)).limit(parseInt(ps));
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

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
    let title = await page.$eval(".main_title1", el => el.innerText);
    let origin = await page.$eval(".main_title3", el => el.innerText);
    let content = await page.$$eval('#Content > *', els => {
      let json = []
      for(let i = 0; i < els.length; i++) {
        let el = els[i];
        let type = el.tagName;
        let reSrc = /\s+src=['"]([^'"]+)['"]/
        let html = el.innerHTML;

        const pushData = (data)=> {
          let flag = json.some( i=> {
            JSON.stringify(i) == JSON.stringify(data)
          })
          if(!flag) {
            json.push(data)
          }
        }

        switch (type) {
          case 'DIV': 
            // 判断有没有音频 
            if(html.indexOf('audio') > 0)  {
              pushData({
                type: 'AUDIO',
                src: reSrc.exec(html)[1]
              })
            }
            
            // 判断有没有音频 
            if(html.indexOf('video') > 0)  {
              pushData({
                type: 'VIDEO',
                src: reSrc.exec(html)[1]
              })
            }

            break;
            
          case "P": {
            if(el.innerText.length>10) {
              pushData({
                type: type,
                content: els[i].innerText
              })
            }
            break;
          }
          case "FIGURE": {
            if(html.indexOf('img') > 0) {
              pushData({
                type: "IMAGE",
                src: html.match(reSrc)[1]
              })
            }
            break;
          }
          default: 
            pushData({
              type: type,
              content: html
            })
        }
      }
      return json
    })

    await browser.close();

    ctx.body = {
      state: 1,
      data: {
        detailData: {
          list: content,
          title,
          origin
        }
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

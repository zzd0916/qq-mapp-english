'use strict';

const Controller = require('egg').Controller;
const  qiniu = require("qiniu");


class UploadController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'upload, egg';
  }

  async getUploadToken() {
    const { ctx } = this;
    const KEY = ctx.app.config.UploadKeys;
    const mac = new qiniu.auth.digest.Mac(KEY.AK, KEY.SK);
    const options = {
      scope: KEY.Bucket_Name,
      expires: KEY.Expires
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken=putPolicy.uploadToken(mac);

    ctx.body = {
      state: 1,
      data: {
        uploadToken,
        domain: 'http://qdcknas7k.bkt.clouddn.com/'
      }
    }
  }

  async upload(file) {
    // const { ctx } = this;
    // ctx.body = 'hi, upload'
    // const { ctx } = this;
    // const KEY = ctx.app.config.UploadKeys;

    // //需要填写你的 Access Key 和 Secret Key
    // qiniu.conf.ACCESS_KEY = KEY.AK;
    // qiniu.conf.SECRET_KEY =  KEY.SK;
    // //要上传的空间
    // bucket = KEY.Bucket_Name;
    // //上传到七牛后保存的文件名
    // key = file.name;
    // //构建上传策略函数
    // function uptoken(bucket, key) {
    //   var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    //   return putPolicy.token();
    // }
    // //生成上传 Token
    // token = uptoken(bucket, key);
    // //要上传文件的本地路径
    // filePath = './ruby-logo.png'
    // //构造上传函数
    // function uploadFile(uptoken, key, localFile) {
    //   var extra = new qiniu.io.PutExtra();
    //   qiniu.io.putFile(uptoken, key, localFile, extra, function (err, ret) {
    //     if (!err) {
    //       // 上传成功， 处理返回值
    //       console.log(ret.hash, ret.key, ret.persistentId);
    //     } else {
    //       // 上传失败， 处理返回代码
    //       console.log(err);
    //     }
    //   });
    // }
    // //调用uploadFile上传
    // uploadFile(token, key, filePath);
  }
}

module.exports = UploadController;

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const DiarySchema = new Schema({
    title: { type: String },
    imgList: { type: Array },
    desc: { type: String },
    address: { type: String },
    createTime: { type: String },
    photoTime: { type: String },
  });
  return mongoose.model('Diarys', DiarySchema, 'diary');
};

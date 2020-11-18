'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const EnglishVideoSchema = new Schema({
    title: { type: String },
    url: { type: String },
    desc: { type: String },
    img_url: { type: String },
    createTime: { type: String },
  });
  return mongoose.model('EnglishVideo', EnglishVideoSchema, 'english_videos');
};

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const EnglishHomeSchema = new Schema({
    title: { type: String },
    url: { type: String },
    desc: { type: String },
    img_url: { type: String },
    createTime: { type: String },
  });
  return mongoose.model('EnglishHome', EnglishHomeSchema, 'english_homes');
};

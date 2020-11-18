'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const SoupSchema = new Schema({
    content: { type: String },
    createTime: { type: String },
  });
  return mongoose.model('Soup', SoupSchema, 'soups');
};

'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const UserSchema = new Schema({
    username: { type: String },
    pwd: { type: String },
    realName: { type: String },
  });
  return mongoose.model('Users', UserSchema);
};

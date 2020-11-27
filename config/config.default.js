/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */

module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1594539606598_4585';

  // add your middleware config here
  config.middleware = [];

  config.multipart = {
    mode: 'file',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwt = {
    secret: 'zhile',
  };

  config.mongoose = {
    client: {
      url: 'mongodb://127.0.0.1/mapp',
      options: {
        useNewUrlParser: true, 
        // useUnifiedTopology: true,  
        useUnifiedTopology: true,
        // auth: { authSource: 'admin' },
        // user: 'mapp',
        // pass: 'mapp',
      },
      // mongoose global plugins, expected a function or an array of function and options
      // plugins: [createdPlugin, [updatedPlugin, pluginOptions]],
    },
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    UploadKeys: {
      AK: 'wPcTnmtmFwo13S8X5-00ekCySr4BMfeQsOzw6403',
      SK: 'otMr5Y1YS6EzHfrAe3mfjvCY1P8B6eQ8MPA7yqNp',
      Bucket_Name: 'babyttt',
      Expires: 7200
    },
  };

  return {
    ...config,
    ...userConfig,
  };
};

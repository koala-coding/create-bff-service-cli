'use strict';

const envconfig = require('./envconfig');

module.exports = (appInfo) => {
  const config = {};
  config.keys = appInfo.name + '_{{configKeys}}';

  //----环境级配置----
  config.envconfig = envconfig;

  //----应用级配置----
  /*config.middleware = ['bffSdk'];
  config.bffSdk = {
    builtinApi: {
      prefix: '/{{urlPrefix}}',
    },
  };*/

  return config;
};

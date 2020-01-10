module.exports = function(env) {
  const config = require(`./config/webpack.${env}.config.js`);
  return config;
};

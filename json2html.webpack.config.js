var basic = require('./basic.webpack.config');

basic.entry = {
    JsonToHtml: "./json2html/es6/index.js",
};
basic.output = {
    path: __dirname + '/../',
    filename: 'index.js'
};

module.exports = basic;
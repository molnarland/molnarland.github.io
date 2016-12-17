var basic = require('./basic.webpack.config');

basic.entry = {
    JsonToHtml: "./json2html/es6/JsonToHtml.js",
};
basic.output = {
    path: __dirname + '/../',
    filename: 'JsonToHtml.js'
};

module.exports = basic;
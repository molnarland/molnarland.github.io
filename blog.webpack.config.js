var basic = require('./basic.webpack.config');

basic.entry = {
    main: "./blog/src/index.js",
};
basic.output = {
    path: __dirname + '/../dist',
    filename: 'main.js'
};

module.exports = basic;
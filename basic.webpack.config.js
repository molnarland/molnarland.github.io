module.exports = {
    entry: {},
    output: {
        path: __dirname + '/dist',
        filename: '[name].js',
        pathinfo: false
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ["es2017", "es2016", "es2015"]
                }
            }
        ]
    },
    devtool: 'source-map',
    debug: false
};

module.exports = {
    entry: "./blog/src/index.js",
    output: {
        filename: 'main.js'
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
    devtool: 'source-map'
};
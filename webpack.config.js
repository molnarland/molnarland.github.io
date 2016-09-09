module.exports = {
    entry: "./blog/src/index.js",
    output: {
        filename: 'main.js',
        library: 'LanguageModel'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    devtool: 'source-map',
    open: false
};
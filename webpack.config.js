const path = require('path')

module.exports = {
    entry: './app/index.jsx',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
            },
        ],
    },
    resolve: {
        extensions: ['.jsx', '.ts', '.js'],
    },
};

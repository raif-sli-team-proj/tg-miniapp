const path = require('path')

module.exports = function (env, argv) {

	const cfg = {
        entry: './app/index.jsx',
        output: {
            filename: 'miniapp.js',
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
        devtool: env.development ? 'inline-source-map' : false,
        devServer: {
            static: "./static",
            port: 9000,
        },
    }
    return cfg;
}

const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
    entry: slsw.lib.entries,
    mode: 'production',
    target: 'node',
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
};

const path = require('path');

module.exports = {
    entry: {
        'popup': './src/index.tsx',
        'content-script': './src/contentScript.tsx',
        'service-worker': './src/background.tsx',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    devtool: 'source-map',
    module: {
        rules: [
            {test: /\.tsx?$/, loader:"ts-loader"},
        ]
    },
    optimization: {
        usedExports: true,
    }
};

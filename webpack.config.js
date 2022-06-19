const path = require('path');

const configuration = () => ({
    mode: 'production',
    target: 'node',
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.js']
    }
});

module.exports = configuration;

var path = require('path');
var webpack = require('webpack');

module.exports = {

    entry: [
        './src/index'
    ],

    output: {
        path: path.join(__dirname, 'static'),
        publicPath: '/static/',
        filename: 'bundle.js'
    },

    /* TODO (for production)

    new webpack.optimize.UglifyJsPlugin()
    new webpack.optimize.DedupePlugin()


    add [hash] to enable long term caching.

    */

    module: {
        loaders: [
            {test: /\.less$/, loader: 'style!css!less'},
            {test: /\.css$/, loader: 'style!css!'},
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=10000'},
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src'),
                loader: 'babel',
                query: {
                    presets: ['react']
                }
            }
        ]
    },

    // These are dependencies (e.g.: `require('react');`) in your project that
    // are not included in the output file (`bundle.js`) as you should
    // link to them directly via a CDN, or something.
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
    }
};
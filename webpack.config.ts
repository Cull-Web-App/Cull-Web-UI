const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        build: "./distlib/src/client/index.js"
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: [/node_modules/],
                options: {
                    appendTsSuffixTo: [/\.vue$/],
                }
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 50000, // Convert images < 8kb to base64 strings
                            name: 'images/[hash]-[name].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.(scss|css|less)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "./src/**/*.html",
                to: "",
                flatten: true
            },
            {
                from: "./src/**/*.css",
                to: "",
                flatten: true
            },
            {
                from: "./src/**/*.ico",
                to: "",
                flatten: true
            }
        ]),
        new webpack.EnvironmentPlugin([ // Theres an issue with this overwritting all the env info
            'NODE_ENV'
        ])
    ],
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map',
    node: {
        fs: 'empty'
    }
};

// Production webpack build
if (process.env.NODE_ENV === 'PROD') {
    console.log('Production build');
    module.exports.devtool = '#source-map';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                warnings: false
            }
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]);
}
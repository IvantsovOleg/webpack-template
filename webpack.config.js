const path = require('path'); // создание валидных URL
const HTMLWebpackPlugin = require('html-webpack-plugin'); // полагин для WebPack для работы с HTML
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // Чистит папку DIST от фалов со старыми хэш при компиляции файлов
const CopyWebpackPlugin = require('copy-webpack-plugin'); // просто копирование файлов
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // экспорт файлов css в отдельные файлы
const OptimizCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin'); // оптимизация и минимализация css файлов
const TerserWebpackPlugin = require('terser-webpack-plugin'); // парсер js файлов для их минификации
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const isDev = process.env.NODE_ENV === 'development';
// console.log('ID DEV: ', isDev);
const isProd = !isDev;

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }

    return config;
}

const filename = ext => isDev ? `[name].${ext}`: `[name].[hash].${ext}`;

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: isDev
            }
        },
        'css-loader'
    ];
    if (extra) {
        loaders.push(extra);
    }
    return loaders;
}

const babelOptions = preset => {
    const opt = {
        presets: [
            '@babel/preset-env'
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties'
        ]
    }

    if (preset) {
        opt.presets.push(preset);
    }
    return opt;
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }];
    if (isDev) {
        loaders.push('eslint-loader');
    }
    return loaders;
}

const plugins = () => {
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd, // минимизация файлов html
            }
        }),
        new CleanWebpackPlugin, // Чистит папку DIST от фалов со старыми хэш при компиляции файлов
        new CopyWebpackPlugin ([
            {
                //простое копирование файлов из dev на prod
                from: path.resolve(__dirname, 'src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]),
        new MiniCssExtractPlugin ({
            filename: filename('css'),
        })
    ];

    if (isProd) {
        base.push(new BundleAnalyzerPlugin());
    }

    return base;
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        main: [
            '@babel/polyfill',
            './index.jsx'
        ],
        analytics: './analytics.ts'
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js', '.json'], // не обязательная настройка, которая позволяет не писать расширения некоторых файлов
        alias: {
            '@models': path.resolve(__dirname, 'src', 'models'),
            '@': path.resolve(__dirname, 'src'),
        }
    },
    optimization: optimization(),
    devServer: {
        // настрйка сервера разработки для автоматических применений изменений
        port: 4200,
        // hot: process.env.NODE_ENV === 'development'
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader')
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            },
            {
                test: /\.csv$/,
                use: ['csv-loader']
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-typescript')
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: babelOptions('@babel/preset-react')
            }
        ]
    }
}
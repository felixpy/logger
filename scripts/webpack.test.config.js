'use strict'
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const webpackConfig = merge(baseWebpackConfig, {
  devtool: 'inline-source-map'
})

module.exports = webpackConfig
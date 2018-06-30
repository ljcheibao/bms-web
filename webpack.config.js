const webpack = require("webpack");
const fs = require("fs");
const path = require("path");
const baseDir = process.cwd();
const srcDir = path.resolve(baseDir, 'src');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const pkg = require("./package.json");
const projectName = pkg.name;
const version = pkg.version;


module.exports = function () {
  var extendConf = {
    module: {
      rules: [

      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        axios: "axios",
        "window.axios": "axios"
      }),
      new CopyWebpackPlugin([
        {
          from: `${srcDir}/scripts/libs/jquery-3.2.1.min.js`,
          to: process.env.NODE_ENV == 'dev' ? `${baseDir}/__build/jquery-3.2.1.min.js` : `${baseDir}/build/bms/${version}/scripts/`
        },
        {
          from: `${srcDir}/scripts/libs/brutusin-json-forms-bootstrap.js`,
          to: process.env.NODE_ENV == 'dev' ? `${baseDir}/__build/brutusin-json-forms-bootstrap.js` : `${baseDir}/build/bms/${version}/scripts/`
        },
        {
          from: `${srcDir}/scripts/libs/bootstrap.min.js`,
          to: process.env.NODE_ENV == 'dev' ? `${baseDir}/__build/bootstrap.min.js` : `${baseDir}/build/bms/${version}/scripts/`
        },
        {
          from: `${srcDir}/scripts/libs/brutusin-json-forms.js`,
          to: process.env.NODE_ENV == 'dev' ? `${baseDir}/__build/brutusin-json-forms.js` : `${baseDir}/build/bms/${version}/scripts/`
        },
        {
          from: `${srcDir}/scripts/libs/underscore.js`,
          to: process.env.NODE_ENV == 'dev' ? `${baseDir}/__build/underscore.js` : `${baseDir}/build/bms/${version}/scripts/`
        },
        {
          from: `${srcDir}/scripts/libs/jsonform.js`,
          to: process.env.NODE_ENV == 'dev' ? `${baseDir}/__build/jsonform.js` : `${baseDir}/build/bms/${version}/scripts/`
        },
        {
          from: `${srcDir}/scripts/libs/jsv.js`,
          to: process.env.NODE_ENV == 'dev' ? `${baseDir}/__build/jsv.js` : `${baseDir}/build/bms/${version}/scripts/`
        },
        {
          from: `${srcDir}/css/brutusin-json-forms.css`,
          to: process.env.NODE_ENV == 'dev' ? `${baseDir}/__build/brutusin-json-forms.css` : `${baseDir}/build/bms/${version}/css/`
        }
        /* {
          from: `${srcDir}/images/nobuild`,
          to: `${baseDir}/build/${projectName}/${version}/images`
        } */
      ])
    ],
    resolve: {
      alias: {
        "axios": path.resolve(baseDir, 'node_modules/axios/dist/axios.min.js'),
        'vue$': path.resolve(baseDir, 'node_modules/vue/dist/vue.min.js')
      }
    }
  };
  return extendConf;
};
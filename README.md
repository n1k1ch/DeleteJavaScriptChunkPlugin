DeleteJavaScriptChunkPlugin
==

If you have webpack entries, for which you don't need js files to be put into output directory, you can use this plugin.

Used only with [extract-text-webpack-plugin](https://github.com/webpack/extract-text-webpack-plugin).

Loader for DELETE_JAVASCRIPT_CHUNK_FILE_EXTENSION should produce file with EXTRACT_TEXT_FILE_EXTENSION

Example:

webpack.config.js
```
var DeleteJavaScriptChunkPlugin = require('delete-javascript-chunk-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    entry: {
        app: './src/app',
        'only-css.entry': './src/only-css-entry.scss'
    },

    /*...*/

    plugins: [
       new ExtractTextPlugin('[name].css'),
       new DeleteJavaScriptChunkPlugin({extensions: 'scss'})
    ]
}

```
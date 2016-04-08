DeleteJavaScriptChunkPlugin
==

If you have webpack entries, for which you don't need js files to be put into output directory, you can use this plugin.

Example:

webpack.config.js
```
var DeleteJavaScriptChunkPlugin = require('plugins/DeleteJavaScriptChunkPlugin');


module.exports = {
    entry: {
        'only-css.entry': './src/only-css-entry.scss'
    },

    /*...*/

    plugins: [
       new DeleteJavaScriptChunkPlugin({extensions: 'scss'})
    ]
}

```
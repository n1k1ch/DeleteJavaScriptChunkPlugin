/*
 MIT License http://www.opensource.org/licenses/mit-license.php
 Author Nikita Cherevkov @n1k1ch
 */

/**
 *
 * After build deletes *.js chunk in case:
 * - module is an entry
 * - module has extension, provided in options
 *
 * For example, to delete "*.js" file for SCSS entries:
 *
 * entry: {
 *      'only-css-module': './css/only-css.scss'
 * }
 * ...
 * plugins: {
 *      new DeleteJavaScriptChunkPlugin({extensions: 'scss'})
 * }
 *
 */

'use strict';

var fs = require('fs');
var chalk;

try {
    require.resolve('chalk');
    chalk = require('chalk');
} catch (e) {}

DeleteJavaScriptChunkPlugin.prototype._log = function(msg) {
    if(chalk) {
        console.log(chalk.yellow('DeleteJavaScriptChunkPlugin: ') + msg);
    } else {
        console.log('DeleteJavaScriptChunkPlugin: ' + msg);
    }
};
DeleteJavaScriptChunkPlugin.prototype._logNumberOfFiles = function(numberOfFiles) {
    if(chalk) {
        this._log(numberOfFiles === 0 ?
            'No files to delete' :
            numberOfFiles === 1 ?
                'One file to delete' :
            'Files to delete: ' + chalk.green(chalk.bold(numberOfFiles))
        );
    } else {
        this._log(numberOfFiles === 0 ?
            'No files to delete' :
            numberOfFiles === 1 ?
                'One file to delete' :
            'Files to delete: ' + numberOfFiles
        );
    }
};

function DeleteJavaScriptChunkPlugin(options) {
    this.options = options;
}

DeleteJavaScriptChunkPlugin.prototype._stringEndsWith = function (source, test) {
    return source.indexOf(test) === (source.length - test.length);
};

DeleteJavaScriptChunkPlugin.prototype._extensionMatches = function(source) {
    if(typeof this.options.extensions === 'string') {
        return this._stringEndsWith(source, this.options.extensions);
    }else if(typeof this.options.extensions === 'object' && typeof this.options.extensions.length === 'number') {
        for(var i = 0; i < this.options.extensions.length; i++) {
            return this._stringEndsWith(source, this.options.extensions[i]);
        }
    }
};


DeleteJavaScriptChunkPlugin.prototype.apply = function(compiler) {
    var _this = this;

    compiler.plugin('done', function(stats) {
        var statsj = stats.toJson();

        if(statsj.errors.length > 0) {
            return;
        }

        var toDelete = statsj.modules.filter(function(module) {
            return  module.id === 0 && _this._extensionMatches(module.name);
        }).map(function(module) {
            return statsj.chunks[module.chunks].names[0] + '.js';
        });

        _this._logNumberOfFiles(toDelete.length);

        var outputPath = compiler.options.output.path;

        toDelete.forEach(function(file) {
            _this._log('Deleting ' + outputPath + '/' + file);
            fs.unlink(outputPath + '/' + file);
        });
    });
};

module.exports = DeleteJavaScriptChunkPlugin;

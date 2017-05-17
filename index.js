"use strict";

module.exports = class {

    constructor(options) {
        this.options = options || {};
    }

    apply(compiler) {
        compiler.plugin("compilation", compilation => {
            compilation.plugin("html-webpack-plugin-before-html-generation", (htmlPluginData, callback) => {
                let url = "https://cdn.polyfill.io/v2/polyfill";
                url += ("minify" in this.options && !this.options.minify) ? ".": ".min.";
                url += "type" in this.options ? this.options.type: "js";
                let query = "";
                htmlPluginData.assets.js.unshift(url);
                callback(null, htmlPluginData);
            });
        });
    }
};

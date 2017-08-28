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
                let features;
                if ("features" in this.options) {
                    if (Array.isArray(this.options.features)) {
                        features = this.options.features.map((feature) => {
                            if (typeof feature === "object") {
                                let flags = Array.isArray(feature.flags) ? feature.flags.join("|"): feature.flags;
                                return feature.feature + (flags ? "|" + flags: "");
                            }
                            return feature;
                        }).join();
                    } else {
                        features = this.options.features;
                    }
                }
                if (features) {
                    url += "?";
                    if (features) {
                        url += "features=" + features;
                    }
                }
                htmlPluginData.assets.js.unshift(url);
                callback(null, htmlPluginData);
            });
        });
    }
};

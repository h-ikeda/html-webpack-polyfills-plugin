"use strict";
const HtmlWebpackPolyfillsPlugin = require("../");
const assert = require("assert");
const webpack = require("webpack");
const fs = require("fs");

describe("Testing HTML Webpack Polyfills Plugin...", function() {
    it("Can create instance without options", function() {
        const testInstance = new HtmlWebpackPolyfillsPlugin();
        assert(testInstance instanceof HtmlWebpackPolyfillsPlugin);
    });
    it("Can create instance with options", function() {
        const testInstance = new HtmlWebpackPolyfillsPlugin({minify: false, type: "js"});
        assert(testInstance instanceof HtmlWebpackPolyfillsPlugin);
    });
    describe("Can compile with webpack", function() {
        function bundle(options, expectedUrl, done) {
            let webpackOptions = require("./test_webpack.config")();
            if (options) {
                webpackOptions.plugins.push(new HtmlWebpackPolyfillsPlugin(options));
            } else {
                webpackOptions.plugins.push(new HtmlWebpackPolyfillsPlugin());
            }
            webpack(webpackOptions, function(err, stats) {
                if (err) {
                    throw err;
                } else if (stats.hasErrors()) {
                    throw stats.toString();
                }
                fs.readFile(__dirname + "/temp/test_index.html", "utf8", (err, text) => {
                    if (err) {
                        throw err;
                    }
                    assert(text.search(new RegExp("<script[^>]+src=\"" + expectedUrl + "\"[^>]*>[^<]*<\/script>")) >= 0);
                    fs.unlinkSync(__dirname + "/temp/test_index.html");
                    fs.unlinkSync(__dirname + "/temp/test_bundle.js");
                    fs.rmdir(__dirname + "/temp", done);
                });
            });
        }
        it("compile without options", function(done) {
            bundle(null, "https://cdn.polyfill.io/v2/polyfill.min.js", done);
        });
        it("compile with minify:true options", function(done) {
            bundle({minify: true}, "https://cdn.polyfill.io/v2/polyfill.min.js", done);
        });
        it("compile with minify:false options", function(done) {
            bundle({minify: false}, "https://cdn.polyfill.io/v2/polyfill.js", done);
        });
        it("compile with type:js options", function(done) {
            bundle({type: "js"}, "https://cdn.polyfill.io/v2/polyfill.min.js", done);
        });
        it("compile with type:css options", function(done) {
            bundle({type: "css"}, "https://cdn.polyfill.io/v2/polyfill.min.css", done);
        });
        it("compile with type:css & minify:false options", function(done) {
            bundle({type: "css", minify: false}, "https://cdn.polyfill.io/v2/polyfill.css", done);
        });
        it("compile with type:css & minify:true options", function(done) {
            bundle({type: "css", minify: true}, "https://cdn.polyfill.io/v2/polyfill.min.css", done);
        });
        it("compile with type:js & minify:true options", function(done) {
            bundle({type: "js", minify: true}, "https://cdn.polyfill.io/v2/polyfill.min.js", done);
        });
        it("compile with type:js & minify:false options", function(done) {
            bundle({type: "js", minify: false}, "https://cdn.polyfill.io/v2/polyfill.js", done);
        });
    });
});
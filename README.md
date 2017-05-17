# HTML Webpack Polyfills Plugin
Inject &lt;script> tag that references polyfill service (https://polyfill.io) to html via HTML Webpack Plugin.
## Usage
On webpack.config.js,
```
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPolyfillsPlugin = require("html-webpack-polyfills-plugin");

module.exports = {
    // ...
    plugins: [
        new HtmlWebpackPlugin(),
        new HtmlWebpackPolyfillsPlugin()
    ]
}
```
This configuration create index.html file containing script tag as below,  
`<script src="https://cdn.polyfill.io/v2/polyfill.min.js"></script>`.

If you want to customize URL, pass options object to constructor.
```
    new HtmlWebpackPolyfillsPlugin({
        minify: false
    })
```
## Options
Options below are available.
### minify
type: boolean  
default: true
### type
type: string  
default: "js"
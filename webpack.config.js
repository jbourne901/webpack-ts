const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin")


const js_rule = {   test: /\.(ts|js)x?$/,
                    exclude: /node_modules/,
                    use: [
                           {
                             loader: 'babel-loader',
                             options: {
                                 presets: [
                                           "@babel/preset-env"
                                          ],
                                 plugins: [
                                           "@babel/plugin-proposal-class-properties"
                                 ]
                             }
                           },
                           {loader: 'ts-loader'}
                   ]
};

const css_rule = {  
 	            test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                    exclude: /node_modules/
};


module.exports = {
    entry: path.resolve(__dirname, "./src/index.ts"),
    devtool: "source-map",
    devServer: { port: 4200 },
    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist")
    },
    module: { rules: [ js_rule, css_rule ] 
            },
    plugins: [ new HtmlWebpackPlugin({template: path.resolve(__dirname, "./public/index.html"),
                                      minify: {collapseWhitespace: true}
                                     }),
               new CleanWebpackPlugin(),
               new MiniCssExtractPlugin({
                    filename: "[name].[contenthash].css"
               })
             ]
};




# webpack-ts

Create production bundle from source code in typescript (+html, css):
-----------------------------------------------

npm install typescript ts-loader clean-webpack-plugin babel-loader @babel/preset-typescript @babel/core @babel/plugin-proposal-class-properties @babel/preset-env webpack webpack-cli --save-dev 

#if needed to also package react (tsx) files:

npm install @babel/preset-react --save-dev

#if needed to also package css files

npm install mini-css-extract-plugin style-loader css-loader --save-dev

#if need to package html files:

npm install html-webpack-plugin --save-dev

#if need to package image files:

npm install file-loader --save-dev

#if need to package react files (tsx):

core-js/stable
npm install react-app-polyfill/ie11 react-app-polyfill/stable --save


#if need to run webpack dev server

npm install -g webpack-dev-server



mkdir src

Create tsconfig.json 
---

{
    "compilerOptions": {
        "module": "esnext",
        "esModuleInterop": true,
        "target": "es5",
        "noImplicitAny": true,
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "baseUrl": "./",
        "strict": true,
        "paths": {
            "*": ["node_modules/*"]
        },
        "lib": [
            "dom",
            "dom.iterable",
            "esnext",
            "es5",
            "es6"
        ],
        "allowJs": true,
        "skipLibCheck": true,
        "allowSyntheticDefaultImports": true,
        "forceConsistentCasingInFileNames": true,
        "resolveJsonModule": true,
        "isolatedModules": true,
        "jsx": "react"
     },
     "include": [
        "src"
     ]
}



-----Create webpack.conf.js----



const path = require("path");                                      //to be able to use path.resolve 
const MiniCssExtractPlugin = require("mini-css-extract-plugin");   //if need to package css into main bundle js (embeds css into js)
const HtmlWebpackPlugin = require("html-webpack-plugin");          //if need to package html - minimizes html files
const {CleanWebpackPlugin} = require("clean-webpack-plugin")       //cleans dist folder before each build


const js_rule = {   test: /\.(ts|js)x?$/,                         //for all js, ts, jsx, tsx files:
                    exclude: /node_modules/,                      //except files in node_modules dirs
                    use: [
                           {
                             loader: 'babel-loader',             //babel-loader is for polyfills 
                             options: {
                                 presets: [
                                           "@babel/preset-env"
                                          ],
                                 plugins: [
                                           "@babel/plugin-proposal-class-properties"
                                 ]
                             }
                           },
                           {loader: 'ts-loader'}               //ts-loader is to compile ts files into *.js + *.map (it uses tsconfig.json file)
                   ]
};

const css_rule = {                                            //if need to package css files , use style-loader and css-loader
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'],
                    exclude: /node_modules/
};

const img_rule = { test:  /\.(png|jpg|gif|svg|ttf|woff2|eot)$/,   //if need to package image files/fonts
                   use: ["file-loader"]
                 };


module.exports = {
    entry: path.resolve(__dirname, "./src/index.tsx"),
    devtool: "source-map",                                     //enable packaging of map files
    devServer: { port: 4200 },                                 //enable dev server
    output: {
        filename: "[name].[contenthash].js",                   //output file pattern 
        path: path.resolve(__dirname, "dist")                  //output folder
    },
    module: { rules: [ js_rule, css_rule, img_rule ] },
    resolve: {                                                 //this section is required for webpack to correctly locate other ts(x) files included from index.tsx
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    plugins: [ new HtmlWebpackPlugin({template: path.resolve(__dirname, "./public/index.html"),   // path to html file
                                      minify: {collapseWhitespace: true}
                                     }),
               new CleanWebpackPlugin(),
               new MiniCssExtractPlugin({
                    filename: "[name].[contenthash].css"
               })
             ]
};




-----To create bundle run webpack from command line or add to scripts in package.json:----------

webpack


---------To run dev server -----

webpack-dev-server --host 0.0.0.0 --mode development


(automatically reloads page when source files change - any source files js, ts, html , css)


Open browser and navigate to http://<ip>:4200




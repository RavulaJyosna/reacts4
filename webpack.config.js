const path = require("path");
const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const loki = require("lokijs");

const DEV = process.env.NODE_ENV !== "production";
const DIST = "dist";
const DIST_PATH = path.join(__dirname, DIST);

module.exports = {
  entry: "./src/index.js",
  output: {
    path: DIST_PATH,
    publicPath: "/",
    filename: "[name].[hash:8].js"
  },
  target: "web",
  devtool: DEV ? "eval" : false, // 'source-map'
  // devtool: "inline-source-map",
  devServer: {
    contentBase: DIST_PATH,
    hot: true,
    historyApiFallback: true,
    setup(app){

      var bodyParser = require('body-parser');
      var db = new loki('db.json');
      var heroes = db.addCollection('heroes');

      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());

      app.post("/heroes",bodyParser.json(), function(req, res){
          heroes.insert(req.body);
          res.send("POST res sent from webpack dev server")
      });

      app.put("/heroes",bodyParser.json(), function(req, res){
        var hero = heroes.get(req.body.id)
        for(var key in req.body) {
          hero[key] = req.body[key];
        }
        heroes.update(hero);
        res.send("PUT res sent from webpack dev server")
      });

      app.delete("/heroes",bodyParser.json(), function(req, res){
        heroes.remove(req.body.id);
        res.send("DELETE res sent from webpack dev server")
      });

      heroes.insert({'name': 'Tony Stark', 'alias': 'Iron Man', 'team': 'Avengers'});
      heroes.insert({'name': 'Peter Parker', 'alias': 'Spider Man', 'team': 'Avengers'});
      heroes.insert({'name': 'Bruce Wayne', 'alias': 'Bat Man', 'team': 'Justice League'});

      app.get("/heroes/:id", bodyParser.json(), function(req,res) {
        var hero = heroes.get(req.params.id);
        res.send([
          hero['$loki'],
          hero.name,
          hero.alias,
          hero.team
        ]);
      });

      app.get("/heroes", function(req,res) {
        var values = heroes.find({});
        values = values.map((val) => [
          val['$loki'],
          val.name,
          val.alias,
          val.team
        ]);
        res.send(values);
      });
  }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: DEV ? "style-loader" : MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: [require("autoprefixer")]
            }
          },
          {
            loader: "sass-loader",
            options: { outputStyle: "compressed" }
          }
        ]
      },
      {
        test: /\.(ico|jpe?g|png|gif|webp|svg|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash:8].[ext]",
              outputPath: "static/"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin([`${DIST}/*.*`, `${DIST}/static`], {
      exclude: [".git*"]
    }),
    new HtmlWebpackPlugin({
      template: DEV ? "./src/index.html" : "!!prerender-loader?string!./src/index.html",
      filename: "index.html",
      minify: DEV
        ? false
        : {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true
          }
    }),
    new MiniCssExtractPlugin({
      filename: DEV ? "[name].css" : "[name].[hash:8].css",
      chunkFilename: DEV ? "[id].css" : "[id].[hash:8].css"
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        }
      })
    ]
  }
};

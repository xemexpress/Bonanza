const HtmlWebPackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const AppManifestWebpackPlugin = require("app-manifest-webpack-plugin")

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./public/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    }),
    new AppManifestWebpackPlugin({
      logo: "./public/favicon.ico",
      config: {
        appName: "Bonanza",
        short_name: "ZA",
        appDescription: "To know what you're investing in",
        developerName: "xemexpress",
        start_url: "./index.html",
      }
    })
  ]
}

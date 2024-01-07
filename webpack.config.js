const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const ImageminWebpWebpackPlugin = require("imagemin-webp-webpack-plugin");

module.exports = (env) => {
  const isDev = env.mode === "development";

  return {
    mode: env.mode ?? "development",
    entry: {
      app: path.resolve(__dirname, "src/index.js"),
      /* animation: path.resolve(__dirname, "src/animation.js"), */
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].[contenthash].js",
      clean: true,
    },
    devtool: isDev ? "inline-source-map" : false,
    devServer: isDev
      ? {
          static: {
            directory: path.resolve(__dirname, "dist"),
          },
          port: 3000,
          open: true,
          hot: true,
          compress: true,
          historyApiFallback: true,
        }
      : undefined,
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            isDev ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      "autoprefixer",
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
            "sass-loader",
          ],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
          type: "asset",
          generator: {
            filename: "assets/images/[name][ext]",
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name][ext]",
          },
        },
      ],
    },
    optimization: {
      minimizer: [
        "...",
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              // Lossless optimization with custom option
              // Feel free to experiment with options for better result for you
              plugins: [
                ["gifsicle", { interlaced: true }],
                ["mozjpeg", { quality: 85, progressive: true }],
                ["pngquant", { quality: [0.65, 0.9] }],
              ],
            },
          },
        }),
        new ImageminWebpWebpackPlugin(),
      ],
    },

    plugins: [
      new CopyPlugin({
        patterns: [{ from: "src/assets/images", to: "assets/images" }],
      }),
      new HtmlWebpackPlugin({
        title: "Webpack Template",
        filename: "index.html",
        template: "src/template.html",
        favicon: "src/assets/public/favicon.ico",
      }),
      isDev
        ? false
        : new MiniCssExtractPlugin({
            filename: "assets/styles/[name].[contenthash].css",
          }),
    ],
  };
};

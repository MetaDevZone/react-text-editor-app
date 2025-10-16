var path = require("path");
var TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
          output: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // JavaScript/JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.gif$/, // Handling GIF images
        use: "url-loader",
      },
      {
        test: /\.svg$/, // Handling SVG files
        use: "file-loader",
      },
      {
        test: /\.css$/, // Handle global CSS files
        exclude: /\.module\.css$/, // Exclude CSS modules
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.module\.css$/, // Handle CSS modules separately
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]", // Class name format
              },
            },
          },
        ],
      },
    ],
  },
  externals: {
    react: "react", // Externalize React to avoid bundling it in the library
    "react-dom": "react-dom",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};

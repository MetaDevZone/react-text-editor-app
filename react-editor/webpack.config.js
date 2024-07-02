var path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.resolve("build"),
    filename: "index.js",
    libraryTarget: "commonjs2",
  },
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Update the test pattern to include JSX files
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.gif$/,
        use: "url-loader",
      },
      {
        test: /\.svg$/,
        use: "file-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  externals: {
    react: "react",
    "react-dom": "react-dom",
    "babel-loader": "babel-loader",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};

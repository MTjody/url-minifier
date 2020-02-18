const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {

    const isProduction = process.env.MODE === "production";

    return {
        mode: process.env.MODE,

        output: {
            filename: isProduction ? "[name]-[contenthash].js" : "[name]-[hash].js",
            chunkFilename: isProduction ? "[name]-[contenthash].js" : "[name]-[hash].js",
            path: path.join(__dirname, "dist")
        },

        module: {
            rules: [
                { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
                { test: /\.(png|gif|jpg|otf|svg|woff2?|eot|ttf)$/, loader: "file-loader" }
            ]
        },

        resolve: {
            extensions: ["*", ".js", ".jsx", ".json"],
            modules: ["node_modules"]
        },

        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 8888,
            historyApiFallback: true,
            hotOnly: true, // without page refresh as fallback in case of build failures.
            clientLogLevel: "warning",
            stats: "minimal",
            https: false
        },

        devtool: isProduction ? "" : "inline-source-map",

        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, "src/index.html"),
            }),

            isProduction ? () => { } : new webpack.HotModuleReplacementPlugin(),
        ]
    };
};

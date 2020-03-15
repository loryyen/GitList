const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const distination = "dist";

const resolve = $path => {
    return path.resolve(__dirname, $path);
};

module.exports = (env, options) => {
    const devMode = options.mode !== "production";
    return {
        entry: {
            "common-styles": [
                resolve("src/assets/styles/index.sass"),
                resolve("node_modules/reset-css/sass/_reset.scss"),
                resolve("./node_modules/normalize.css/normalize.css")
            ],
            main: resolve("src/scripts/index.jsx")
        },
        output: {
            path: resolve(distination),
            filename: "[name].[hash].js"
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".css", ".sass", ".scss"],
            modules: ["node_modules", "src", "src/assets", "src/scripts"]
        },
        module: {
            rules: [{
                    test: /\.(js|jsx|tsx|ts)$/,
                    include: [path.resolve(__dirname, "src")],
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", {}], "@babel/preset-react"
                        ],
                        plugins: ["@babel/plugin-proposal-class-properties"],
                        babelrc: false
                    }
                },
                {
                    test: /\.(sa|sc|c)ss$/,
                    use: [{
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                fallback: "style-loader",
                                sourceMap: true
                            }
                        },
                        {
                            loader: "css-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(jpg|png|woff|woff2|eot|ttf|svg|ico)$/,
                    loader: "url-loader",
                    options: {
                        limit: 8192,
                        name: "assets/images/[name].[hash:8].[ext]"
                    }
                }
            ]
        },
        plugins: [
            // new CleanWebpackPlugin(distination, {}),
            new MiniCssExtractPlugin({
                filename: "[name].[hash].css",
                chunkFilename: "[id].[hash].css"
            }),
            new HtmlWebpackPlugin({
                hash: true,
                template: "./src/index.html",
                filename: "index.html",
                //favicon: resolve("src/assets/images/favicon.ico")
            })
        ],
        devServer: {
            hot: true,
            port: 8888,
            noInfo: true
        },
        devtool: devMode ? "source-map" : ""
    };
};
module.exports = {
    mode: 'development',
    context: __dirname,
    entry: {
        Home: "./index.jsx",
        Customer: "./Customer.jsx",
        Product: "./Product.jsx",
        Store: "./Store.jsx",
        Sale:"./Sales.jsx"
    },
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    },
    watch: true,
    module: {
        rules: [{
            test: /\.jsx?$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['babel-preset-env', 'babel-preset-react']
                }
            }
        }]
    }
}

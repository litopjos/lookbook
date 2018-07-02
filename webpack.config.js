/* -----------------------------------------------
FILE: webpack.config.js

DESCRIPTION:
This node based file contains configuration data needed
by webpack and webpack-dev-server.


(c) 2018 Joselito Pe 
-------------------------------------------------- */

// Generate the absolute path to the dist folder using node constructs
const path = require ('path');
const path_public = path.join(__dirname,"public");
const path_public_dist = path.join(__dirname,"public","dist");
const path_public_img = path.join(__dirname,"public","images");

// The env environment argument is set by the --env switch passed to the webpack command line.
// ie- webpack --env production.
module.exports = (env) => {
    const isProduction = env === 'production';

    return {
        
        entry: './src/app.js',
    
        output: {
            filename: 'bundle.js',
            path: path_public_dist,
            publicPath: path_public_img
        },
    
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.(jpe?g|png|giv|svg)$/i,
                    include : path_public_img,
                    loader: 'url-loader?limit=5000000&name=images/[name].[ext]'
                }            
            ]   
        },
        
        // This property tells webpack to generate a source map used for diagnostic purposes.
        // If production build is being build, the source map to be used is 'source-map' which
        // is stored in a separate file called 'bundle.js.map' than the bundle file and takes longer to build that 
        // 'cheap-module-eval-source-map'
        devtool: isProduction ?
            'source-map':
            'cheap-module-eval-source-map',
    
        // webpack-dev-server configuration information.
        devServer: {
            contentBase: path_public,
            historyApiFallback: true,
            publicPath: "/dist/"
        }
    }
    
}



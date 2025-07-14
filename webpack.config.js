const path = require('path');
const postcssPxtorem = require('postcss-pxtorem');

module.exports = {
  entry: {
    'popup': './src/index.tsx',
    'content-script': './src/contentScript.tsx',
    'service-worker': './src/background.tsx',

    'special-entry': './src/index.tsx',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  devtool: 'source-map',
  resolve: {
    extensions: [ ".ts", ".tsx", ".js", ".json" ]
  },
  // Loaders
  module: {
    rules: [
      // TypeScript
      {
        test: /\.(ts|tsx)$/,
        exclude: /\.(test|testing)\.ts$/,
        use: [ { loader: "ts-loader" } ]
      },
      // CSS
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: (loaderContext) => {
                const entry = loaderContext._compiler.options.entry;
                const isSpecialEntry = entry && entry['special-entry'];

                return {
                  plugins: isSpecialEntry
                             ? [postcssPxtorem({ rootValue: 16, propList: ['*'] })]
                             : [],
                };
              },
            },
          },
        ],
      },
      {
        test: /\.(svg)$/,
        type: "asset", // Automatically decides between 'asset/resource' and 'asset/inline' based on file size
        parser: {
          dataUrlCondition: {
            maxSize: 8192 // Inline files smaller than 8kb as Data URLs, emit others as separate files
          }
        }
      }
    ]
  },
};

const path = require('path');

module.exports = {
  webpack: {  
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: {
      module: {
        rules: [
          {
            test: /\.svg$/,
            use: ['@svgr/webpack'],
          },
        ],
      },
    },
}
}
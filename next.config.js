module.exports = {
    reactStrictMode: true,
    experimental: {
      runtime: 'experimental-edge',
      api: {
        externalResolver: true,
      },
    },
    images: {
      domains: ['www.pngall.com', 'm.media-amazon.com', 'static.wikia.nocookie.net', 'example-domain.com'],
    },
    webpack(config) {
      config.module.rules.push({
        test: /\.svg$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      });
      return config;
    },
  };
module.exports = {
    i18n: {
      defaultLocale: 'zh-CN',
      locales: ['en', 'zh-CN'],
      updateMissing: 'current',
    },
    reloadOnPrerender: process.env.NODE_ENV === "development"
  };
const path = require('path');
module.exports = {
    i18n: {
      defaultLocale: 'zh-CN',
      locales: ['en', 'zh-CN'],
      // TODO: 自动化生成不存在的语言文件和 key
      updateMissing: 'current',
      localePath: path.resolve('./public/locales')
    },
    reloadOnPrerender: process.env.NODE_ENV === "development"
  };
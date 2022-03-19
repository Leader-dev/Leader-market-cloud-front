# Leader Market Cloud Repo

鳞者项目云仓库

**Lets use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)!!!**

## 安装项目

```bash
$ git clone https://github.com/Leader-dev/leader-market-cloud-front.git
$ pnpm install
$ pnpm prepare # 安装 husky pre-commit
$ pnpm dev # 启动开发服务器
```

## 打包

```bash
$ pnpm build
```

## 文档

- [API](./services/README.md)

## Internationalization (i18n)

本项目使用 <https://github.com/isaachinman/next-i18next> 进行多语言支持。文档请查看 next-i18next、react-i18next、i18next。

每个页面需在 `getServerSideProps` 下引入语言内容。

```tsx
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ["common"])),
  },
});
```

语言文档存于 `/public/locales` 下。当前支持中文（`zh`）与英文（`en`）。语言文档路径应对应页面路径。组件应只使用 `common.json` 内的语言定义。

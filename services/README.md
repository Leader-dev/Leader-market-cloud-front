# Services

与服务端的连接使用了 `createService` 工厂函数。

```ts
import { request } from "utils/request";
import { createService } from "services";

export default createService<string>({
  url: () => "/demo",
  get: (url) => request.get(url).then((res) => res.data),
});
```

`request` 是封装好的 `axios` 库，可以使用 `request.get` 和 `request.post` 来发送请求。理论上来讲雷董设计的后端应该只有 `POST` 函数。

`createService` 工厂函数的定义在 `services/index.tsx` 中。

可以适当的引用 `/types` 下的内容进行类型定义。

## SSR

SSR，即服务器端渲染，可以优化页面的 SEO，并且减少用户在客户端的渲染时间。这点在移动端上尤为明显。

无需登录即可访问的页面应使用 `SSR` 模式。需要在 `getServerSideProps` 中进行 `service` 的调用。

```tsx
export const getServerSideProps: GetServerSideProps<{}> = async (ctx) => {
  const queryClient = new QueryClient();

  // 获取页面需要的数据
  await queryClient.prefetchQuery(getIndividualPartners({}));

  return {
    props: {
      prefetchedState: dehydrate(queryClient),
      ...(await serverSideTranslations(ctx.locale!, ["common", "partners"])),
    },
  };
};
```

### ⚠️ 注意

在需要登录才可访问的页面内，`getServerSideProps` 只需调用 `serverSideTranslations` 即可。

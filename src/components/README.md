# 组件

可重复使用的组件。在 `/pages` 下创建组件会被 Next.js 定义为页面路由，因此需要将组件分出。

无状态组件（自身没有 API 请求）使用 Named Export。

```tsx
export const SiteLink = (props) => (
  <div>
    <a {...props} />
  </div>
);
```

自身有状态的组件（如 `<Navbar />`）使用 Default Export。这类组件需要先命名再 export。

```tsx
const Navbar = () => <hr />;

export default Navbar;
```

或是

```tsx
export default function Navbar {}
```

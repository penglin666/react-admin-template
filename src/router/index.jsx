import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import LayoutComponent from "@/layout";
import Home from "@/pages/home";
import Login from "@/pages/user/login";

// 懒加载
const lazyLoad = (pagePath) => {
  const Comp = lazy(() => import(/* @vite-ignore */ `../${pagePath}`));
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Comp />
    </Suspense>
  );
};

export const routes = [
  {
    path: "/",
    element: <LayoutComponent />,
    children: [
      {
        path: "home",
        title: "首页",
        element: <Home />,
      },
      {
        path: "about",
        children: [
          {
            path: "about1",
            title: "关于1",
            element: lazyLoad("pages/about/about1"),
          },
          {
            path: "about2",
            title: "关于2",
            element: lazyLoad("pages/about/about2"),
            children: [
              {
                path: "about2-1",
                title: "关于2-1",
                element: lazyLoad("pages/about/about1"),
              },
              {
                path: "about2-2",
                title: "关于2-2",
                element: lazyLoad("pages/about/about2"),
              },
            ],
          },
        ],
      },
      {
        path: "setting",
        title: "设置",
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    title: "登录页",
    element: <Login />,
  },
  {
    path: "*",
    element: lazyLoad("pages/error/404"),
  },
];
const router = createBrowserRouter(routes);
export default router;

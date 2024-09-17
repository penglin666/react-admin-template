import { routes } from "./router";
import storage from "@/utils/storage";

const ToLogin = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/login");
  }, [navigate]);
  return <></>;
};

const ToHome = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/home");
  }, [navigate]);
  return <></>;
};

const BeforeRouterEnter = () => {
  const outlet = useRoutes(routes);
  const location = useLocation();
  const token = storage.getSessionStorage("token");
  //1、如果访问的是登录页面， 并且有token， 跳转到首页
  if (location.pathname === "/login" && token) {
    // 这里不能直接用 useNavigate 来实现跳转 ，因为需要BeforeRouterEnter是一个正常的JSX组件
    return <ToHome />;
  }
  //2、如果访问的不是登录页面，并且没有token， 跳转到登录页
  if (location.pathname !== "/login" && !token) {
    return <ToLogin />;
  }
  getCurrentPageTitle(location.pathname, routes, "path");
  return outlet;
};
// 动态获取title
const getCurrentPageTitle = (val, list, field, childrenNode = "children") => {
  for (let i in list) {
    let item = list[i];
    if (item[field] === val.slice(val.lastIndexOf("/") + 1)) {
      document.title = item.title;
      return;
    }
    getCurrentPageTitle(val, item[childrenNode], "path");
  }
};
const App = () => {
  return <BeforeRouterEnter />;
};
export default App;

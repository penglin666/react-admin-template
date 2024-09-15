import { useDispatch } from "react-redux";
import { add } from "@/store/modules/tag";
import { Layout } from "antd";
import Sider from "./components/Sider";
import Header from "./components/Header";
import Tag from "./components/Tag";
const { Content, Footer } = Layout;
const LayoutComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home", { replace: true });
    }
    //设置当前窗口标签
    dispatch(
      add({
        key: location.pathname,
        label: document.title,
        closable: document.title !== "首页",
      })
    );
  }, [location]);
  return (
    <Layout>
      <Sider collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Tag />
        <Content
          style={{
            padding: 24,
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default LayoutComponent;

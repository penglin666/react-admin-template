import { useSelector, useDispatch } from "react-redux";
import { Layout, Menu } from "antd";
import { getMenusApi } from "@/api/user";
const Sider = ({ collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [items, setItems] = useState([]);

  useEffect(() => {
    getMenus();
    const keys = location.pathname
      .split("/")
      .filter((item) => item && item.trim())
      .map((item) => "/" + item);
    if (keys.length) {
      setSelectedKeys(keys);
      if (keys.length > 1) {
        if (!collapsed) {
          setOpenKeys(keys.slice(0, keys.length - 1));
        }
      } else {
        setOpenKeys([]);
      }
    }
  }, [location]);
  const menuClick = ({ keyPath }) => {
    const path = keyPath.reverse().join("");
    navigate(path);
  };
  const getMenus = async () => {
    const { data } = await getMenusApi();
    setItems(data);
  };
  return (
    <Layout.Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      theme="light"
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        onClick={menuClick}
        onOpenChange={(keys) => setOpenKeys(keys)}
        items={items}
      />
    </Layout.Sider>
  );
};
export default Sider;

import { useSelector, useDispatch } from "react-redux";
import { add, edit } from "@/store/modules/tag";
import { Layout, Tabs, Space, Button, Flex, Tooltip, Dropdown } from "antd";
import {
  ReloadOutlined,
  CloseOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import Sider from "./components/Sider";
import Header from "./components/Header";
import { useEffect } from "react";
const { Content, Footer } = Layout;
const LayoutComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const { items, activeKey } = useSelector((state) => state.tag);
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home", { replace: true });
    }
    //设置窗口标签
    dispatch(
      add({
        key: location.pathname,
        label: document.title,
        closable: document.title !== "首页",
      })
    );
  }, [location]);
  const dropDownMenuClick = ({ key }) => {
    dispatch(edit({ type: key, key: location.pathname }));
  };
  useEffect(() => {
    navigate(activeKey);
  }, [activeKey]);
  // const tabOnEdit = (key) => {
  //   console.log(data, "data");
  // };
  return (
    <Layout>
      <Sider collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Tabs
          type="editable-card"
          size="small"
          hideAdd
          activeKey={activeKey}
          items={items}
          onEdit={(key) => dispatch(edit({ type: "closeCurrent", key }))}
          onChange={(path) => navigate(path)}
          tabBarExtraContent={
            <Space.Compact>
              <Tooltip title="刷新当前">
                <Button icon={<ReloadOutlined />} />
              </Tooltip>
              <Dropdown
                placement="bottomRight"
                menu={{
                  items: [
                    {
                      key: "closeCurrent",
                      label: "关闭当前",
                      icon: <CloseOutlined />,
                      onClick: ({ key }) =>
                        dispatch(edit({ type: key, key: location.pathname })),
                    },
                    {
                      key: "closeLeft",
                      label: "关闭左侧",
                      icon: <ArrowLeftOutlined />,
                      onClick: ({ key }) =>
                        dispatch(edit({ type: key, key: location.pathname })),
                    },
                    {
                      key: "closeRight",
                      label: "关闭右侧",
                      icon: <ArrowRightOutlined />,
                      onClick: ({ key }) =>
                        dispatch(edit({ type: key, key: location.pathname })),
                    },
                    {
                      key: "closeOther",
                      label: "关闭其它",
                      icon: <MinusCircleOutlined />,
                      onClick: ({ key }) =>
                        dispatch(edit({ type: key, key: location.pathname })),
                    },
                    {
                      key: "closeAll",
                      label: "关闭全部",
                      icon: <CloseCircleOutlined />,
                      onClick: ({ key }) =>
                        dispatch(edit({ type: key, key: location.pathname })),
                    },
                  ],
                }}
                trigger={["click"]}
              >
                <Button icon={<EllipsisOutlined />} />
              </Dropdown>
            </Space.Compact>
          }
        />
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

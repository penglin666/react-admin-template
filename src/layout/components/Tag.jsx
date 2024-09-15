import { useSelector, useDispatch } from "react-redux";
import { edit } from "@/store/modules/tag";
import { Tabs, Space, Button, Tooltip, Dropdown } from "antd";
import {
  ReloadOutlined,
  CloseOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  MinusCircleOutlined,
  CloseCircleOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
const Tag = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, activeKey } = useSelector((state) => state.tag);
  useEffect(() => {
    navigate(activeKey);
  }, [activeKey]);
  return (
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
  );
};
export default Tag;

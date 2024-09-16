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

import usePageRefresh from "@/hooks/usePageRefresh";
const Tag = () => {
  const pageRefresh = usePageRefresh();
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
      tabBarGutter={6}
      hideAdd
      activeKey={activeKey}
      items={items}
      onEdit={(key) => dispatch(edit({ type: "closeCurrent", key }))}
      onChange={(path) => navigate(path)}
      tabBarExtraContent={
        <Space.Compact>
          <Tooltip title="刷新" placement="bottom">
            <Button icon={<ReloadOutlined />} onClick={pageRefresh} />
          </Tooltip>
          <Dropdown
            placement="bottomRight"
            menu={{
              onClick: ({ key }) =>
                dispatch(edit({ type: key, key: location.pathname })),
              items: [
                {
                  key: "closeCurrent",
                  label: "关闭当前",
                  icon: <CloseOutlined />,
                },
                {
                  key: "closeLeft",
                  label: "关闭左侧",
                  icon: <ArrowLeftOutlined />,
                },
                {
                  key: "closeRight",
                  label: "关闭右侧",
                  icon: <ArrowRightOutlined />,
                },
                {
                  key: "closeOther",
                  label: "关闭其它",
                  icon: <MinusCircleOutlined />,
                },
                {
                  key: "closeAll",
                  label: "关闭全部",
                  icon: <CloseCircleOutlined />,
                },
              ],
            }}
          >
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        </Space.Compact>
      }
    />
  );
};
export default Tag;

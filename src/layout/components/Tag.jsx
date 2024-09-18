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
const menuItems = [
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
];
const Tag = () => {
  const pageRefresh = usePageRefresh();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [dropdownMenuItems, setDropdownMenuItems] = useState(menuItems);
  const { items, activeKey } = useSelector((state) => state.tag);
  useEffect(() => {
    navigate(activeKey);
    getDropdownMenuItems();
  }, [activeKey]);
  const getDropdownMenuItems = () => {
    const index = items.findIndex((item) => item.key === activeKey);
    const newDropdownMenuItems = dropdownMenuItems.map((item) => {
      if (item.key === "closeCurrent") {
        if (activeKey === "/home") {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      }
      if (item.key === "closeLeft") {
        if (!items.slice(1, index).length) {
          // 当前页左侧除了首页没有其它标签页
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      }
      if (item.key === "closeRight") {
        if (index + 1 >= items.length) {
          // 当前页右侧没有其它标签页
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      }
      if (item.key === "closeOther") {
        //首页、当前页
        if (items.length <= 2) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      }
      if (item.key === "closeAll") {
        //
        if (items.length <= 1) {
          item.disabled = true;
        } else {
          item.disabled = false;
        }
      }
      return item;
    });
    setDropdownMenuItems(newDropdownMenuItems);
  };
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
              items: dropdownMenuItems,
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

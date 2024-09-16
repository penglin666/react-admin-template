import { Button, Layout, theme, Flex, Space, Avatar, Dropdown } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { clear } from "@/store/modules/tag";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CompressOutlined,
  ExpandOutlined,
  UserOutlined,
} from "@ant-design/icons";
import useFullScreen from "@/hooks/useFullScreen";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import storage from "@/utils/storage";
import axios from "axios";
const Header = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.user);
  const { full, exitFullScreen, requestFullScreen } = useFullScreen();
  const [currentDateTime, setCurrentDateTime] = useState(
    dayjs().locale("zh-cn").format("YYYY年MM月DD日 HH:mm:ss dddd")
  );
  const [weather, setWeather] = useState();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    getWeather();
    const timer = setInterval(() => {
      setCurrentDateTime(
        dayjs().locale("zh-cn").format("YYYY年MM月DD日 HH:mm:ss dddd")
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [full]);
  const getWeather = () => {
    const key = "c5f90857a5d4772caeff4af84a629754";
    axios({
      url: "https://restapi.amap.com/v3/ip",
      method: "get",
      params: { key },
    }).then((res) => {
      const { adcode } = res.data;
      axios({
        url: "https://restapi.amap.com/v3/weather/weatherInfo",
        method: "get",
        params: { key, city: adcode },
      }).then((res) => {
        setWeather(res.data.lives[0].weather);
      });
    });
  };
  return (
    <Layout.Header
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Flex justify="space-between" align="center">
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
        />
        {/* right */}
        <Flex style={{ padding: "0 14px" }}>
          <Space>
            {full && <div>{currentDateTime}</div>}
            <div>天气：{weather}</div>
            <div>
              {full ? (
                <CompressOutlined onClick={exitFullScreen} />
              ) : (
                <ExpandOutlined onClick={requestFullScreen} />
              )}
            </div>
            <div>
              <Space>
                <div>{profile.nickName}</div>
                <Dropdown
                  menu={{
                    items: [
                      {
                        key: "edit",
                        label: "编辑个人信息",
                      },
                      {
                        key: "logout",
                        danger: true,
                        label: "退出登录",
                        onClick: () => {
                          dispatch(clear());
                          storage.clearBoth();
                          navigate("/login", { replace: true });
                        },
                      },
                    ],
                  }}
                >
                  <Avatar size={28} icon={<UserOutlined />} />
                </Dropdown>
              </Space>
            </div>
          </Space>
        </Flex>
      </Flex>
    </Layout.Header>
  );
};
export default Header;

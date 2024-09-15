import { Button, Result } from "antd";
const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={[
        <Button onClick={() => navigate(-1)} key="backPrev">
          返回上一页
        </Button>,
        <Button type="primary" onClick={() => navigate("/home")} key="backHome">
          回到首页
        </Button>,
      ]}
    />
  );
};
export default NotFound;

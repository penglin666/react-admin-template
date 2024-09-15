export default {
  url: "/api/login", // 匹配的请求 URL 和真实请求的URL完全一致
  method: "get", // 请求方法
  response: (request) => {
    const { query } = request;
    const users = ["root", "admin", "user"];
    if (users.includes(query.username) && query.password) {
      // 返回的模拟数据
      return {
        code: 0,
        msg: "success",
        data: {
          id: "1",
          nickName:
            query.username === "admin"
              ? "管理员"
              : query.username === "root"
                ? "超级管理员"
                : "普通用户",
          token: "token",
          role: query.username
        }
      };
    }
    return {
      code: 0,
      msg: "用户名或密码错误",
      data: null
    };
  }
};

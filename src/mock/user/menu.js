export default {
  url: "/api/getMenus", // 匹配的请求 URL 和真实请求的URL完全一致
  method: "post", // 请求方法
  response: (request) => {
    const { role } = request.body;
    if (role === "admin" || role === "root") {
      return [
        {
          label: "首页",
          key: "/home",
        },
        {
          label: "关于",
          key: "/about",
          children: [
            {
              label: "关于1",
              key: "/about1",
            },
            {
              label: "关于2",
              key: "/about2",
              children: [
                {
                  label: "关于2-1",
                  key: "/about2-1",
                },
                {
                  label: "关于2-2",
                  key: "/about2-2",
                },
              ],
            },
          ],
        },
        {
          label: "系统设置",
          key: "/setting",
        },
      ];
    }
    return [
      {
        label: "首页",
        key: "/home",
      },
      {
        label: "关于",
        key: "/about",
        children: [
          {
            label: "关于1",
            key: "/about1",
          },
          {
            label: "关于2",
            key: "/about2",
            children: [
              {
                label: "关于2-1",
                key: "/about2-1",
              },
              {
                label: "关于2-2",
                key: "/about2-2",
              },
            ],
          },
        ],
      },
      {
        label: "系统设置",
        key: "/setting",
      },
    ];
  },
};

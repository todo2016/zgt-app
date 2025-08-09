"use strict";
const mockUserData = {
  // 模拟用户数据
  users: [
    {
      id: 1,
      username: "admin",
      password: "123456",
      nickname: "管理员",
      role: "超级管理员",
      avatar: "/static/logo.png",
      email: "admin@example.com",
      phone: "13800138000",
      status: "active",
      createTime: "2024-01-01 00:00:00"
    },
    {
      id: 2,
      username: "user001",
      password: "123456",
      nickname: "张三",
      role: "普通用户",
      avatar: "/static/logo.png",
      email: "user001@example.com",
      phone: "13800138001",
      status: "active",
      createTime: "2024-01-02 00:00:00"
    }
  ],
  // 模拟登录响应
  loginResponse: {
    code: 0,
    message: "登录成功",
    data: {
      token: "mock_token_123456789",
      userInfo: {
        id: 1,
        username: "admin",
        nickname: "管理员",
        role: "超级管理员",
        avatar: "/static/logo.png",
        email: "admin@example.com",
        phone: "13800138000"
      }
    }
  },
  // 模拟用户信息响应
  userInfoResponse: {
    code: 0,
    message: "获取成功",
    data: {
      id: 1,
      username: "admin",
      nickname: "管理员",
      role: "超级管理员",
      avatar: "/static/logo.png",
      email: "admin@example.com",
      phone: "13800138000",
      status: "active",
      createTime: "2024-01-01 00:00:00"
    }
  }
};
const mockLogin = (username, password) => {
  const user = mockUserData.users.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    return {
      success: true,
      data: {
        token: `mock_token_${user.id}_${Date.now()}`,
        userInfo: {
          id: user.id,
          username: user.username,
          nickname: user.nickname,
          role: user.role,
          avatar: user.avatar,
          email: user.email,
          phone: user.phone
        }
      }
    };
  } else {
    return {
      success: false,
      message: "用户名或密码错误"
    };
  }
};
const mockGetUserInfo = (token) => {
  if (token && token.startsWith("mock_token_")) {
    return {
      success: true,
      data: mockUserData.userInfoResponse.data
    };
  } else {
    return {
      success: false,
      message: "token无效"
    };
  }
};
exports.mockGetUserInfo = mockGetUserInfo;
exports.mockLogin = mockLogin;
//# sourceMappingURL=../../.sourcemap/mp-weixin/mock/user.js.map

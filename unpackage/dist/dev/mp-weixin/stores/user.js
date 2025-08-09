"use strict";
const common_vendor = require("../common/vendor.js");
const utils_auth = require("../utils/auth.js");
const api_user = require("../api/user.js");
const utils_wechat = require("../utils/wechat.js");
const useUserStore = common_vendor.defineStore("user", () => {
  const token = common_vendor.ref(utils_auth.getToken() || "");
  const userInfo = common_vendor.ref(null);
  const isLogin = common_vendor.ref(!!utils_auth.getToken());
  const hasUserInfo = common_vendor.computed(() => !!userInfo.value);
  const userId = common_vendor.computed(() => {
    var _a;
    return ((_a = userInfo.value) == null ? void 0 : _a.id) || "";
  });
  const login = async (loginData) => {
    try {
      const data = await api_user.login(loginData);
      token.value = data.token;
      userInfo.value = data.userInfo;
      isLogin.value = true;
      utils_auth.setToken(data.token);
      utils_auth.setUserInfo(data.userInfo);
      return data;
    } catch (error) {
      throw error;
    }
  };
  const wechatLogin = async () => {
    try {
      const loginResult = await utils_wechat.wechatLogin();
      if (loginResult.code) {
        const data = await api_user.wechatLogin({
          code: loginResult.code
        });
        token.value = data.token;
        userInfo.value = data.userInfo;
        isLogin.value = true;
        utils_auth.setToken(data.token);
        utils_auth.setUserInfo(data.userInfo);
        return data;
      } else {
        throw new Error("微信登录失败：未获取到授权码");
      }
    } catch (error) {
      common_vendor.index.__f__("error", "at stores/user.js:64", "微信登录失败:", error);
      throw error;
    }
  };
  const fetchUserInfo = async () => {
    try {
      const data = await api_user.getUserInfo();
      userInfo.value = data;
      utils_auth.setUserInfo(data);
      return data;
    } catch (error) {
      throw error;
    }
  };
  const updateUserInfo = async (updateData) => {
    try {
      const data = await api_user.updateUserInfo(updateData);
      userInfo.value = { ...userInfo.value, ...data };
      utils_auth.setUserInfo(userInfo.value);
      return data;
    } catch (error) {
      throw error;
    }
  };
  const logout = async () => {
    try {
      if (token.value) {
        await api_user.logout();
      }
    } catch (error) {
      common_vendor.index.__f__("error", "at stores/user.js:100", "登出失败:", error);
    } finally {
      token.value = "";
      userInfo.value = null;
      isLogin.value = false;
      utils_auth.removeToken();
      utils_auth.removeUserInfo();
    }
  };
  const checkLoginStatus = () => {
    const localToken = utils_auth.getToken();
    if (localToken && !token.value) {
      token.value = localToken;
      isLogin.value = true;
      return true;
    }
    return isLogin.value;
  };
  return {
    // 状态
    token,
    userInfo,
    isLogin,
    // 计算属性
    hasUserInfo,
    userId,
    // 方法
    login,
    wechatLogin,
    fetchUserInfo,
    updateUserInfo,
    logout,
    checkLoginStatus
  };
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/user.js.map

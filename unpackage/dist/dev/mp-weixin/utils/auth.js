"use strict";
const common_vendor = require("../common/vendor.js");
const TOKEN_KEY = "zgt_token";
const USER_INFO_KEY = "zgt_user_info";
const setToken = (token) => {
  try {
    common_vendor.index.setStorageSync(TOKEN_KEY, token);
  } catch (e) {
    common_vendor.index.__f__("error", "at utils/auth.js:10", "存储token失败:", e);
  }
};
const getToken = () => {
  try {
    return common_vendor.index.getStorageSync(TOKEN_KEY) || "";
  } catch (e) {
    common_vendor.index.__f__("error", "at utils/auth.js:19", "获取token失败:", e);
    return "";
  }
};
const removeToken = () => {
  try {
    common_vendor.index.removeStorageSync(TOKEN_KEY);
  } catch (e) {
    common_vendor.index.__f__("error", "at utils/auth.js:29", "清除token失败:", e);
  }
};
const setUserInfo = (userInfo) => {
  try {
    common_vendor.index.setStorageSync(USER_INFO_KEY, userInfo);
  } catch (e) {
    common_vendor.index.__f__("error", "at utils/auth.js:38", "存储用户信息失败:", e);
  }
};
const removeUserInfo = () => {
  try {
    common_vendor.index.removeStorageSync(USER_INFO_KEY);
  } catch (e) {
    common_vendor.index.__f__("error", "at utils/auth.js:57", "清除用户信息失败:", e);
  }
};
exports.getToken = getToken;
exports.removeToken = removeToken;
exports.removeUserInfo = removeUserInfo;
exports.setToken = setToken;
exports.setUserInfo = setUserInfo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/auth.js.map

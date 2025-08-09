"use strict";
const common_vendor = require("../common/vendor.js");
const utils_auth = require("./auth.js");
const baseConfig = {
  baseURL: "http://localhost:8080/api",
  // 开发环境API地址
  timeout: 1e4,
  header: {
    "Content-Type": "application/json"
  }
};
const requestInterceptor = (config) => {
  const token = utils_auth.getToken();
  if (token) {
    config.header.Authorization = `Bearer ${token}`;
  }
  common_vendor.index.showLoading({
    title: "加载中...",
    mask: true
  });
  return config;
};
const responseInterceptor = (response) => {
  common_vendor.index.hideLoading();
  const { statusCode, data } = response;
  if (statusCode === 200) {
    if (data.code === 0) {
      return data.data;
    } else if (data.code === 401) {
      utils_auth.removeToken();
      common_vendor.index.reLaunch({
        url: "/pages/login/login"
      });
      common_vendor.index.showToast({
        title: "登录已过期，请重新登录",
        icon: "none"
      });
      return Promise.reject(new Error(data.message));
    } else {
      common_vendor.index.showToast({
        title: data.message || "请求失败",
        icon: "none"
      });
      return Promise.reject(new Error(data.message));
    }
  } else {
    common_vendor.index.showToast({
      title: "网络请求失败",
      icon: "none"
    });
    return Promise.reject(new Error("网络请求失败"));
  }
};
const errorHandler = (error) => {
  common_vendor.index.hideLoading();
  common_vendor.index.showToast({
    title: error.message || "请求失败",
    icon: "none"
  });
  return Promise.reject(error);
};
const request = (options) => {
  const config = {
    ...baseConfig,
    ...options,
    url: baseConfig.baseURL + options.url
  };
  const interceptedConfig = requestInterceptor(config);
  return new Promise((resolve, reject) => {
    common_vendor.index.request({
      ...interceptedConfig,
      success: (response) => {
        try {
          const result = responseInterceptor(response);
          resolve(result);
        } catch (error) {
          reject(error);
        }
      },
      fail: (error) => {
        errorHandler(error);
        reject(error);
      }
    });
  });
};
const get = (url, params = {}) => {
  return request({
    url,
    method: "GET",
    data: params
  });
};
const post = (url, data = {}) => {
  return request({
    url,
    method: "POST",
    data
  });
};
exports.get = get;
exports.post = post;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/request.js.map

"use strict";
const utils_request = require("../utils/request.js");
const login = (data) => {
  return utils_request.post("/user/login", data);
};
const getUserInfo = () => {
  return utils_request.get("/user/info");
};
const updateUserInfo = (data) => {
  return utils_request.post("/user/update", data);
};
const logout = () => {
  return utils_request.post("/user/logout");
};
exports.getUserInfo = getUserInfo;
exports.login = login;
exports.logout = logout;
exports.updateUserInfo = updateUserInfo;
//# sourceMappingURL=../../.sourcemap/mp-weixin/api/user.js.map

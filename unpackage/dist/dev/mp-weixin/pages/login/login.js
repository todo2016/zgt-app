"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const stores_user = require("../../stores/user.js");
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const userStore = stores_user.useUserStore();
    const loading = common_vendor.ref(false);
    const showPassword = common_vendor.ref(false);
    const formData = common_vendor.reactive({
      username: "",
      password: "",
      remember: false
    });
    const canLogin = common_vendor.computed(() => {
      return formData.username.trim() && formData.password.trim();
    });
    const togglePassword = () => {
      showPassword.value = !showPassword.value;
    };
    const onRememberChange = (e) => {
      formData.remember = e.detail.value;
    };
    const onForgotPassword = () => {
      common_vendor.index.showToast({
        title: "请联系管理员重置密码",
        icon: "none"
      });
    };
    const onWechatLogin = () => {
      common_vendor.index.showToast({
        title: "微信登录功能开发中",
        icon: "none"
      });
    };
    const onPhoneLogin = () => {
      common_vendor.index.showToast({
        title: "手机登录功能开发中",
        icon: "none"
      });
    };
    const goToRegister = () => {
      common_vendor.index.showToast({
        title: "注册功能开发中",
        icon: "none"
      });
    };
    const handleLogin = async () => {
      if (!canLogin.value || loading.value)
        return;
      try {
        loading.value = true;
        await userStore.login({
          username: formData.username.trim(),
          password: formData.password
        });
        common_vendor.index.showToast({
          title: "登录成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/index/index"
          });
        }, 1500);
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/login/login.vue:179", "登录失败:", error);
        common_vendor.index.showToast({
          title: error.message || "登录失败，请重试",
          icon: "none"
        });
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0,
        b: formData.username,
        c: common_vendor.o(($event) => formData.username = $event.detail.value),
        d: showPassword.value ? "text" : "password",
        e: formData.password,
        f: common_vendor.o(($event) => formData.password = $event.detail.value),
        g: common_vendor.t(showPassword.value ? "👁️" : "🙈"),
        h: common_vendor.o(togglePassword),
        i: formData.remember,
        j: common_vendor.o(onRememberChange),
        k: common_vendor.o(onForgotPassword),
        l: loading.value
      }, loading.value ? {} : {}, {
        m: !canLogin.value || loading.value,
        n: common_vendor.o(handleLogin),
        o: common_vendor.o(onWechatLogin),
        p: common_vendor.o(onPhoneLogin),
        q: common_vendor.o(goToRegister)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map

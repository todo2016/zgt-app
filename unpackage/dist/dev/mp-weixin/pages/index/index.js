"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
const utils_wechat = require("../../utils/wechat.js");
const _sfc_main = {
  __name: "index",
  setup(__props, { expose: __expose }) {
    const userStore = stores_user.useUserStore();
    const userInfo = common_vendor.ref(null);
    const currentDate = common_vendor.ref("");
    const statsData = common_vendor.ref([
      { icon: "📊", value: "1,234", label: "总订单" },
      { icon: "💰", value: "¥56,789", label: "总收入" },
      { icon: "👥", value: "89", label: "活跃用户" },
      { icon: "📈", value: "+12.5%", label: "增长率" }
    ]);
    const modulesData = common_vendor.ref([
      {
        icon: "🛒",
        name: "订单管理",
        description: "查看和管理所有订单",
        path: "/pages/orders/orders"
      },
      {
        icon: "👥",
        name: "用户管理",
        description: "管理用户信息和权限",
        path: "/pages/users/users"
      },
      {
        icon: "📦",
        name: "商品管理",
        description: "管理商品库存和价格",
        path: "/pages/products/products"
      },
      {
        icon: "📊",
        name: "数据统计",
        description: "查看业务数据报表",
        path: "/pages/statistics/statistics"
      },
      {
        icon: "⚙️",
        name: "系统设置",
        description: "配置系统参数",
        path: "/pages/settings/settings"
      },
      {
        icon: "📝",
        name: "日志查看",
        description: "查看系统操作日志",
        path: "/pages/logs/logs"
      }
    ]);
    const quickActions = common_vendor.ref([
      { icon: "➕", name: "新增订单", action: "addOrder" },
      { icon: "🔍", name: "搜索商品", action: "searchProduct" },
      { icon: "📱", name: "联系客服", action: "contactService" },
      { icon: "📋", name: "导出报表", action: "exportReport" }
    ]);
    const isLoggedIn = common_vendor.computed(() => userStore.isLogin);
    common_vendor.onMounted(() => {
      initPage();
    });
    const onShow = () => {
      if (!isLoggedIn.value) {
        common_vendor.index.reLaunch({
          url: "/pages/login/login"
        });
        return;
      }
      fetchUserInfo();
    };
    __expose({
      onShow
    });
    const initPage = () => {
      const now = /* @__PURE__ */ new Date();
      currentDate.value = `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日`;
      if (!isLoggedIn.value) {
        common_vendor.index.reLaunch({
          url: "/pages/login/login"
        });
        return;
      }
      fetchUserInfo();
      utils_wechat.setupWechatShare({
        title: "ZGT应用 - 智能管理平台",
        desc: "欢迎使用ZGT应用，体验智能管理服务",
        imageUrl: "/static/logo.png"
      });
    };
    const fetchUserInfo = async () => {
      try {
        if (userStore.hasUserInfo) {
          userInfo.value = userStore.userInfo;
        } else {
          const data = await userStore.fetchUserInfo();
          userInfo.value = data;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:214", "获取用户信息失败:", error);
        common_vendor.index.showToast({
          title: "获取用户信息失败",
          icon: "none"
        });
      }
    };
    const goToProfile = () => {
      common_vendor.index.showToast({
        title: "个人资料功能开发中",
        icon: "none"
      });
    };
    const handleLogout = () => {
      common_vendor.index.showModal({
        title: "确认登出",
        content: "确定要退出登录吗？",
        success: async (res) => {
          if (res.confirm) {
            try {
              await userStore.logout();
              common_vendor.index.showToast({
                title: "已退出登录",
                icon: "success"
              });
              setTimeout(() => {
                common_vendor.index.reLaunch({
                  url: "/pages/login/login"
                });
              }, 1500);
            } catch (error) {
              common_vendor.index.__f__("error", "at pages/index/index.vue:250", "登出失败:", error);
            }
          }
        }
      });
    };
    const handleModuleClick = (module) => {
      common_vendor.index.showToast({
        title: `${module.name}功能开发中`,
        icon: "none"
      });
    };
    const handleQuickAction = (action) => {
      switch (action.action) {
        case "addOrder":
          common_vendor.index.showToast({
            title: "新增订单功能开发中",
            icon: "none"
          });
          break;
        case "searchProduct":
          common_vendor.index.showToast({
            title: "搜索商品功能开发中",
            icon: "none"
          });
          break;
        case "contactService":
          common_vendor.index.showToast({
            title: "客服功能开发中",
            icon: "none"
          });
          break;
        case "exportReport":
          common_vendor.index.showToast({
            title: "导出报表功能开发中",
            icon: "none"
          });
          break;
      }
    };
    return (_ctx, _cache) => {
      var _a, _b, _c;
      return {
        a: ((_a = userInfo.value) == null ? void 0 : _a.avatar) || "/static/logo.png",
        b: common_vendor.t(((_b = userInfo.value) == null ? void 0 : _b.username) || "用户"),
        c: common_vendor.t(((_c = userInfo.value) == null ? void 0 : _c.role) || "普通用户"),
        d: common_vendor.o(goToProfile),
        e: common_vendor.o(handleLogout),
        f: common_vendor.t(currentDate.value),
        g: common_vendor.f(statsData.value, (stat, index, i0) => {
          return {
            a: common_vendor.t(stat.icon),
            b: common_vendor.t(stat.value),
            c: common_vendor.t(stat.label),
            d: index
          };
        }),
        h: common_vendor.f(modulesData.value, (module, index, i0) => {
          return {
            a: common_vendor.t(module.icon),
            b: common_vendor.t(module.name),
            c: common_vendor.t(module.description),
            d: index,
            e: common_vendor.o(($event) => handleModuleClick(module), index)
          };
        }),
        i: common_vendor.f(quickActions.value, (action, index, i0) => {
          return {
            a: common_vendor.t(action.icon),
            b: common_vendor.t(action.name),
            c: index,
            d: common_vendor.o(($event) => handleQuickAction(action), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map

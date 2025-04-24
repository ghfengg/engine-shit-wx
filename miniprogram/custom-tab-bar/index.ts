Component({
  data: {
    selected: 0, // 默认选中首页
    color: "#FFF",
    selectedColor: "#FFD300",
    list: [
      {
        pagePath: "pages/home/index",
        text: "赛事",
        iconPath: "/assets/icon/competitions-unselected.png",
        selectedIconPath: "/assets/icon/competitions-selected.png"
      },
      {
        pagePath: "pages/judgeSystem/index",
        text: "裁决",
        iconPath: "/assets/icon/judge.png",
        selectedIconPath: "/assets/icon/judge-selected.png"
      },
      {
        pagePath: "pages/publish/index",
        text: "发布",
        isSpecial: true,
        iconPath: "/assets/icon/publish.png"
      },
      {
        pagePath: "pages/battleMatch/index",
        text: "点将",
        iconPath: "/assets/icon/battle-match.png",
        selectedIconPath: "/assets/icon/battle-match-selected.png"
      },
      {
        pagePath: "pages/profile/index",
        text: "用户",
        iconPath: "/assets/icon/profile.png",
        selectedIconPath: "/assets/icon/profile-selected.png"
      }
    ]
  },

  lifetimes: {
    attached() {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const currentPage = pages[pages.length - 1];
        const route = currentPage.route || '';
        const index = this.data.list.findIndex(item => 
          `/${route}` === `/${item.pagePath}`
        );
        if (index > -1) {
          this.setData({ selected: index });
        }
      }
    }
  },

  methods: {
    getTabIndex() {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const url = `/${currentPage.route}`;
      const tabIndex = this.data.list.findIndex(item => item.pagePath === url);
      return tabIndex > -1 ? tabIndex : 0;
    },

    switchTab(e: WechatMiniprogram.TouchEvent) {
      const dataset = e.currentTarget.dataset;
      const index = dataset.index;
      const path = dataset.path;
      const isSpecial = dataset.special;
      console.log(isSpecial);
      console.log(path);
      if (isSpecial) {
        // 处理发布按钮点击
        wx.navigateTo({
          url: '/pages/publish/index',
          fail: (err) => {
            console.error('跳转失败：', err);
            // 如果页面不存在，提示用户
            if (err.errMsg.includes('not found')) {
              wx.showToast({
                title: '页面开发中',
                icon: 'none'
              });
            }
          }
        });
        return;
      }

      if (this.data.selected !== index) {
        wx.switchTab({
          url: `/${path}`,
          success: () => {
            this.setData({ selected: index });
          }
        });
      }
    }
  }
});
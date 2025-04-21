Page({
  data: {
    
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      const tabBar = this.getTabBar();
      if (tabBar) {
        tabBar.setData({
          selected: 2
        });
      }
    }
  },

  onLoad() {
    // 初始化显示数组
   
  },

  onBackTap() {
    wx.navigateBack({
      delta: 1
    });
  }

});
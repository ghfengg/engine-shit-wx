Page({
  data: {
    player1: {
      name: 'Green Teck',
      avatar: '/assets/player/greenteck.jpg'
    },
    player2: {
      name: 'Popping C',
      avatar: '/assets/player/Popping C.jpg'
    },
    balance: 50
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      const tabBar = this.getTabBar();
      if (tabBar) {
        tabBar.setData({
          selected: 1
        });
      }
    }
  },

  onBalanceChange(e: WechatMiniprogram.SliderChange) {
    this.setData({
      balance: e.detail.value
    });
  },

  onVote() {
    const redScore = this.data.balance;
    const blueScore = 100 - redScore;
    let winner = '';
    let result = '';

    if (redScore > blueScore) {
      winner = 'Green Teck(红方)';
      result = `红方 ${redScore}% : 蓝方 ${blueScore}%`;
    } else if (blueScore > redScore) {
      winner = 'Popping C(蓝方)';
      result = `蓝方 ${blueScore}% : 红方 ${redScore}%`;
    } else {
      winner = 'OneMore';
      result = `蓝方 ${blueScore}% : 红方 ${redScore}%`;
    }
    wx.showModal({
      title: 'Vote Confirm',
      content: `The winner:${winner}【${result}】`,
      confirmText: 'vote',
      cancelText: 'redo',
      success: (res) => {
        if (res.confirm) {
          wx.showToast({
            title: 'Vote Success!',
            icon: 'success'
          });
        }
      }
    });
  },
});
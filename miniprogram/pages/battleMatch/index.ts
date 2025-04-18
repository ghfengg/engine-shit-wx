interface Dancer {
  id: string;
  name: string;
  avatar: string;
  disabled: boolean;
}

Page({
  data: {
    currentUser: {
      id: 'user_001',
      name: 'me',
      avatar: '/assets/player/greenteck.jpg'
    },
    searchKeyword: '',
    displayDancers: [] as Dancer[],
    dancers: Array.from({ length: 200 }, (_, index) => ({
      id: `dancer_${String(index + 1).padStart(3, '0')}`,
      name: index === 0 ? 'Popping C' : `Dancer ${index + 1}`,
      avatar: '/assets/player/Popping C.jpg',
      disabled: false
    })),
    selectedDancer: '',
    selectedDancerInfo: null as Dancer | null,
    showDefaultAvatar: true,  // 新增状态控制默认头像显示
  },

  onLoad() {
    // 初始化显示数组
    this.setData({
      displayDancers: this.data.dancers
    });
  },

  onSearchInput(e: WechatMiniprogram.Input) {
    console.log(e.detail.value);
    const keyword = e.detail.value.toLowerCase();
    const filtered = this.data.dancers.filter(dancer => 
      dancer.name.toLowerCase().includes(keyword)
    );

    this.setData({
      searchKeyword: keyword,
      displayDancers: keyword ? filtered : this.data.dancers
    });
  },

  selectDancer(e: WechatMiniprogram.TouchEvent) {
    const id = e.currentTarget.dataset.id;
    const dancer = this.data.dancers.find(d => d.id === id);

    //如果选手已被选中，则不允许点击
    if (dancer && dancer.disabled) {
      wx.showToast({
        title: '该选手已被选择',
        icon: 'none'
      });
      return;
    }


    // 正常的选择逻辑
    if (this.data.selectedDancer === id) {
      this.setData({
        selectedDancer: '',
        selectedDancerInfo: null,
        showDefaultAvatar: true
      });
    } else {
      this.setData({
        selectedDancer: id,
        selectedDancerInfo: dancer,
        showDefaultAvatar: false
      });
    }
  },

  cancelSelect() {
    wx.showModal({
      title: '取消选择',
      content: '确定要重新选择对手吗？',
      success: (res) => {
        if (res.confirm) {
          // 重置选中状态
          const newDancers = this.data.dancers.map(dancer => {
            if (dancer.id === this.data.selectedDancer) {
              return { ...dancer, disabled: false };
            }
            return dancer;
          });

          this.setData({
            dancers: newDancers,
            selectedDancer: '',
            selectedDancerInfo: null,
            showDefaultAvatar: true
          });
        }
      }
    });
  },

  onSubmitBattle() {
    if (!this.data.selectedDancer) {
      wx.showToast({
        title: '请选择对手',
        icon: 'none'
      });
      return;
    }

    wx.showModal({
      title: '确认对阵',
      content: `确认与 ${this.data.selectedDancerInfo?.name} 进行对战？`,
      confirmText: '确认',
      cancelText: '取消',
      success: (res) => {
        if (res.confirm) {
          // 更新选手状态，将选中的选手置灰
          const newDancers = this.data.dancers.map(dancer => {
            if (dancer.id === this.data.selectedDancer) {
              return { ...dancer, disabled: true };
            }
            return dancer;
          });

          this.setData({
            dancers: newDancers,
            showDefaultAvatar: false,  // 显示选中的头像
            confirmedDancer: this.data.selectedDancerInfo  // 保存确认的选手信息
          });

          wx.showToast({
            title: '对阵已确认',
            icon: 'success'
          });
        }
      }
    });
  }
});
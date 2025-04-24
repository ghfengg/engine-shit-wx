interface FormData {
  title: string;
  date: string;
  time: string;
  location: string;
  fee: number;
  details: string;
  contact: string;
  phone: string;
}

Page({
  data: {
    tempFilePath: '',
    formData: {
      title: '',
      date: '',
      time: '',
      location: '',
      fee: 0,
      details: '',
      contact: '',
      phone: ''
    } as FormData
  },

  // 选择图片
  chooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          tempFilePath: res.tempFilePaths[0]
        });
      }
    });
  },

  // 日期选择
  onDateChange(e: WechatMiniprogram.CustomEvent) {
    this.setData({
      ['formData.date']: e.detail.value
    });
  },

  // 时间选择
  onTimeChange(e: WechatMiniprogram.CustomEvent) {
    this.setData({
      ['formData.time']: e.detail.value
    });
  },

  // 预览
  onPreview() {
    // 这里可以跳转到预览页面
    wx.showToast({
      title: '预览功能开发中',
      icon: 'none'
    });
  },

  // 提交
  onSubmit() {
    const { formData, tempFilePath } = this.data;
    
    // 表单验证
    if (!tempFilePath) {
      wx.showToast({
        title: '请上传活动海报',
        icon: 'none'
      });
      return;
    }

    if (!formData.title) {
      wx.showToast({
        title: '请输入比赛名称',
        icon: 'none'
      });
      return;
    }

    // ... 其他字段验证

    // 提交表单
    wx.showLoading({
      title: '提交中'
    });

    // 这里添加实际的提交逻辑
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '提交成功',
        icon: 'success'
      });
      
      // 提交成功后返回
      wx.navigateBack();
    }, 1500);
  }
});
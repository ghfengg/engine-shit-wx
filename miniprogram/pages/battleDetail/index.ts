// 定义裁判信息接口
interface Judge {
  id: number;
  avatar: string;
  name: string;
  title: string;
}

// 定义赛事信息接口
interface BattleInfo {
  id: string;
  image: string;
  title: string;
  subtitle: string;
  format: string;
  time: string;
  location: string;
  fee: number;
  judges: Judge[];
}

Page({
  data: {
    battleInfo: {
      id: '',
      image: '',
      title: '',
      subtitle: '',
      format: '',
      time: '',
      location: '',
      fee: 0,
      judges: [] as Judge[]  // 指定类型为 Judge 数组
    } as BattleInfo
  },

  onBackTap() {
    wx.navigateBack({
      delta: 1
    });
  },

  onLoad(options) {
    const id = options.id;
    this.getBattleDetail(id);
  },

  getBattleDetail(id: string) {
    // 这里应该调用接口获取详情数据
    // 示例数据
    this.setData({
      battleInfo: {
        id,
        image: '/assets/battle/battle1.jpeg',
        title: '2025 EngineShit VOL.10.0',
        subtitle: 'battle party',
        format: '32进16->16进8 8进4 半决赛 决赛',
        time: '2025年10月15日 14:00-18:00',
        location: '上海市徐汇区AultSoda',
        fee: 99,
        judges: [
          {
            id: 1,
            avatar: '/assets/player/greenteck.jpg',
            name: 'GreenTeck(绿坦)',
            title: 'JD三界世界冠军'
          },
          {
            id: 2,
            avatar: '/assets/player/Popping C.jpg',
            name: 'PoppinC',
            title: '《这就是街舞》Session6 总冠军'
          }
        ]
      }
    });
  },

  onSignup() {
    // 处理报名逻辑
    wx.showToast({
      title: '报名成功',
      icon: 'success'
    });
  }
});
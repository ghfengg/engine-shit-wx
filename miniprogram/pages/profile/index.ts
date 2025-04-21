interface UserInfo {
  avatar: string;
  nickname: string;
  danceYears: number;
}

interface Event {
  id: string;
  name: string;
  image: string;
  date: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  statusText: string;
}

interface Player {
  avatar: string;
  name: string;
}

interface Battle {
  id: string;
  player1: Player;
  player2: Player;
  status: string;
}

Page({
  data: {
    userInfo: {
      avatar: '/assets/player/greenteck.jpg',
      nickname: 'Green Teck',
      danceYears: 20
    } as UserInfo,

    events: [
      {
        id: 'event_001',
        name: '2025街舞大赛',
        image: '/assets/battle/battle1.jpeg',
        date: '2025-05-01',
        status: 'ongoing',
        statusText: '进行中'
      },
      {
        id: 'event_002',
        name: '2025中国街舞锦标赛',
        image: '/assets/battle/battle2.jpeg',
        date: '2025-07-20',
        status: 'upcoming',
        statusText: '即将开始'
      }
    ] as Event[],

    battles: [
      {
        id: 'battle_001',
        player1: {
          avatar: '/assets/player/greenteck.jpg',
          name: 'Green Teck'
        },
        player2: {
          avatar: '/assets/player/Popping C.jpg',
          name: 'Popping C'
        },
        status: '等待对战'
      }
    ] as Battle[]
  },

  onShow() {
    if (typeof this.getTabBar === 'function') {
      const tabBar = this.getTabBar();
      if (tabBar) {
        tabBar.setData({
          selected: 4
        });
      }
    }
  },

  onEditProfile() {
    wx.showActionSheet({
      itemList: ['修改头像', '修改昵称'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.updateAvatar();
        } else if (res.tapIndex === 1) {
          this.updateNickname();
        }
      }
    });
  },

  updateAvatar() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFilePaths[0];
        // TODO: 上传头像到服务器
        this.setData({
          'userInfo.avatar': tempFilePath
        });
      }
    });
  },

  updateNickname() {
    wx.showModal({
      title: '修改昵称',
      editable: true,
      placeholderText: '请输入新昵称',
      success: (res) => {
        if (res.confirm && res.content) {
          // TODO: 更新昵称到服务器
          this.setData({
            'userInfo.nickname': res.content
          });
        }
      }
    });
  }
});
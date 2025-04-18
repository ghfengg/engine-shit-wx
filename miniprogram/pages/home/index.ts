interface BattleCard {
  title: string;
  subtitle: string;
  image: string;
}

Page({
  data: {
    banners: [
      {
        id: 2,
        image: '/assets/banner/banner-2.jpeg',
        title: 'Immerse in the World of Dance Battles!',
        subtitle: 'Join the Dance Community'
      }
    ],
    partners: [
      {
        id: 'partner_001',
        name: '杭州·电胶囊',
        description: '街舞Studio',
        logo: '/assets/logo/studio-logo.jpg'
      },
      {
        id: 'partner_002',
        name: '漳州·舞法S',
        description: '街舞Studio',
        logo: '/assets/logo/studio-logo.jpg'
      }
    ],
    hotEvents: [
      {
        id: 'event_001',
        name: 'Engine Shit VOL.7.0',
        description: 'Meet the Crew Members',
        image: '/assets/battle/battle1.jpeg'
      },
      {
        id: 'event_002',
        name: 'Engine Shit VOL.8.0',
        description: 'Dynamic Dance Shows',
        image: '/assets/battle/battle2.jpeg'
      },
      {
        id: 'event_003',
        name: 'Engine Shit VOL.8.0',
        description: 'Dynamic Dance Shows',
        image: '/assets/battle/battle3.jpeg'
      },
    ],
    battleCards: [
      {
        title: 'Engine Shit VOL.7.0',
        subtitle: 'Meet the Crew Members',
        image: '/assets/battle/battle1.jpeg'
      },
      {
        title: 'Engine Shit VOL.8.0',
        subtitle: 'Dynamic Dance Shows',
        image: '/assets/battle/battle2.jpeg'
      },
      {
        title: 'Engine Shit VOL.9.0',
        subtitle: 'Music & Dance Fusion',
        image: '/assets/battle/battle3.jpeg'
      }
    ] as BattleCard[]
  },

  onBattleClick(e: WechatMiniprogram.TouchEvent) {
    const index = e.currentTarget.dataset.index;
    const battle = this.data.battleCards[index];
    wx.navigateTo({
      url: `/pages/battle-detail/index?id=${index}`
    });
  }
});
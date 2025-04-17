interface BattleCard {
  title: string;
  subtitle: string;
  image: string;
}

Page({
  data: {
    banners: [
      { id: 1, image: '/assets/banner/banner-1.jpeg' },
      { id: 2, image: '/assets/banner/banner-2.jpeg' }
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
      },
      {
        title: 'Engine Shit VOL.10.0',
        subtitle: 'Passion for Street Dance',
        image: '/assets/battle/battle4.jpeg'
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
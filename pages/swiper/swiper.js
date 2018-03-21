Page({
  data: {
    activeName: '',
    imgUrls: [
      { id: 'first', url: 'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg' },
      { id: 'second', url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg' },
      { id: 'third', url: 'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg' },
    ],
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },

  changeIndicatorDots: function (e) {
    this.setData({
      indicatorDots: !this.data.indicatorDots
    })
  },

  changeAutoplay: function (e) {
    this.setData({
      autoplay: !this.data.autoplay
    })
  },

  intervalChange: function (e) {
    this.setData({
      interval: e.detail.value
    })
  },

  durationChange: function (e) {
    this.setData({
      duration: e.detail.value
    })
  },

  handleNavChange (e) {
    console.log('nav change')
    const activeName = e.detail
    this.setData({
      activeName,
    })
  },

  handleChange (e) {
    console.log('swiper change')
    const { currentItemId } = e.detail
    this.setData({
      activeName: currentItemId,
    })
  },
})
// test/slider/slider.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    options: [
      { label: 'label - 1', value: 'value - 1' },
      { label: 'label - 2', value: 'value - 2' },
      { label: 'label - 3', value: 'value - 3' }
    ],
  },

  handleDestroy (e) {
    console.log('destroy', e.detail)
  },

  handleStar (e) {
    console.log('star', e.detail)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})
// test/radio/radio.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: 'value - 4',
    options: [
      { label: 'label - 1', value: 'value - 1' },
      { label: 'label - 2', value: 'value - 2' },
      { label: 'label - 3', value: 'value - 3' }
    ]
  },

  handleChange (e) {
    console.log(e.detail)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        value: 'value - 1',
        // options: [{ label: 'label - 4', value: 'value - 4' }]
      })
    }, 2000)
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
// test/form/form.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: {
      other: 'other',
      input: 'input value',
      input2: 'input value - 2',
      input3: 'input value - 3',
      input4: 'input value - 4',
    },
    rules: ['required'],
    otherValid: [true],
    value: 'default value',
    submitModel: {},
    disabled: true,
  },

  handleChange (e) {
    console.log('change', e.detail)
    const { fields, valid } = e.detail
    this.setData({
      submitModel: fields,
      disabled: !valid,
    })
  },

  handleSubmit (e) {
    console.log(this.data.submitModel)
  },

  handleTest (e) {
    console.log(e.detail)
    this.setData({
      test: e.detail
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    setTimeout(() => {
      this.setData({
        value: 'async value',
        // model: {
        //   other: 'async other'
        // }
        // otherValid: [false]
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
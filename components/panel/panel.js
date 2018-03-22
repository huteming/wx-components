// components/panel/panel.js
Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String
    },

    title: {
      type: String
    },

    subtitle: {
      type: String
    },

    to: {
      type: String
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    styleTitle: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 动态计算 title 长度
    setTitleWidth () {
      let styleTitle = 'width: 500rpx;'
      try {
        const { windowWidth } = wx.getSystemInfoSync()
        const width = windowWidth - 15 - 60 - 15 - 15
        styleTitle = `width: ${width}px;`
      } catch (err) {
        console.log(err)
      } finally {
        this.setData({
          styleTitle,
        })
      }
    },
  },

  ready () {
    this.setTitleWidth()
  }
})

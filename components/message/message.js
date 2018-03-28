// components/message/message.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer (val) {
        if (!val) return
        this.handleAnimation()
      },
    },

    /**
     * 消息文字
     */
    message: {
      type: String,
      value: '',
    },

    /**
     * 主题
     * success, warning, info, error
     */
    type: {
      type: String,
      value: 'info',
    },

    /**
     * 文字是否居中
     */
    center: {
      type: Boolean,
      value: false,
    },

    /**
     * 显示时间, 毫秒
     */
    duration: {
      type: Number,
      value: 2000,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: null,
    height: -100,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleAnimation () {
      this.open()
      setTimeout(() => {
        this.close()
      }, this.data.duration)
    },

    /**
     * 打开
     */
    open () {
      const animation = wx.createAnimation()
      animation.translateY(this.data.height).step()

      this.setData({
        animation: animation.export()
      })

      this.triggerEvent('open', null, { bubbles: true, composed: true })
    },

    /**
     * 关闭
     */
    close () {
      const animation = wx.createAnimation()
      animation.translateY(0).step()

      this.setData({
        animation: animation.export(),
        visible: false,
      })

      this.triggerEvent('close', null, { bubbles: true, composed: true })
    },
  },

  ready () {
    const query = this.createSelectorQuery()
    query.select('#message').boundingClientRect()
    query.exec(res => {
      this.setData({
        height: res[0].height
      })
    })
  },
})

// components/tooltip/tooltip.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 位置
     * right-start, right-end, left-start
     */
    placement: {
      type: String,
      value: 'left-start',
    },

    content: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    hidden: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTouchStart (e) {
      this.setData({
        hidden: false,
      })
    },

    handleTouchEnd (e) {
      this.setData({
        hidden: true,
      })
    },
  }
})

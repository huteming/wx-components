Component({
  relations: {
    '../row/row': {
      type: 'parent',
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    span: {
      type: Number,
      value: 24,
    },

    offset: {
      type: Number,
      value: 0,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    padding: 0,

    style: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setStyle () {
      const { span, offset, padding } = this.data
      let style = ''
      style += `width: ${span / 24 * 750}rpx;`
      if (offset > 0) {
        style += `margin-left: ${offset / 24 * 750}rpx;`
      }
      if (padding > 0) {
        style += `padding-left: ${padding}px; padding-right: ${padding}px;`
      }

      this.setData({
        style,
      })
    },
  },

  ready () {
    this.setStyle()
  },
})

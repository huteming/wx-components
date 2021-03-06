// components/slider/slider.js
Component({
  relations: {
    '../slider-item/slider-item': {
      type: 'child',
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    height: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    scrollY: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleScroll(e) {
      const { scrollY } = e.detail
      if (typeof scrollY === 'boolean') {
        this.setData({
          scrollY,
        })
      }
    },

    // 关闭滑块
    handleSliderClose(e) {
      const nodes = this.getRelationNodes('../slider-item/slider-item')
      const node = nodes.find(item => !!item.data.showState)
      if (!node) return

      node.handleAnimation(0, 200)
      node.setData({
        positionX: 0,
        direction: 0,
        showState: false,
      })
    },
  }
})

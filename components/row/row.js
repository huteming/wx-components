// components/row/row.js
Component({

  relations: {
    '../col/col': {
      type: 'child',
      linked: function (target) {
        console.log(this.data.gutter)
        const padding = this.data.gutter / 2
        target.setData({ padding })
      },
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    gutter: {
      type: Number,
      value: 0,
    },

    /**
     * 同 flex 布局的 justify-content 属性
     * flex-start, flex-end, center, space-between, space-around
     */
    justify: {
      type: String,
      value: 'flex-start',
    },

    /**
     * 同 flex 布局的 align-items 属性
     * flex-start, flex-end, center, baseline, stretch
     */
    align: {
      type: String,
      value: 'stretch',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    style: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setStyle () {
      const { justify, align } = this.data
      this.setData({
        style: `justify-content: ${justify}; align-items: ${align};`
      })
    },
  },

  ready () {
    this.setStyle()
  },
})

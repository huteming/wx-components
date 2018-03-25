Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '',
    },

    /**
     * 是否选中
     */
    value: {
      type: Boolean,
      value: false,
    },

    /**
     * 样式
     * switch, checkbox
     */
    type: {
      type: String,
      value: 'switch',
    },

    /**
     * 选中颜色，同 css 的 color
     */
    color: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange (e) {
      const data = {
        name: this.data.name,
        value: e.detail.value,
      }
      this.triggerEvent('change', data, { bubbles: true, composed: true })
    }
  },
})

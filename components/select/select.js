Component({
  /**
   * 组件的属性列表
   */
  properties: {

    type: {
      type: String,
      value: '',
    },

    name: {
      type: String,
      value: '',
    },

    value: {
      type: null,
      value: '',
      observer (val) {
        this.setData({
          normalizedValue: val,
        })
      }
    },

    /**
     * 选择项
     * [{label, value}]
     */
    options: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    normalizedValue: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 改变选中
    handleChange(e) {
      const value = e.detail.value

      this.setData({
        normalizedValue: value,
      })

      const data = {
        name: this.data.name,
        value,
      }
      this.triggerEvent('change', data, { bubbles: true, composed: true })
    },
  }
})

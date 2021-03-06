Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '',
    },

    value: {
      type: String,
      value: '',
    },

    min: {
      type: Number,
      value: 0,
    },

    max: {
      type: Number,
      value: 100,
    },

    step: {
      type: Number,
      value: 1,
    },

    showValue: {
      type: Boolean,
      value: false,
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
    handleChange(e) {
      const data = {
        name: this.data.name,
        value: e.detail.value,
      }
      this.triggerEvent('change', data, { bubbles: true, composed: true })
    }
  }
})

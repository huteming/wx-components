// components/datepicker/datepicker.js
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

    mode: {
      type: String,
      value: 'date'
    },

    start: {
      type: String,
      value: '',
    },

    end: {
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
    handleChange(e) {
      const value = e.detail.value

      this.setData({
        value,
      })

      const data = {
        name: this.data.name,
        value,
      }
      this.triggerEvent('change', data, { bubbles: true, composed: true })
    },
  }
})

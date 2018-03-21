// components/picker/picker.js
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
      observer(val) {
        if (val === this.data.currentValue) return
        this.setCurrent(this.data.options, val)
      },
    },

    /**
     * 选项 { label, value }
     */
    options: {
      type: Array,
      value: [],
      observer(val) {
        this.setCurrent(val, this.data.currentValue)
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentValue: '',
    currentIndex: -1,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 切换选择
    handleChange(e) {
      const currentIndex = e.detail.value
      const { label, value } = this.data.options[currentIndex]
      this.setCurrent(this.data.options, value)
      const data = {
        name: this.data.name,
        value,
      }
      this.triggerEvent('change', data, { bubbles: true, composed: true })
    },

    setCurrent(options, currentValue) {
      const currentIndex = options.findIndex(item => {
        return item.value === currentValue
      })
      this.setData({
        currentIndex,
        currentValue,
      })
    },
  },
})

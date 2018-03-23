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
      type: Array,
      value: [],
      observer(val) {
        this.setCurrent(this.data.options, val)
      },
    },

    options: {
      type: Array,
      value: [],
      observer(val) {
        this.setCurrent(val, this.data.current)
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: [],
    checkboxItems: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 改变选中
    handleChange(e) {
      const value = e.detail.value
      this.setCurrent(this.data.options, value)
      const data = {
        name: this.data.name,
        value,
      }
      this.triggerEvent('change', data, { bubbles: true, composed: true })
    },

    // 设置选中
    setCurrent(options, current) {
      const checkboxItems = options.map(item => {
        item.checked = current.indexOf(item.value) > -1
        return item
      })

      this.setData({
        checkboxItems,
        current,
      })
    },
  }
})

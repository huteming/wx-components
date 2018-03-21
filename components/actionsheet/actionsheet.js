// components/actionsheet/actionsheet.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 数组对象 { label, value }
     */
    options: {
      type: Array,
      value: [],
      observer(val) {
        const validItems = val.filter(item => item.label && item.value)
        const labels = validItems.map(item => item.label)
        const values = validItems.map(item => item.value)

        this.setData({
          labels,
          values,
        })
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    labels: [],
    values: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleOpen() {
      const { labels, values } = this.data
      wx.showActionSheet({
        itemList: labels,
        success: (res) => {
          const { cancel, tapIndex } = res
          if (!cancel) {
            const value = values[tapIndex]
            this.triggerEvent('click', value, { bubbles: true, composed: true })
          }
        }
      })
    }
  },
})

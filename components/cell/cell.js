Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String,
      value: '',
    },

    iconColor: {
      type: String,
      value: '',
    },

    label: {
      type: String,
      value: '',
    },

    labelWidth: {
      type: Number,
      value: '',
      observer (val) {
        if (val > 0) {
          this.setData({
            styleLabel: `width: ${val}px;`
          })
        }
      }
    },

    value: {
      type: String,
      value: '',
    },

    isLink: {
      type: Boolean,
      value: false,
    },

    to: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    styleLabel: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick() {
      const { isLink, to } = this.data
      if (isLink && to) {
        wx.navigateTo({
          url: to,
        })
      }
    },
  },
})

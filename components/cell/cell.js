// components/cell/cell.js
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String
    },

    iconColor: {
      type: String,
    },

    label: {
      type: String
    },

    value: {
      type: null,
      value: '',
    },

    isLink: {
      type: Boolean
    },

    to: {
      type: String
    },

    error: {
      type: Boolean,
    }
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
    handleClick() {
      const { isLink, to } = this.data
      if (isLink && to) {
        wx.navigateTo({
          url: to,
        })
      }
    },
  }
})

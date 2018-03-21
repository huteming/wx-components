// components/button/button.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    size: {
      type: String,
      value: 'default',
    },

    type: {
      type: String,
      value: 'primary',
    },

    plain: {
      type: Boolean,
      value: false,
    },

    disabled: {
      type: Boolean,
      value: false,
    },

    to: {
      type: String,
      value: '',
    },

    space: {
      type: Boolean,
      value: true,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    loading: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick(e) {
      if (this.data.to) {
        wx.navigateTo({
          url: this.data.to,
        })
      } else {
        this.triggerEvent('click', null, { bubbles: true, composed: true })
      }
    },
  }
})

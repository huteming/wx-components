Component({

  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: 'success',
    },

    size: {
      type: String,
      value: 'default',
    },

    plain: {
      type: Boolean,
      value: false,
    },

    disabled: {
      type: Boolean,
      value: false,
    },

    loading: {
      type: Boolean,
      value: false,
    },

    space: {
      type: Boolean,
      value: true,
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

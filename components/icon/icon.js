// components/icon/icon.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    icon: {
      type: String,
      value: '',
      observer (val) {
        this.setData({
          classIcon: `iconfont-${val}`
        })
      },
    },

    color: {
      type: String,
      value: '',
      observer (val) {
        this.setData({
          classColor: `iconfont-color-${val || 'primary'}`,
        })
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    classIcon: '',
    classColor: 'iconfont-color-primary',
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
})

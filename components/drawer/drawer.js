// components/drawer/drawer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    visible: {
      type: Boolean,
      value: false,
      observer (val) {
        const data = val
          ? { animationDrawer: 'c-drawer-animate', animationMask: 'c-drawer-mask-animate', animationContent: 'c-drawer-content-animate' }
          : { animationDrawer: '', animationMask: '', animationContent: '' }

        this.setData(data)

        const eventName = val ? 'open' : 'close'
        this.triggerEvent(eventName, null, { bubbles: true, composed: true })
      },
    },

    /**
     * 隐藏内容位置
     * left, right
     */
    placement: {
      type: String,
      value: 'left',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    animationDrawer: '',
    animationMask: '',
    animationContent: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClickContent (e) {},

    handleClickPage (e) {
      this.setData({
        visible: false,
      })
    },
  },
})

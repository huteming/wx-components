// components/navbar-header/navbar-header.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: [],
      observer (val) {
        if (this.data.isReady) {
          this.setAverageWidth()
        }
      }
    },

    activeName: {
      type: String,
      value: '',
      observer (val) {
        if (this.data.isReady) {
          this.setActive(val)
        }
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: '',

    averageWidth: '',
    animation: '',

    windowWidth: '',
    isReady: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange (e) {
      const activeName = e.currentTarget.dataset.name
      this.setActive(activeName)
    },

    setActive (activeName) {
      const { tabs, averageWidth } = this.data
      const activeIndex = tabs.indexOf(activeName)
      const positionX = averageWidth * activeIndex
      const animation = wx.createAnimation({ duration: 200 })
      animation.translateX(positionX).step()

      this.setData({
        current: activeName,
        animation: animation.export(),
      })
      this.eventChange(activeName)
    },

    eventChange (activeName) {
      this.triggerEvent('change', activeName, { bubbles: true, composed: true })
    },

    setAverageWidth () {
      const { windowWidth, tabs } = this.data
      this.setData({
        averageWidth: windowWidth / tabs.length,
      })
    },
  },

  attached () {
    try {
      const { windowWidth } = wx.getSystemInfoSync()
      this.setData({ windowWidth })
    } catch (e) {
      console.log(e)
    }
  },

  ready () {
    const { tabs, activeName } = this.data
    this.setAverageWidth()
    this.setActive(activeName || tabs[0])
    this.setData({
      isReady: true,
    })
  },
})

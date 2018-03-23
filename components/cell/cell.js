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
      observer (val) {
        if (this.data.isReady) {
          this.setStyle()
        }
      },
    },

    iconColor: {
      type: String,
    },

    label: {
      type: String,
      value: '',
      observer (val) {
        if (this.data.isReady) {
          this.setStyle()
        }
      },
    },

    labelWidth: {
      type: Number,
      value: '',
      observer (val) {
        if (val > 0) {
          this.setData({
            styleBody: `width: ${val}px;`
          })
        }
      }
    },

    value: {
      type: null,
      value: '',
      observer (val) {
        if (this.data.isReady) {
          this.setStyle()
        }
      },
    },

    isLink: {
      type: Boolean
    },

    to: {
      type: String
    },

    error: {
      type: Boolean,
      value: false,
      observer (val) {
        if (this.data.isReady) {
          this.setStyle()
        }
      },
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    styleHeader: '',
    styleBody: '',
    styleValue: '',

    windowWidth: '',
    isReady: false,
    timeout: null,
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

    // 动态设置各部分的 width
    setStyle () {
      if (this.data.timeout) {
        clearTimeout(this.data.timeout)
        this.setData({
          timeout: null,
        })
      }

      const timeout = setTimeout(() => {
        let width = this.data.windowWidth - 10 - 15
        const { isLink, error } = this.data
        // 减去 isLink 宽度
        if (isLink) {
          width -= 13
        }
        // 减去 error 宽度
        if (error) {
          width -= 30
        }

        let styleHeader = ''
        let styleValue = ''
        const query = this.createSelectorQuery()
        query.select('#cell-header').boundingClientRect()
        query.select('#cell-body').boundingClientRect()
        query.exec(res => {
          // 减去 icon 宽度
          if (res[0] && res[0].width > 0) {
            styleHeader = 'margin-right: 8px;'
            width = width - res[0].width - 8
          }
          // 减去 label 宽度
          width = width - res[1].width - 10
          // 剩余 value 宽度
          styleValue = `
            width: ${width}px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          `
          this.setData({
            styleHeader,
            styleValue,
          })
        })
      })

      this.setData({
        timeout,
      })
    },
  },

  attached (e) {
    try {
      const { windowWidth } = wx.getSystemInfoSync()
      this.setData({ windowWidth })
    } catch (err) {
      console.log(err)
    }
  },

  ready () {
    this.setStyle()

    this.setData({
      isReady: true,
    })
  }
})

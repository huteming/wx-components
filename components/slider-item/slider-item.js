// components/slider-item/slider-item.js
Component({
  relations: {
    '../slider/slider': {
      type: 'parent', // 关联的目标节点应为子节点
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 滑动后的操作按钮
     * { label, value, event }
     */
    layout: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    animation: '',
    animationMenu: '',

    max: 0, // 滑动最大距离
    width: 0, // 显示菜单时的左滑距离

    startX: 0,
    startY: 0,
    moveX: 0, // 滑动距离
    positionX: 0, // 当前位置
    direction: 0, // 滑动方向，0: 未处理，1：竖向，2：横向
    showState: false, // 菜单显示状态, false：不显示，true：显示

    windowWidth: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleClick (e) {
      const { label, value, event } = e.currentTarget.dataset.item
      wx.showModal({
        content: `确认${label}？`,
        success: (res) => {
          if (res.cancel) return
          this.triggerEvent(event, value, { bubbles: true, composed: true })
        },
        fail: (e) => {
          console.log(e)
        }
      })
    },

    /**
     * 滑动开始，处理事件如下
     * 1、关闭已打开的滑块
     * 2、记录当前位置
     */
    onTouchStart(e) {
      this.handleEventCloseSlider()

      const { clientX, clientY } = e.touches[0]

      this.setData({
        startX: clientX,
        startY: clientY,
      })
    },

    /**
     * 滑动中，处理事件如下（备注：该事件是随着滑动多次连续触发的）
     * 1、判断滑动方向
     *   ①、竖向滑动，跳过不处理
     *   ②、未知滑动方向，则设置记录滑动方向。竖向，跳过不处理；横向，则触发事件不允许滚动视图区域竖向滑动
     * 2、处理滑动距离
     */
    onTouchMove(e) {
      const { clientX: currentX, clientY: currentY } = e.touches[0]
      const { startX, startY, max } = this.data
      const moveX = currentX - startX
      const moveY = currentY - startY

      // 竖向滑动
      if (this.data.direction === 1) {
        return
      }

      // 未处理滑动方向
      if (this.data.direction === 0) {
        // 滑动幅度太小，不处理
        if (Math.abs(moveX) < 4 && Math.abs(moveY) < 4) {
          return
        }

        // 竖向滑动
        if (Math.abs(moveY) > 4) {
          this.setData({
            direction: 1,
          })
          return
        }

        // 横向滑动
        this.setData({
          direction: 2
        })
        this.handleEventScroll({ scrollY: false })
      }

      let positionX = moveX
      if (moveX > 0) {
        positionX = 0
      }
      if (moveX < -max) {
        positionX = -max
      }

      this.handleAnimation(positionX, 0)

      this.setData({
        positionX,
        moveX,
      })
    },

    /**
     * 滑动结束，处理事件如下
     * 1、竖向滑动，跳过不处理
     * 2、小于按钮宽度 1/3，置为初始位置；否则，显示按钮
     * 3、允许滚动视图区域可以上下左右随意滑动
     */
    onTouchEnd(e) {
      // 将方向置为未激活
      const direction = this.data.direction
      this.setData({
        direction: 0
      })
      // 竖向滑动
      if (direction === 1) {
        return
      }
      let positionX
      let showState
      if (this.data.positionX < -this.data.width / 3) {
        positionX = -this.data.width
        showState = true
      } else {
        positionX = 0
        showState = false
      }
      this.handleAnimation(positionX, 200)
      this.setData({
        showState,
      })
      this.handleEventScroll({ scrollY: true })
    },

    /**
     * positionX: X轴坐标
     * duration: 动画时长，单位 ms
     */
    handleAnimation(positionX, duration) {
      const animation = wx.createAnimation({ duration })
      animation.translateX(positionX).step()
      const animationExport = animation.export()

      this.setData({
        animation: animationExport,
        animationMenu: animationExport,
      })
    },

    /**
     * scrollY：是否允许竖向滑动
     */
    handleEventScroll({ scrollY }) {
      const data = {}

      if (typeof scrollY === 'boolean') {
        data.scrollY = scrollY
      }

      this.triggerEvent('scroll', data, { bubbles: true, composed: true })
    },

    /**
     * 冒泡事件让父组件查找已打开的滑块，并关闭
     */
    handleEventCloseSlider() {
      this.triggerEvent('closeSlider', {}, { bubbles: true, composed: true })
    },
  },

  attached() {
    try {
      const { windowWidth } = wx.getSystemInfoSync()

      this.setData({
        windowWidth,
      })
    } catch (err) {
      console.log(err)
    }
  },

  ready () {
    const width = this.data.layout.length * 170
    const scale = (750 / 2) / (width / 2) // 以宽度750px设计稿做宽度的自适应
    const real = Math.floor(this.data.windowWidth / scale)

    this.setData({
      width: real,
      max: real + 10,
    })
  }
})

/**
 * 备注，组件内无法传递函数，所以format函数有可能会失效，wxcharts已修改地方如下
 * 1、function drawPieText 修改返回 P850
 */

const WxChart = require('../../assets/js/wxcharts.js')

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    id: {
      type: String,
      value: 'selfCanvas',
    },

    type: {
      type: String,
      value: 'line',
    },

    options: {
      type: Object,
      value: {},
      observer (val) {
        if (!this.data.isReady) return
        this.update(val)
      }
    },

    width: {
      type: Number,
      value: '',
      observer (val) {
        if (!this.data.isReady) return
        this.setChart()
      },
    },

    height: {
      type: Number,
      value: '',
      observer (val) {
        if (!this.data.isReady) return
        this.setChart()
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    realWidth: '',
    realHeight: '',

    chart: null,
    isReady: false,

    timeout: null,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化图表
    initLine (width, height) {
      let categories = []
      let data = []
      for (let i = 0; i < 25; i++) {
        let value = i < 10 ? `0${i}` : i
        categories.push(value)
        data.push(0)
      }

      const chart = new WxChart({
        canvasId: this.data.id,
        type: 'line',
        animation: true,
        width: width,
        height: height,
        dataLabel: false,
        dataPointShape: true,
        // enableScroll: true,
        dataPointShape: false,
        extra: {
          lineStyle: 'curve'
        },
        xAxis: {
          disableGrid: true
        },
        background: '#f5f5f9',
        categories: categories,
        series: [{
          name: '数据',
          data: data,
          format: function (val, name) {
            return val.toFixed(2)
          }
        }],
        yAxis: {
          format: function (val) {
            return val.toFixed(2)
          }
        }
      }, this)

      this.setData({
        chart,
      })
    },

    initPie (width, height) {
      const chart = new WxChart({
        animation: true,
        canvasId: this.data.id,
        type: 'pie',
        width: width,
        height: height,
        dataLabel: true,
        series: [
          {
            name: '数据',
            data: 0.1,
          }
        ]
      }, this)
      this.setData({
        chart,
      })
    },

    // 更新图表
    update (options) {
      if (!options || !this.data.chart) return
      const { series, categories } = options

      this.data.chart.updateData({
        categories,
        series
      })
    },

    // 点击事件
    handleStart (e) {
      if (this.data.type !== 'line') return
      this.data.chart.showToolTip(e, {
        format: function (item, category) {
          return category + ' ' + item.name + ':' + item.data
        }
      })
    },

    handleMove (e) {},

    handleEnd (e) {},

    // 获取宽高
    getAreaInfo () {
      let heightAsync = 220
      let widthAsync = 300
      const { height, width } = this.data
      try {
        const { windowHeight, windowWidth } = wx.getSystemInfoSync()
        heightAsync = windowHeight
        widthAsync = windowWidth
      } catch (err) {
        console.error('getSystemInfoSync failed!')
      }

      return {
        height: height || heightAsync,
        width: width || widthAsync,
      }
    },

    // 设置图表
    setChart () {
      if (this.data.timeout) {
        clearTimeout(this.data.timeout)
        this.setData({
          timeout: null,
        })
      }

      const timeout = setTimeout(() => {
        const { width, height } = this.getAreaInfo()
        this.setData({
          realWidth: width,
          realHeight: height,
        })

        switch (this.data.type) {
          case 'line':
            this.initLine(width, height)
            break
          case 'pie':
            this.initPie(width, height)
            break
          default:
            throw new Error('图表类型错误')
        }
        this.update(this.data.options)
      })

      this.setData({
        timeout,
      })
    },
  },

  ready () {
    this.setChart()

    this.setData({
      isReady: true,
    })
  }
})

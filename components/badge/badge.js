// components/badge/badge.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 位置
     * top-end, right
     */
    placement: {
      type: String,
      value: 'right',
    },

    /**
     * 徽章内容
     */
    value: {
      type: String,
      value: '',
      observer (val) {
        const styleBadge = val ? '' : 'padding: 0.4em;'
        this.setData({ styleBadge })
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    styleBadge: 'padding: 0.4em;'
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

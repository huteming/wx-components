// components/header/header.js
Component({
  options: {
    multipleSlots: true
  },

  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
    },

    subtitle: {
      type: String
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
    handleTitleClick(e) {
      this.triggerEvent('clickTitle', null, { bubbles: true, composed: true })
    },

    handleSubtitleClick(e) {
      this.triggerEvent('clickSubtitle', null, { bubbles: true, composed: true })
    },
  }
})

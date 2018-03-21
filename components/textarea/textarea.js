// components/textarea/textarea.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    name: {
      type: String,
      value: '',
    },

    value: {
      type: String,
      value: '',
    },

    rows: {
      type: String,
      value: '5',
    },

    placeholder: {
      type: String,
      value: '请输入',
    },

    disabled: {
      type: Boolean,
      value: false,
    },

    focus: {
      type: Boolean,
      value: false,
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
    handleTyping(e) {
      this.event('change', e.detail.value)
    },

    handleFocus(e) {
      this.event('focus', e.detail.value)
    },

    handleBlur(e) {
      this.event('blur', e.detail.value)
    },

    event(eventName, value) {
      const data = {
        name: this.data.name,
        value,
      }
      this.triggerEvent(eventName, data, { bubbles: true, composed: true })
    }
  }
})


Component({
  relations: {
    '../form/form': {
      type: 'ancestor',
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 表单域 model 字段
     */
    prop: {
      type: String,
      value: '',
    },

    icon: {
      type: String,
      value: '',
    },

    label: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    required: false,
    valid: true,

    styleLabel: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange (e) {
      const { value } = e.detail
      const { prop } = this.data

      const data = {
        prop,
        value,
      }
      this.triggerEvent('formItemChange', data, { bubbles: true, composed: true })
    },

    setStyleLabel (width) {
      this.setData({
        styleLabel: `width: ${width}px;`
      })
    },

    setRequired (required) {
      this.setData({ required })
    },

    setValid (valid) {
      this.setData({ valid })
    },
  },

  ready () {

  },
})

import getValidator from '../../assets/js/validator.js'

Component({
  relations: {
    '../form-item/form-item': {
      type: 'descendant',
      linked (target) {
        const { prop } = target.data
        const { labelWidth, rules } = this.data
        if (labelWidth) {
          target.setStyleLabel(labelWidth)
        }

        if (!rules[prop]) {
          console.log(`无需验证属性：${prop}`)
        } else {
          console.log(`需要验证属性：${prop}`)
          const isRequired = rules[prop].some(item => item.validate === 'required')
          target.setRequired(isRequired)
          this.updateValidator(prop)
        }
      },
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 表单数据模型
     */
    model: {
      type: Object,
      value: {},
    },

    /**
     * 验证规则
     * 示例：['required', 'min:3', 'max:10:12:13']
     */
    rules: {
      type: Object,
      value: {},
    },

    labelWidth: {
      type: Number,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    /**
     * 表单数据验证结果
     */
    valids: {},

    /**
     * 表单数据验证方法
     */
    validators: {},
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * update validators
     * 需要在 item 插入时，设置该 item 对应的 prop 的验证方法
     */
    updateValidator (prop) {
      const { rules } = this.data

      this.setData({
        [`validators.${prop}`]: getValidator(rules[prop]),
      })
    },

    /**
     * 处理表单的 change 事件
     */
    handleChange (e) {
      const { prop, value } = e.detail

      if (!prop) {
        console.log('无 prop 属性，忽略本次 change')
        return
      }

      this.setData({
        [`model.${prop}`]: value,
      })

      this.triggerEvent('change', this.data.model, { bubbles: true, composed: true })
    },

    /**
     * 验证表单
     * 供外部调用，类似 element-ui 中的调用方式
     * 过程：遍历验证所有有验证方法的字段，如果有message，认为验证不通过，设置对应 item 的 valid 为 false，
     * 回调函数的参数为所有验证结果
     */
    validate (callback) {
      const nodes = this.getRelationNodes('../form-item/form-item')
      const { validators, model } = this.data
      let valid = true

      Object.keys(validators).forEach(prop => {
        const value = model[prop]
        const fn = validators[prop]
        const message = fn(value)
        const target = nodes.find(item => item.data.prop === prop)
        target.setErrorMessage(message)
        if (message) {
          valid = false
        }
      })
      callback(valid)
    },
  },

  ready () {

  }
})

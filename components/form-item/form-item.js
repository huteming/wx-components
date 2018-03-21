import getValidator from '../../assets/js/validator.js'
import behaviorFrom from '../../behaviors/form.js'

Component({
  behaviors: [behaviorFrom],
  relations: {
    '../form/form': {
      type: 'ancestor',
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    name: {
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

    labelWidth: {
      type: String,
      value: '',
    },

    /**
     * 验证规则
     * 示例：['required', 'min:3', 'max:10:12:13']
     */
    rules: {
      type: Array,
      observer(val) {
        if (!val) return
        const validator = getValidator(val)
        const required = val.indexOf('required') > -1

        this.setData({
          validator,
          required,
        })
      },
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    validator: null,
    required: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange(e) {
      const { value } = e.detail
      const valid = this.validate(value)
      const data = {
        name: this.data.name,
        value,
        valid,
      }
      this.triggerEvent('formItemChange', data, { bubbles: true, composed: true })
    },

    validate (value) {
      const { validator } = this.data
      return validator ? validator(value) : true
    }
  },
})

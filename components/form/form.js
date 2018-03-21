import getValidator from '../../assets/js/validator.js'
import behaviorForm from '../../behaviors/form.js'
import tools from '../../assets/js/tools.js'

Component({
  relations: {
    'behaviorForm': {
      type: 'descendant',
      linked (target) {
        const { label, name, rules } = target.data
        target.setData({
          labelWidth: this.data.labelWidth,
        })

        if (name && rules) {
          this.setData({
            [`rules.${name}`]: getValidator(rules),
            [`valids.${name}`]: false,
          })
          console.log(`需要验证属性：${label}`, `规则: ${rules}`)
        } else {
          console.log(`无需验证属性：${label}`)
        }
      },
      target: behaviorForm,
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    model: {
      type: Object,
      value: {},
      observer (val) {
        this.setData({
          fields: { ...val },
        })
        if (this.data.isReady) {
          this.setValids()
        }
      },
    },

    labelWidth: {
      type: String,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    // 表单对象
    fields: {},
    // 表单属性验证结果
    valids: {},
    // 表单属性验证规则
    rules: {},

    isReady: false,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 子组件中的 change
    handleChange(e) {
      const { name, value, valid } = e.detail
      if (!name) {
        console.log('无 name 属性，忽略本次 change')
        return
      }

      this.setData({
        [`fields.${name}`]: value,
        [`valids.${name}`]: valid,
      })
      this.eventChange()
    },

    // 验证表单，并保存结果
    setValids () {
      const { fields, rules } = this.data
      const valids = Object.assign({}, this.data.valids)
      Object.keys(rules).forEach(name => {
        const fn = rules[name]
        const value = fields[name]
        valids[name] = fn(value)
      })
      this.setData({
        valids,
      })

      this.eventChange()
    },

    // 事件 change
    eventChange () {
      const { fields, valids } = this.data
      const valid = tools.getValuesInObj(valids).every(item => !!item)

      const data = {
        fields,
        valid,
      }

      setTimeout(() => {
        this.triggerEvent('change', data, { bubbles: true, composed: true })
      })
    }
  },

  ready () {
    this.setValids()
    this.setData({
      isReady: true,
    })
  }
})

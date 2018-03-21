/**
 * 备注
 * 每次切换选项，都需要做三件事
 * 1、切换tab选中名称（样式）
 * 2、切换tab下划线（样式）
 * 3、切换tab内容
 */

Component({
  relations: {
    '../navbar-item/navbar-item': {
      type: 'child',
      linked (target) {
        const name = target.data.name
        if (!name) throw new Error('name属性必填')
        const tabs = this.data.tabs.concat(name)

        this.setData({
          tabs,
        })
      },
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    activeName: {
      type: String,
      value: '',
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    tabs: [],
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleChange (e) {
      const activeName = e.detail
      const nodes = this.getRelationNodes('../navbar-item/navbar-item')
      nodes.forEach(item => {
        if (item.data.name === activeName) {
          item.setData({ hidden: false })
        } else {
          item.setData({ hidden: true })
        }
      })
    },
  },
})

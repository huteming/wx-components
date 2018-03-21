// components/navbar-item/navbar-item.js
Component({
  relations: {
    '../navbar/navbar': {
      type: 'parent'
    }
  },

  /**
   * 组件的属性列表
   */
  properties: {
    /**
     * 名字，唯一标识符
     */
    name: {
      type: String,
      value: ''
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    hidden: true,
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})

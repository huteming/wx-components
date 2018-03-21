const mapValidate = {
  required() {
    return function (value) {
      return !!value
    }
  },

  min(minLength) {
    return function (value) {
      return !value || value.length >= minLength
    }
  },

  max(maxLength) {
    return function (value) {
      return !value || value.length <= maxLength
    }
  },

  number(min, max) {
    return function (value) {
      const result = Number(value)
      if (isNaN(result)) return false
      if (min && result < min) return false
      if (max && result > max) return false
      return true
    }
  },
}

/**
 * rules 示例
 * ['required', 'min:3', 'max:10:12:13']
 */
export default function (rules) {
  const validates = rules.map(item => {
    const [type, ...args] = item.split(':')
    return mapValidate[type].apply(this, args)
  })

  return function (value) {
    return validates.every(fn => fn(value))
  }
}
const mapValidate = {
  required () {
    return function (value) {
      return !!value
    }
  },

  min (minLength) {
    return function (value) {
      return !value || value.length >= minLength
    }
  },

  max (maxLength) {
    return function (value) {
      return !value || value.length <= maxLength
    }
  },

  number (min, max) {
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
 * [
 *   { validate: 'required', message: '必填' },
 *   { validate: 'min:3', message: '最小长度为3' }
 * ]
 */
export default function (rules) {
  const validates = rules.map(item => {
    const [type, ...args] = item.validate.split(':')
    return {
      validate: mapValidate[type].apply(this, args),
      message: item.message,
    }
  })

  return function (value) {
    let result
    for (let i = 0; i < validates.length; i++) {
      const { validate, message } = validates[i]
      if (!validate(value)) {
        result = message
        break
      }
    }
    return result
  }
}
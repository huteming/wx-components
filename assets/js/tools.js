function fillZero (value) {
  return value < 10 ? `0${value}` : String(value)
}

function formatTime (timestamp) {
  if (!timestamp) return ''
  const now = new Date(timestamp)

  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const date = now.getDate()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const seconds = now.getSeconds()

  return `${year}-${fillZero(month)}-${fillZero(date)}, ${fillZero(hours)}:${fillZero(minutes)}:${fillZero(seconds)}`
}

function isEmpty(data) {
  // null
  if (data === null) return true

  // number
  if (typeof data === 'number') return false

  // boolean
  if (typeof data === 'boolean') return false

  // array
  if (data instanceof Array) {
    return !data.length
  }

  // object
  if (data instanceof Object) {
    for (let key in data) {
      return false
    }
    return true
  }

  // string, undefined
  return !data
}

function getValuesInObj (obj) {
  const values = []
  for (let key in obj) {
    values.push(obj[key])
  }
  return values
}

export default {
  isEmpty,
  formatTime,
  getValuesInObj,
}
import config from '../../config.js'
const app = getApp()

const URI = config.isDevelopment
  ? 'https://solariot.beta.creekspring.com/api/'
  : 'https://solariot.iot2.creekspring.com/api/'

function requestError(res) {
  wx.showModal({
    content: res.data.message,
    showCancel: false
  })
}

function loginError() {
  wx.reLaunch({
    url: '../pages/login/login',
  })
}

function authError() {
  wx.showModal({
    content: '无权限, 请联系管理员！',
    showCancel: false
  })
}

function serverError() {
  wx.showModal({
    content: '服务器错误！',
    showCancel: false
  })
}

function serverOff() {
  wx.showModal({
    content: '服务器忙！请稍后重试',
    showCancel: false
  })
}

function notFoundError() {
  wx.showModal({
    content: '404 错误!',
    showCancel: false
  })
}

function uniqueError() {
  wx.showModal({
    content: '已存在',
    showCancel: false
  })
}

const handleMethods = new Map([
  [400, requestError], // 客户端引起的异常
  [401, loginError], // 没有携带有效的身份验证
  [403, authError], // 没有权限
  // [404, notFoundError], // 请求资源没有找到 扫码设备会返回404
  [409, uniqueError], // 唯一性验证冲突
  [422, requestError], // 请求参数字段验证不通过
  [500, serverError], // 服务器内部错误
  [502, serverOff]
])

function setToken() {
  const { token, refreshToken } = app.data
  return {
    'Authorization': `Bearer ${token}`,
    'x-refresh-token': `Bearer ${refreshToken}`
  }
}

function request(method, path, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url: URI + path,
      data: Object.assign({}, data),
      header: setToken(),
      success(res) {
        // wx.hideLoading()
        const statusCode = res.statusCode
        if (statusCode < 300) {
          return resolve(res)
        }
        wx.hideLoading()
        if (handleMethods.has(statusCode)) {
          const handle = handleMethods.get(statusCode)
          handle(res)
        } else {
          wx.showModal({
            content: '请求错误!',
            showCancel: false
          })
        }
        reject(res)
      },
      fail() {
        wx.hideLoading()
        wx.showModal({
          content: '网络链接错误！',
          showCancel: false
        })
        reject()
      },
      complete() {
      }
    })
  })
}

function requestNoHeader(method, path, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      method,
      url: URI + path,
      data: Object.assign({}, data),
      success(res) {
        const statusCode = res.statusCode
        if (statusCode < 300) {
          return resolve(res)
        }
        wx.hideLoading()
        if (handleMethods.has(statusCode)) {
          const handle = handleMethods.get(statusCode)
          handle(res)
        } else {
          wx.showModal({
            content: '请求错误!',
            showCancel: false
          })
        }
        reject(res)
      },
      fail() {
        wx.hideLoading()
        wx.showModal({
          content: '网络链接错误！',
          showCancel: false
        })
      },
      complete() {
      }
    })
  })
}

function post(path, data) {
  return request('post', path, data)
}


function get(path, data) {
  return request('get', path, data)
}

function put(path, data) {
  return request('put', path, data)
}

function destroy(path, data) {
  return request('delete', path, data)
}

function login(path, data) {
  return requestNoHeader('post', path, data)
}

function resolve (promise) {
  return new Promise(resolve => {
    promise
      .then(resolve)
      .catch(err => console.log(err))
  })
}

export default {
  post,
  get,
  put,
  destroy,
  login,
  resolve,
}

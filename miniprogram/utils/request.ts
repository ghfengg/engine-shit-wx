// utils/request.js

// dev 时用本地，prod 时替换为正式接口
const baseURL = 'http://localhost:8080' 

// prod
// const baseUrl = 'https://engineshit.com'

// 通用请求函数
const request = (url: string, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method: method.toUpperCase(),
      data,
      header: {
        'Content-Type': 'application/json'
      },
      success: res => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(new Error(`请求失败，状态码 ${res.statusCode}`))
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
}

// 简化封装常用方法（可选）
const get = (url:string, data = {}) => request(url, 'GET', data)
const post = (url:string, data = {}) => request(url, 'POST', data)

module.exports = {
  request,
  get,
  post
}

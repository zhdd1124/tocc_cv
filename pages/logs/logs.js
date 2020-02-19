//logs.js
const util = require('../../utils/util.js')

const app = getApp()

Page({
  data: {
    sm_result: ""
  },
  onLoad: function () {
    this.setData({
      // logs: (wx.getStorageSync('logs') || []).map(log => {
      //   return util.formatTime(new Date(log)) + "，扫描结果：" + app.globalData.smres
      // })
      sm_result: "扫描结果：" + app.globalData.smres
    })
  }
})

//index.js
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk = new QQMapWX({
  key: 'MI7BZ-MHDKF-ISLJ7-NLD66-LCLGQ-56BK5' // 必填
});
const util = require('../../utils/util.js')
//获取应用实例
const app = getApp()

Page({
  data: {
    userInfo: {},
    address: "",
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    array: [{
      mode: 'scaleToFill',
      text: 'scaleToFill：不保持纵横比缩放图片，使图片完全适应'
    }],
    src: '../../resources/timg.jpg'
  },

  //事件处理函数
  sm: function () {
   wx.scanCode({
     success(res) {
       console.log(res);
       app.globalData.smres = res.result;
       wx.showToast({
         title: '成功:' + res.result,
         icon: 'success',
         duration: 2000
       })
       wx.navigateTo({
         url: '../logs/logs'
       })
     },
     fail: (res) => {
       console.log(res);
       wx.showToast({
         title: '失败',
         icon: 'none',
         duration: 2000
       })
     }
    //  success : function(res){
    //    console.log(res.result);
    //    app.globalData.motto = res.result;
    //    wx.navigateBack();
    //    wx.onLoad();
    //  }
   })
  },


  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  bindShowPosi: function(){
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        wx.showModal({
          title: '当前位置',
          content: "纬度:" + latitude + ",经度:" + longitude
            + "\n描述：" + addresult

        })


      }
    })
  },

  onReady: function () {
    const _this = this;
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: function (addressRes) {
            const addresult = addressRes.result.address + addressRes.result.formatted_addresses.recommend;
            _this.setData({
              address: "纬度:" + latitude + ",经度:" + longitude
                + "\n描述：" + addresult,
            })

          }
        })
      }
    })
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true        
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true          
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        lang: "zh_CN",
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true           
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
  
})

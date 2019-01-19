// pages/my/my.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "userInfo":{

    },
    "showAuthorizeButton":true
  },

  goto:function(e){
    wx.navigateTo({
      url: e.currentTarget.dataset.href + "/" + e.currentTarget.dataset.href,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 授权验证
    wx.getSetting({
      success:function(res){
        if (res.authSetting['scope.userInfo']){
          // 如果已授权则关闭按钮
          that.setData({
            "showAuthorizeButton": false
          })
          // 并获取头像
          wx.getUserInfo({
            success: function (res) {
              that.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },

  onGotUserInfo(e) {
    let that = this;
    if (e.detail.userInfo){
      this.setData({
        "showAuthorizeButton":false
      })
      wx.getUserInfo({
        success: function (res) {
          that.setData({
            userInfo: res.userInfo
          })
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
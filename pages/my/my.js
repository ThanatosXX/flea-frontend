const app = getApp();
const re = require('../../utils/request.js');
const config = require('../../config.js');

Page({
    data: {
        userInfo: {},
        is_login: false
    },

    onLoad: function (options) {
        app.bindPage(this);
    },

    goto: function (e) {
        if (!wx.getStorageSync('is_bind')) {
            wx.showModal({
                title: '',
                content: '请先绑定信息',
                success: res => {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/my/bind/bind',
                        })
                    }
                },
                fail: res => {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            })
        }
        else {
            const animation = wx.createAnimation({
                duration: 150,
                timingFunction: 'linear',
            })

            this.animation = animation

            animation.scale(1.2, 1.2).step().scale(0.9, 0.9).step().scale(1, 1).step()

            switch (e.currentTarget.dataset.href) {
                case "published":
                    this.setData({
                        animationData1: animation.export()
                    }); break;
                case "trading":
                    this.setData({
                        animationData2: animation.export()
                    }); break;
                case "sold":
                    this.setData({
                        animationData3: animation.export()
                    }); break;
                case "received":
                    this.setData({
                        animationData4: animation.export()
                    }); break;

            }
            wx.navigateTo({
                url: e.currentTarget.dataset.href + "/" + e.currentTarget.dataset.href,
            })
        }
        
    },

    onGotUserInfo(e) {
        let that = this;
        if (e.detail.userInfo) {
            this.setData({
                "showAuthorizeButton": false
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

    login: function (data) {
        wx.login({
            success: res => {
                console.log('获取用户登录凭证：' + res.code);
                // ------ 发送凭证 ------
                re.request({
                    url: config.urls.login,
                    data: {
                        code: res.code
                    },
                    method: 'GET',
                    header: {
                        'content-type': 'application/json'
                    },
                    
                  showLoading: true,
                    success: res => {
                        app.setGlobalData({
                            userInfo: data.detail.userInfo,
                            is_login: res.data.status
                        });
                        wx.setStorageSync("userInfo", data.detail.userInfo)
                    }
                })
            }
        })

    },
  goToAudit: function (e) {
    if (!wx.getStorageSync('is_bind')) {
      wx.showModal({
        title: '',
        content: '请先绑定信息',
        success: res => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/my/bind/bind',
            })
          }
        },
        fail: res => {
          wx.showToast({
            title: '网络异常',
            icon: 'none'
          })
        }
      })
    }
    else {
      wx.navigateTo({
        url: "/pages/my/audit/audit",
      })
    }

  },
    goToCollect: function(e){
        if (!wx.getStorageSync('is_bind')) {
            wx.showModal({
                title: '',
                content: '请先绑定信息',
                success: res => {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/my/bind/bind',
                        })
                    }
                },
                fail: res => {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            })
        }
        else {
            wx.navigateTo({
                url: "/pages/my/collect/collect",
            })
        }
        
    },
    goToRecord: function(e){
        if (!wx.getStorageSync('is_bind')) {
            wx.showModal({
                title: '',
                content: '请先绑定信息',
                success: res => {
                    if (res.confirm) {
                        wx.navigateTo({
                            url: '/pages/my/bind/bind',
                        })
                    }
                },
                fail: res => {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            })
        }
        else {
            wx.navigateTo({
                url: "/pages/my/record/record",
            })
        }
    },
    goToBind: function(e){
        if (!this.data.is_login) {
            wx.showModal({
                title: '',
                content: '请先登录',
                success: res => {
                    if (res.confirm) {
                    }
                },
                fail: res => {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            })
        }
        else {
            wx.navigateTo({
                url: "/pages/my/bind/bind",
            })
        }
       
    },
    goToContactUs: function(e){
        wx.showModal({
            title: '联系我们',
            content: 'QQ:767280528',
        })
    }
})
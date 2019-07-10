// pages/index/com/com.js
const re = require('../../../utils/request.js');
const config = require('../../../config.js');

Page({

    /**
     * 页面的初始数据
     */

    data: {

      agree: '我同意免责条约',
      radioCheck: false,

      // 筛选导航栏数据
      msgList: [
        { key: 1, name: '免责条约' },
        { key: 2, name: '使用说明' },
      ],
      // 判断导航栏列表是否显示

      isShows1: true,
      isShows2: true,

      items:[
        { name: 'QQ', value: 'QQ', checked: true},
        { name: 'weChat', value: '微信' },
        { name: 'phone', value: '手机号码' },
      ]
    },
  
  radio: function (e) {
    this.setData({
      name: e.currentTarget.dataset.name
    })
    console.log(e.currentTarget.dataset.name)
  },
  radioChange: function (e) {
    this.setData({
      contactWay: e.detail.value
    })
    console.log(e.detail.value)
  },
  radioClick: function (event) {
    var radioCheck = this.data.radioCheck;
    this.setData({ "radioCheck": !radioCheck });
  },
    userNameInput: function(e) {
        this.setData({
            userName: e.detail.value
        })
        console.log(this.data.userName)
    },
    userIDInput: function(e) {
        this.setData({
            userID: e.detail.value
        })
        console.log(this.data.userID)
    },
    usernumInput: function(e) {
        this.setData({
            usernum: e.detail.value
        })
        console.log(this.data.usernum)
    },
    userContactInput: function(e){
        this.setData({
            usercontact: e.detail.value 
        })
        console.log(this.data.usercontact)
    },
    submitBtn: function(e) {
        var that = this
      if (that.data.radioCheck) {
        re.request({
            url: config.urls.submitBind,
            data: {
                student_id: this.data.userID,
                password: this.data.usernum,
                name: this.data.userName,
                contact: this.data.contactWay + ":" + this.data.usercontact
            },
            method: "POST",
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data)
                if(res.data.status){
                  
                    wx.showToast({
                        title: '验证成功！',
                        icon: 'success',
                        duration: 3000
                    })
                    wx.setStorageSync('is_bind', 'true')
                    wx.switchTab({
                        url: '/pages/my/my',
                    })
              }
                else{
                    wx.showToast({
                        title: '学号或密码错误！',
                        icon: 'none'
                    })
                }
            },
            fail: function(res){
                console.log(res)
                wx.showToast({
                    title: '服务器繁忙',
                })
            }
        })
      }
      else {
        wx.showToast({
          title: '请同意免责条约！',
          icon: 'none'
        })
      }

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            contactWay: 'QQ'
        })



    },


  menuClick: function (e) {
    // 获取通过wxml  data-hi="{{ idx }}" 传过来的索引
    var menuNum = e.currentTarget.dataset.hi;
    if (menuNum == 0) {
      this.setData({
        isShows1: false,
        isShows2: true,
      })
    }
    else if (menuNum == 1) {
      this.setData({
        isShows2:false,
        isShows1: true,
      })
    }
  },

})


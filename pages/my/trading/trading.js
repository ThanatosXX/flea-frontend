// pages/my/published/published.js
const re = require('../../../utils/request.js')
const config = require('../../../config.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goods_list: []
    },
    remindSolder: function(e){
        wx.showToast({
            title: '提醒发布者成功！',
        })
    },
    goToFinish: function(e){
        let that = this
        wx.showModal({
            title: '',
            content: '确定交换完成？',
            success: res=>{
                if(res.confirm){
                    re.request({
                        url: config.urls.submitFinish,
                        data: {
                            goods_id: e.currentTarget.dataset.id
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: res => {
                            console.log(res)
                            //that.globalData.openid = res.data.openid
                            if (res.data.status) {
                                wx.showToast({
                                    title: '交换完成',
                                    icon: 'success',
                                    duration: 3000
                                })
                                wx.switchTab({
                                    url: '/pages/my/my',
                                })
                            } else {
                                wx.showToast({
                                    title: '服务器繁忙，请稍后再试',
                                    icon: 'none'
                                })
                            }
                        },
                        fail: res => {
                            console.log(res)
                            wx.showToast({
                                title: '网络繁忙，请稍后再试',
                                icon: 'none'
                            })
                        }
                    })
                }
            },
            fail: res=>{
                wx.showToast({
                    title: '网络异常',
                    icon: 'none'
                })
            }
        })
       
    },

    deleteTrading: function(e){
        let that = this
        wx.showModal({
            title: '',
            content: '是否取消本次交换',
            success: res=>{
                if(res.confirm){
                    re.request({
                        url: config.urls.submitDeleteGoods,
                        data: {
                            goods_id: e.currentTarget.dataset.id
                        },
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        success: res => {
                            console.log(res)
                            //that.globalData.openid = res.data.openid
                            if (res.data.status) {
                                wx.showToast({
                                    title: '取消交换成功',
                                    icon: 'success',
                                    duration: 3000
                                })
                                wx.switchTab({
                                    url: '/pages/my/my',
                                })
                            } else {
                                wx.showToast({
                                    title: '服务器繁忙，请稍后再试',
                                    icon: 'none'
                                })
                            }
                        },
                        fail: res => {
                            console.log(res)
                            wx.showToast({
                                title: '网络繁忙，请稍后再试',
                                icon: 'none'
                            })
                        }
                    })
                }
            },
            fail: res=>{
                wx.showToast({
                    title: '网络异常',
                    icon: 'none'
                })
            }
        })
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        re.request({
            url: config.urls.getExchangeGoods,
            data: {},
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
                console.log(res)
                //that.globalData.openid = res.data.openid
                if (res.data.status) {
                    that.setData({
                        goods_list: res.data.goods_list
                    })
                } else {
                    wx.showToast({
                        title: '服务器繁忙，请稍后再试',
                        icon: 'none'
                    })
                }
            },
            fail: res => {
                console.log(res)
                wx.showToast({
                    title: '网络繁忙，请稍后再试',
                    icon: 'none'
                })
            }
        })
    },
    goToDetail: function (e) {
        console.log(e)
        wx.navigateTo({
            url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id + "&history=trading",
        })
    },
    
})
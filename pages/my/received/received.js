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
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this
        re.request({
            url: config.urls.getBuyGoods,
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
            url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id + "&history=received",
        })
    }
})
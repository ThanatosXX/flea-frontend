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
    onLoad: function(options) {
        let that = this
        re.request({
            url: config.urls.getPublishGoods,
            //url: 'http://localhost:8000/flea/get_publish_goods/',
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
    deleteGoods: function(e){
        let that = this
        for (var key in this.data.goods_list){
            if(this.data.goods_list[key].id == e.currentTarget.dataset.id){
                var type = this.data.goods_list[key].type
            }
        }
        if(type == 0){
            wx.showModal({
                title: '',
                content: '确定删除这个物品',
                success: res => {
                    if (res.confirm) {
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
                                        title: '成功删除',
                                        icon: 'success'
                                    })
                                    that.onLoad()
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
                        this.onLoad();
                        console.log(e)
                    }
                    else {
                        console.log(res)
                    }
                },
                fail: res => {
                    console.log(res)
                    wx.showToast({
                        title: '网络错误',
                        icon: 'none'
                    })
                }
            })   
        }
        else {
            wx.showToast({
                title: '该物品正在交换中，不能删除',
                icon: 'none'
            })
        }
    },
    goToDetail: function(e){
        console.log(e)
        wx.navigateTo({
            url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id + "&history=published",
        })
        this.onLoad()
    },
    goToEdit: function (e) {
        wx.navigateTo({
            url: "/pages/my/edit/edit?id=" + e.currentTarget.dataset.id + "&history=trading",
        })
    }
})
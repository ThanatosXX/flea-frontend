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

    again_publish: function(e){
        var data = e.currentTarget.dataset.id
        console.log(data.title, data.content, data.price, data.image)
        let that = this;
        wx.showModal({
            title: '',
            content: '确定发布该物品',
            success: res => {
                if (res.confirm) {
                    re.request({
                        url: config.urls.submitGoods,
                        method: 'POST',
                        header: {
                            'content-type': 'application/x-www-form-urlencoded'
                        },
                        data: {
                            title: data.title,
                            price: data.price,
                            content: data.content,
                            image: data.image
                        },
                        success: (res) => {
                            if (res) {
                                wx.showToast({
                                    title: '发布成功！',
                                    duration: 5000,
                                    success: res => {
                                        setTimeout(() => {
                                            wx.switchTab({
                                                url: '/pages/home/home',
                                            })
                                        }, 3000)

                                    }
                                });
                            }
                            else {
                                wx.showToast({
                                    title: '网络异常',
                                    duration: 1000,
                                    icon: 'none'
                                });
                            }
                        }
                    })
                }
            }
        })
    },

    goToFinish: function (e) {
        let that = this
        wx.showModal({
            title: '',
            content: '确定交换完成？',
            success: res => {
                if (res.confirm) {
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
            fail: res => {
                wx.showToast({
                    title: '网络异常',
                    icon: 'none'
                })
            }
        })

    },

    deleteTrading: function (e) {
        let that = this
        wx.showModal({
            title: '',
            content: '是否取消本次交换',
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
                                    title: '取消交换成功',
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
                }
            },
            fail: res => {
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
            url: config.urls.getSellGoods,
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
            url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id + "&history=sold",
        })
    }
})
var app = getApp()
const re = require('../../../utils/request.js');
const config = require('../../../config.js');
Page({
    data: {
        userInfo: {},
    },
    onLoad: function(option) {
        let that = this;
        re.request({
            url: config.urls.getEditGoods,
            data: {
                goods_id: option.id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
                console.log(res)
                //that.globalData.openid = res.data.openid
                if (res.data.status) {
                    console.log(res.data)
                    that.setData({
                        price: res.data.goods_info.price,
                        title: res.data.goods_info.title,
                        content: res.data.goods_info.content,
                        goods_id: res.data.goods_info.id,
                        image: res.data.goods_info.image
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

    inputPrice: function(e) {
        console.log(e)
        this.setData({
            price: e.detail.value
        })
    },
    inputTitle: function(e) {
        this.setData({
            title: e.detail.value
        })
    },
    inputInformation: function(e) {
        this.setData({
            content: e.detail.value
        })
        console.log(this.data.content)
    },
    saveGoodsInfo: function() {
        let that = this
        wx.showModal({
            title: '',
            content: '是否修改信息',
            success:res=>{
                if(res.confirm){
                    re.request({
                        url: config.urls.submitEditGoods,
                        method: 'POST',
                        data: {
                            price: that.data.price,
                            title: that.data.title,
                            content: that.data.content,
                            goods_id: that.data.goods_id,
                            image: that.data.image
                        },
                        success: function (res) {
                            if (res.data.status) {
                                console.log(res.data)
                                wx.showToast({
                                    title: '修改成功',
                                    icon: 'success',
                                    duration: 3000
                                })
                                wx.switchTab({
                                    url: '/pages/home/home',
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
                    });
                }
            }
        })
        
    },
})
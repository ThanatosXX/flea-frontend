// pages/home/detail/detail.js
const re = require('../../utils/request.js');
const config = require('../../config.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imageLoad: true,
        res_data:{},

        isLike: false,
        isBuy:false,
        
        isIndex: false,
        isSeller: false,
        isTrading_seller: true,
        isTrading_buyer: false,
        isBuyed: false,
        isSold: false,
        // banner
        imgUrls: ["/image/timg.jpg"],
        goods_info:{},
        buyers: [],
        thebuyer: [],
        theseller: [],


        indicatorDots: true, //是否显示面板指示点
        autoplay: true, //是否自动切换
        interval: 3000, //自动切换时间间隔,3s
        duration: 1000, //  滑动动画时长1s

        // 商品详情介绍
        detailImg: [
            "",
            "",
            "",


        ],
    },
    //复制
    copyContact: function(e){
        console.log(e.currentTarget.dataset.name)
        let that = this
        var target = e.currentTarget.dataset.name
        if (target == 'host_info'){
            wx.setClipboardData({
                data: that.data.res_data.host_info.contact,
                success: res=>{
                    wx.showToast({
                        title: '成功复制！',
                    })
                    console.log('成功复制:' + that.data.res_data.host_info.contact)
                },
                fail: res=>{
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            })
        }
        else if (target == 'customer_list') {
            var x
            var target_user_contact
            for (x in that.data.res_data.customer_list){
                if (that.data.res_data.customer_list[x].id == e.currentTarget.dataset.id){
                    target_user_contact = that.data.res_data.customer_list[x].contact
                }
            }
            wx.setClipboardData({
                data: target_user_contact,
                success: res => {
                    wx.showToast({
                        title: '成功复制！',
                    })
                    console.log('成功复制:' + target_user_contact)
                },
                fail: res => {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            })
        }
        else if (target == 'host') {
            wx.setClipboardData({
                data: that.data.res_data.host.contact,
                success: res => {
                    wx.showToast({
                        title: '成功复制！',
                    })
                    console.log('成功复制:' + that.data.res_data.host.contact)
                },
                fail: res => {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            })
        }
        else if (target == 'customer') {
            wx.setClipboardData({
                data: that.data.res_data.customer.contact,
                success: res => {
                    wx.showToast({
                        title: '成功复制！',
                    })
                    console.log('成功复制:' + that.data.res_data.customer.contact)
                },
                fail: res => {
                    wx.showToast({
                        title: '网络异常',
                        icon: 'none'
                    })
                }
            })
        }
    },
    //预览图片
    previewImage: function(e) {
        var current = e.target.dataset.src;

        wx.previewImage({
            current: current, // 当前显示图片的http链接  
            urls: this.data.imgUrls // 需要预览的图片http链接列表  
        })
    },

    // 加入收藏
    addLike(e) {
        let that = this
        re.request({
            url: config.urls.submitCollection,
            data: {
                goods_id: that.data.res_data.goods_info.id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
                console.log(res)
                if (res.data.status) {
                    that.setData({
                        isLike: !this.data.isLike
                    });
                    wx.showToast({
                        title: '收藏成功',
                        icon: 'success',
                        duration: 3000
                    })
                }
                else {
                    wx.showToast({
                        title: '服务器繁忙',
                        icon: 'none'
                    })
                }
            },
            fail: res => {
                console.log(res)
            },
            showLoadding: true
        })
        
    },
    // 立即购买
    immeBuy(e) {
        let that = this
        if(this.data.res_data.goods_info.isPublisher) {
            wx.showToast({
                title: '你是这件物品的拥有者，请求错误',
                icon: 'none'
            })
        }
        else if (that.data.res_data.goods_info.type == 0){
            wx.showModal({
                title: '',
                content: '是否想要',
                success: res => {
                    if (res.confirm) {
                        re.request({
                            url: config.urls.submitWantBuy,
                            data: {
                                goods_id: that.data.res_data.goods_info.id
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: res => {
                                console.log(res)
                                if (res.data.status) {
                                    that.setData({
                                        isBuy: !this.data.isBuy,
                                        isLike:true
                                    });
                                    wx.showToast({
                                        title: '请等待发布者确定, 可在交换记录中查看进度',
                                        icon: 'none',
                                        duration: 4000
                                    });
                                    wx.navigateTo({
                                        url: '/pages/my/collect/collect',
                                    })

                                }
                                else {
                                    wx.showToast({
                                        title: '服务器繁忙',
                                        icon: 'none'
                                    })
                                }
                            },
                            fail: res => {
                                console.log(res)
                            },
                            showLoadding: true
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
        
        else{
            wx.showToast({
                title: '这件物品已经被别人换走了',
                icon: 'none'
            })
        }
    },
    

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        var that = this;
        console.log(options)
        if(options.history == 'published'){
            this.begin_request(config.urls.getPublishGoodsDetail, options.id, 'published')
            that.setData({
                isSeller: true,
                isIndex: false,
                isTrading_seller: false,
                isTrading_buyer: false,
                isBuyed: false,
                isSold: false,
            })
        }
        else if (options.history == 'index'){
            this.begin_request(config.urls.getGoodsDetail, options.id, 'index')
            that.setData({
                isSeller: false,
                isIndex: true,
                isTrading_seller: false,
                isTrading_buyer: false,
                isBuyed: false,
                isSold: false,
            })
        }
        else if (options.history == 'trading') {
            this.begin_request(config.urls.getExchangeGoodsDetail, options.id, 'trading')
            that.setData({
                isSeller: false,
                isIndex: false,
                isBuyed: false,
                isSold: false,
            })
        }
        else if (options.history == 'sold') {
            this.begin_request(config.urls.getExchangeGoodsDetail, options.id, 'sold')
            that.setData({
                isSeller: false,
                isIndex: false,
                isBuyed: false,
                isSold: true,
                isTrading_seller: false,
                isTrading_buyer: false,
            })
        }
        else if (options.history == 'received') {
            this.begin_request(config.urls.getExchangeGoodsDetail, options.id, 'received')
            that.setData({
                isSeller: false,
                isIndex: false,
                isBuyed: true,
                isSold: false,
                isTrading_seller: false,
                isTrading_buyer: false,
            })
        }
    },
    begin_request: function(name, id, history){
        let that = this
        re.request({
            url: name,
            data: {
                goods_id: id
            },
            method: 'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: res => {
                console.log(res)
                if(res.data.status){
                    that.setData({
                        res_data: res.data,
                    })
                    if (res.data.goods_info.image[0] != "" || res.data.goods_info.image[1] != "" || res.data.goods_info.image[2] != ""){
                        var x
                        var imgUrlsArray = new Array()
                        for (x in res.data.goods_info.image){
                            if (res.data.goods_info.image[x] != ""){
                                imgUrlsArray.push(res.data.goods_info.image[x])
                                that.setData({
                                    imgUrls: imgUrlsArray,
                                })
                            }
                        }
                    }
                    if (res.data.customer_list){
                        that.setData({
                            isOnTrading: res.data.goods_info.type,
                            HaveCustomer: res.data.customer_list.length
                        })
                    }
                    else if (res.data.user_type && history =='trading'){
                        if (res.data.user_type == 0){
                            that.setData({
                                isTrading_seller: true,
                                isTrading_buyer: false,
                            })
                        }
                        else if (res.data.user_type == 1) {
                            that.setData({
                                isTrading_seller: false,
                                isTrading_buyer: true,
                            })
                        }
                        
                    }
                    console.log(that.data.res_data)
                    if (that.data.res_data.goods_type == -1){
                        that.setData({
                            isLike: false,
                            isBuy: false
                        })
                    }
                    else if (that.data.res_data.goods_type == 0) {
                        that.setData({
                            isLike: true,
                            isBuy: false
                        })
                    }
                    else if (that.data.res_data.goods_type == 1){
                        that.setData({
                            isLike: false,
                            isBuy: true
                        })
                    }
                    else if (that.data.res_data.goods_type == 2) {
                        that.setData({
                            isLike: true,
                            isBuy: true
                        })
                    }
                }
                else{
                    wx.showToast({
                        title: '服务器繁忙',
                        icon: 'none'
                    })
                }
            },
            fail: res => {
                console.log(res)
            },
            showLoadding: true
        })
    },
    buyAgain: function(e){
        wx.showModal({
            title: '',
            content: '您已经交换过了',
        })
    },
    beginTrading: function(e){
        let that = this
        if (!this.data.isOnTrading){
            wx.showModal({
                title: '',
                content: '是否与这位接受者进行交换',
                success: res => {
                    if (res.confirm) {
                        re.request({
                            url: config.urls.submitExchange,
                            data: {
                                goods_id: that.data.res_data.goods_info.id,
                                user_id: e.currentTarget.dataset.id
                            },
                            method: 'POST',
                            header: {
                                'content-type': 'application/x-www-form-urlencoded'
                            },
                            success: res => {
                                console.log(res)
                                if (res.data.status) {
                                    that.setData({
                                        isOnTrading: true
                                    });
                                    wx.showToast({
                                        title: '开始交换',
                                        icon: 'success',
                                        duration: 2000
                                    });
                                    wx.switchTab({
                                        url: '/pages/my/my',
                                    })
                                }
                                else {
                                    wx.showToast({
                                        title: '服务器繁忙',
                                        icon: 'none'
                                    })
                                }
                            },
                            fail: res => {
                                console.log(res)
                            },
                            showLoadding: true
                        })
                    }
                },
                fail: function (e) {
                    wx.showToast({
                        title: '网络繁忙',
                        icon: 'none'
                    })
                }
            }) 
        }
        else {
            wx.showToast({
                title: '您已经交换了这件物品了',
                icon: 'none'
            })
        }
    }
})
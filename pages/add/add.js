var app = getApp()
const re = require('../../utils/request.js');
const config = require('../../config.js');

Page({

    data: {
        defaultImg: "../../image/defaultImg.png",
        defaultImg1: "../../image/defaultImg.png",
        defaultImg2: "../../image/defaultImg.png",
        // 页面配置  

        title: '',
        price: '',
        content: '',
        iconType: [
            'clear', 'clear', 'clear'
        ],

        winWidth: 0,
        winHeight: 0,

        // tab切换
        currentTab: 0,
    },

    onLoad: function() {
        
        var that = this;
        // 获取系统信息
        wx.getSystemInfo({
            success: function(res) {
                that.setData({
                    winWidth: res.windowWidth,
                    winHeight: res.windowHeight
                });
            }
        });
    },

    // 滑动切换tab

    bindChange: function(e) {
        var that = this;
        that.setData({
            currentTab: e.detail.current
        });
    },

    // nexttab: function (e) {
    //   var that = this;
    //   that.setData({ currentTab: e.detail.current + 1 });
    // },
    // 点击tab切换

    swichNav: function(e) {
        var that = this;
        if (this.data.currentTab <= 2) {
            that.setData({
                currentTab: this.data.currentTab + 1
            })
        } else {
            return false;
        }
    },
    //提交商品数据
    publish: function(e) {
        if (!wx.getStorageSync('is_bind')) {
            wx.showModal({
                title: '',
                content: '请先绑定信息',
                success: res => {
                    if (res.confirm) {
                        wx.switchTab({
                            url: '/pages/my/my',
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
            var that = this;
            console.log(app.globalData.upload_imgs[0])
            console.log(that.data.title)
            console.log(that.data.price)
            console.log(that.data.content)
            if (that.data.title == '' || that.data.price == '' || that.data.content == '') {
                wx.showToast({
                    title: '请填写完整相关物品信息',
                    icon: 'none'
                })
            }
            else {
                wx.showModal({
                    title: '',
                    content: '确定发布该物品',
                    success: res=>{
                        if(res.confirm){
                            re.request({
                                url: config.urls.submitGoods,
                                method: 'POST',
                                header: {
                                    'content-type': 'application/x-www-form-urlencoded'
                                },
                                data: {
                                    title: that.data.title,
                                    price: that.data.price,
                                    content: that.data.content,
                                    image: [
                                        app.globalData.upload_imgs[0],
                                        app.globalData.upload_imgs[1],
                                        app.globalData.upload_imgs[2]
                                    ]
                                },
                                success: (res) => {
                                    if (res) {
                                        wx.showToast({
                                            title: '等待管理员审核',
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
                
            }
        }
        
        
    },

    //输入框
    inputPrice: function(e) {
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
    },



    onShow() {
        //console.log(app.globalData.imgs)
        this.setData({
            defaultImg: app.globalData.imgs,
            defaultImg1: app.globalData.imgs1,
            defaultImg2: app.globalData.imgs2,
        });
        //this.upLoad(app.globalData.imgs)
        //this.upLoad(app.globalData.imgs1)
    },

    cancelChoose: function(e){
        let that = this
        console.log(e.currentTarget.dataset.id)  
        var img_id = e.currentTarget.dataset.id
        if (img_id == 0){
            that.setData({
                defaultImg: "../../image/defaultImg.png",
            });
            app.globalData.upload_imgs[0] = ""
        }
        else if (img_id == 1){
            that.setData({
                defaultImg1: "../../image/defaultImg.png",
            });
            app.globalData.upload_imgs[1] = ""
        }
        else if (img_id == 2){
            that.setData({
                defaultImg2: "../../image/defaultImg.png",
            });
            app.globalData.upload_imgs[2] = ""
        }
    },

    bindChooseType(e) { //选择相机还是相册
        var demo = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                var imgs = app.globalData.imgs;
                console.log(imgs)
                wx.navigateTo({
                    url: "/pages/add/upload/upload?src=" + tempFilePaths
                });
                demo.setData({
                    imgs: imgs
                });
            }
        });
    },


    bindChooseType1(e) { //选择相机还是相册
        var demo = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                var imgs1 = app.globalData.imgs1;
                console.log(imgs1)
                wx.navigateTo({
                    url: "/pages/add/upload/upload1?src=" + tempFilePaths
                });
                demo.setData({
                    imgs1: imgs1
                });
            }
        });
    },

    bindChooseType2(e) { //选择相机还是相册
        var demo = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['camera', 'album'], // 可以指定来源是相册还是相机，默认二者都有
            success: function(res) {
                // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
                var tempFilePaths = res.tempFilePaths;
                var imgs2 = app.globalData.imgs2;
                console.log(imgs2)
                wx.navigateTo({
                    url: "/pages/add/upload/upload2?src=" + tempFilePaths
                });
                demo.setData({
                    imgs2: imgs2
                });
            }
        });
    },



})
var o = function(o) {
        return o && o.__esModule ? o : {
            default: o
        };
    }(require("../../add/weCropper.js")),
    e = wx.getSystemInfoSync(),
    t = e.windowWidth,
    r = e.windowHeight - 50;
var app = getApp();
Page({
    data: {
        cropperOpt: {
            id: "cropper",
            width: t,
            height: r,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (t - 240) / 2,
                y: (r - 180) / 2,
                width: 240,
                height: 180
            }

        }
    },
    touchStart: function(o) {
        this.wecropper.touchStart(o);
    },
    touchMove: function(o) {
        this.wecropper.touchMove(o);
    },
    touchEnd: function(o) {
        this.wecropper.touchEnd(o);
    },
    getCropperImage: function() {
        this.wecropper.getCropperImage(function(o) {
            console.log("这个是什么鬼" + o);
            app.globalData.imgs2 = o; //这个是上传图片的关键，剪裁后的图片，添加到全局图片中
            // wx.switchTab({
            //   url: "/pages/center/center"
            // })
            let timestamp = Date.parse(new Date());
            timestamp = timestamp / 1000;
            console.log("当前时间戳为：" + timestamp);
            wx.uploadFile({
                url: 'https://flea-1257228852.cos.ap-chengdu.myqcloud.com',
                filePath: o,
                name: 'file',
                header: {
                    'Content-Type': 'multipart/form-data',
                    'accept': 'application/json'
                },
                method: 'POST',
                formData: {
                    'time': timestamp,
                    'key': timestamp.toString() + '.jpg',
                },
                success: function(res) {
                    app.globalData.upload_imgs[2] = 'https://flea-1257228852.cos.ap-chengdu.myqcloud.com/' + timestamp.toString() + '.jpg'
                    // var data = res.data
                    // console.log(data)
                    //do something
                    if (res) {
                        wx.showToast({
                            title: '图片上传成功！',
                            duration: 1000
                        });
                    } else {
                        wx.showToast({
                            title: '网络异常',
                            duration: 1000,
                            icon: 'none'
                        });
                    }
                }
            })
            wx.navigateBack({})
        });
    },
    uploadTap: function() {
        var o = this;
        wx.chooseImage({
            count: 1,
            sizeType: ["original", "compressed"],
            sourceType: ['camera', 'album'],
            success: function(e) {
                var t = e.tempFilePaths[0];
                o.wecropper.pushOrign(t);
            }
        });
    },
    onLoad: function(e) {
        var isChoose = e.isChoose;
        this.setData({
            //isChoose: isChoose
        })
        var t = this.data.cropperOpt,
            r = e.src;
        r && (Object.assign(t, {
            src: r
        }), new o.default(t).on("ready", function(o) {
            console.log("wecropper is ready for work!");
        }).on("beforeImageLoad", function(o) {
            console.log("before picture loaded, i can do something"), console.log("current canvas context:", o),
                wx.showToast({
                    title: "上传中",
                    icon: "loading",
                    duration: 2e4
                });
        }).on("imageLoad", function(o) {
            console.log("picture loaded"), console.log("current canvas context:", o), wx.hideToast();
        }));
    }
});
App({
    currentPage: null,

    onLaunch: function () {
        let userInfo = wx.getStorageSync('userInfo');
        this.setGlobalData({
            userInfo: userInfo,
            is_login: userInfo?true:false,
            imgs: '../../image/defaultImg.png',
            imgs1: '../../image/defaultImg.png',
            imgs2: '../../image/defaultImg.png',
            upload_imgs: [
                '','',''
            ]
        })
        wx.getStorage({
            key: 'is_bind',
            success: function(res) {
                if(!res.data){
                    wx.setStorageSync('is_bind', false)
                }
            },
            fail: function(res){
                wx.setStorageSync('is_bind', false)
            }
        })
    },
    globalData: {},

    //如果某个页面要使用全局数据的话，必须在onlaod里调用这个函数
    //这样在每次setGlobalData之后会自动将数据同步到对应页面的data
    //参数就是this
    bindPage: function(page){
        page.setData(this.globalData);
        this.currentPage = page;
    },
    //用法同setData
    //每次调用后都会引起页面重新渲染
    setGlobalData: function(data){
        Object.keys(data).forEach(key=>{
            this.globalData[key] = data[key];
        });
        if(this.currentPage !== null){
            this.currentPage.setData(data);
        }
    }
})

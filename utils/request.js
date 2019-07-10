
/**
 * 调用方式同wx.request
 * 增加参数：
 * showLoadding: boolean, 是否显示loadding加载，默认false
 */
const request = function (obj) {
    //设置cookie缓存
    if(obj.fail){
        var fail = obj.fail;
        obj.fail = function(err){
            if (err.header && err.header['Set-Cookie']){
                wx.setStorageSync('cookie', err.header['Set-Cookie']);
            }
            fail(err);
        };
    }
    else{
        obj.fail = function (err) {
            if (err.header && err.header['Set-Cookie']) {
                wx.setStorageSync('cookie', err.header['Set-Cookie']);
            }
        };
    }
    
    if(obj.success){
        var success = obj.success;
        obj.success = function (res) {
            if (res.header['Set-Cookie']) {
                wx.setStorageSync('cookie', res.header['Set-Cookie']);
            }
            success(res);
        };
    }
    else{
        obj.success = function (res) {
            if (res.header['Set-Cookie']) {
                wx.setStorageSync('cookie', res.header['Set-Cookie']);
            }
        };
    }

    if(obj.complete){
        var complete = obj.complete;
        obj.complete = function(res){
            complete(res);
            if(obj.showLoading){
                wx.hideLoading();
            }
        }
    }
    else{
        obj.complete = function (res) {
            if (obj.showLoading) {
                wx.hideLoading();
            }
        }
    }

    //设置请求头
    if(obj.header){
        obj.header = {
            'Cookie': wx.getStorageSync('cookie'),
            "Content-Type": "application/x-www-form-urlencoded",
            ...obj.header
        };
    }
    else{
        obj.header = {
            'Cookie': wx.getStorageSync('cookie'),
            "Content-Type": "application/x-www-form-urlencoded",
        };
    }

    if(obj.showLoading){
        wx.showLoading({
            title: '加载中',
            mask: true,
        });
    }
    wx.request(obj);
};

module.exports = {
    request: request
};
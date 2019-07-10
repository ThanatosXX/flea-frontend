const app = getApp();
const re = require('../../utils/request.js');
const config = require('../../config.js');

Page({
    data: {
        goods_list: [],
        pageNum: 1,
        showLoading: false,
        showTips: false,
        showTopLoading: false
    },
    onPullDownRefresh: function () {
        wx.showNavigationBarLoading() //在标题栏中显示加载

        //模拟加载
        setTimeout(function () {
            // complete
            wx.hideNavigationBarLoading() //完成停止加载
            wx.stopPullDownRefresh() //停止下拉刷新
        }, 1500);
    },
    resetGoods: function () {
        let that = this
        if (!this.data.showTopLoading) {
            this.setData({
                showTopLoading: true,
            });
            //设置延时，以便显示加载条
            setTimeout(() => {
                that.setData({
                    goods_list: [],
                    pageNum: 1,
                })
                that.getGoodList();
                wx.showToast({
                    title: '刷新成功！',
                })
                that.setData({
                    showTopLoading: false,
                });
            }, 1000) 
        }
    },

    goToDetail: function (e) {
        if(!wx.getStorageSync('is_bind')){
            wx.showModal({
                title: '',
                content: '请先绑定信息',
                success: res=>{
                    if(res.confirm){
                        wx.switchTab({
                            url: '/pages/my/bind/bind',
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
        }
        else{
            console.log(e)
            wx.navigateTo({
                url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id + "&history=index",
            })
        }
    },

    onLoad: function(options) {
        app.bindPage(this);
        this.getGoodList();
    },

    loadGoods: function(){
        //防止重复触发
        if(!this.data.showLoading){
            this.setData({
                showLoading: true
            });
            //设置延时，以便显示加载条
            setTimeout(() => {
                this.getGoodList();
            }, 1000)
        }
    },

    getGoodList: function(){
        let page = this;
        re.request({
            url: config.urls.goodList,
            method: 'POST',
            data: {
                goods_page: page.data.pageNum
            },
            success: res=>{
                console.log(res);
                if(res.data.status===true){
                    let new_goodlist = res.data.goods_list;
                    new_goodlist.reverse();

                    //商品数量为0，直接返回
                    if(new_goodlist.length === 0){
                        page.setData({
                            showLoading: false,
                            showTips: true,
                        });
                        return false;
                    }

                    let old_goodlist = page.data.goods_list;
                    //对最后一个元素做判断，如果是商品则跳过，否则将新的列表的第一个补上去
                    if (old_goodlist.length>0 && old_goodlist[old_goodlist.length-1][1].id < 0){
                        old_goodlist[old_goodlist.length - 1][1].id = new_goodlist.pop();
                    }
                    while(new_goodlist.length !== 0){
                        if(new_goodlist.length >= 2){
                            old_goodlist = old_goodlist.concat([[new_goodlist.pop(), new_goodlist.pop()]]);
                        }
                        else{
                            old_goodlist = old_goodlist.concat([[new_goodlist.pop(), {id:-1}]]);
                        }
                    }

                    page.setData({
                        goods_list: old_goodlist,
                        pageNum: page.data.pageNum+1,
                        showLoading: false,
                    })
                }else{
                    page.setData({
                        showLoading: false,
                        showTips: true,
                    });
                    wx.showToast({
                        title: '请求失败',
                    });
                }
            }
        });
    }
})
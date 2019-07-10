const app = getApp();
const re = require('../../../utils/request.js');
const config = require('../../../config.js');

Page({
    data: {
        goods_list: [],
        pageNum: 1,
        showLoading: false,
        showTips: false
    },

    goToDetail: function (e) {
        console.log(e)
        wx.navigateTo({
            url: "/pages/detail/detail?id=" + e.currentTarget.dataset.id + "&history=index",
        })
    },

    onLoad: function (options) {
        app.bindPage(this);
        this.getGoodList();
    },
    getGoodList: function () {
        let page = this;
        re.request({
            url: config.urls.collectList,
            method: 'POST',
            data: {
            },
            success: res => {
                console.log(res);
                if (res.data.status === true) {
                    let new_goodlist = res.data.goods_list;
                    new_goodlist.reverse();

                    //商品数量为0，直接返回
                    if (new_goodlist.length === 0) {
                        page.setData({
                            showLoading: false,
                            showTips: true
                        });
                        return false;
                    }

                    let old_goodlist = page.data.goods_list;
                    //对最后一个元素做判断，如果是商品则跳过，否则将新的列表的第一个补上去
                    if (old_goodlist.length > 0 && old_goodlist[old_goodlist.length - 1][1].id < 0) {
                        old_goodlist[old_goodlist.length - 1][1].id = new_goodlist.pop();
                    }
                    while (new_goodlist.length !== 0) {
                        if (new_goodlist.length >= 2) {
                            old_goodlist = old_goodlist.concat([[new_goodlist.pop(), new_goodlist.pop()]]);
                        }
                        else {
                            old_goodlist = old_goodlist.concat([[new_goodlist.pop(), { id: -1 }]]);
                        }
                    }

                    page.setData({
                        goods_list: old_goodlist,
                    })
                } else {
                    wx.showToast({
                        title: '请求失败',
                    });
                }
            }
        });
    }
})
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "firstLevelColumn": [
      { "cid": 0, "name": "分类1" },
      { "cid": 1, "name": "分类2" },
      { "cid": 2, "name": "分类3" },
      { "cid": 3, "name": "分类4" },
      { "cid": 4, "name": "分类5" },
      { "cid": 5, "name": "分类6" },
      { "cid": 6, "name": "分类7" },
      { "cid": 7, "name": "分类8" },
      { "cid": 8, "name": "分类9" },
      { "cid": 9, "name": "分类10" },
      { "cid": 10, "name": "分类11" },
      { "cid": 11, "name": "分类12" },
      { "cid": 12, "name": "分类13" },
    ],
    "maxItems":10,
    "nowItem":0,
    "selected":true,
    "imgUrls":[

    ],

  },

  onLoad: function (options) {
      // 获取一级分类栏目,成功后根据items数目修改sidebar最大显示数
      // wx.request({
      //   url: '',
      // })
  },

  onShow: function () {

  },

  categorySidebarItemClick:function(e){
    this.setData({
      "nowItem": e.currentTarget.dataset.id
    })
  },

  getGoods:function(firstLevelColumn){
    // 获取一级分类下的物品列表
    // wx.request({
    //   url: '',
    // })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
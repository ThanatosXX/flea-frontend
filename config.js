const host = 'https://wechat.geebos.cn:80'
//const host = 'http://localhost:8000'
const imageUrl = 'https://flea-1257228852.cos.ap-chengdu.myqcloud.com'
const urls = {
    login: "/flea/get_openid/",
    goodList: "/flea/get_goods_list/",
    collectList: "/flea/get_collect_goods/",
    getEditGoods: "/flea/get_edit_goods/",
    submitEditGoods: "/flea/submit_edit_goods/",
    submitBind: "/flea/submit_bind/",
    getPublishGoods: "/flea/get_publish_goods/",
    submitDeleteGoods: "/flea/submit_delete_goods/",
    submitFinish: "/flea/submit_finish/",
    getBuyGoods: "/flea/get_buy_goods/",
    submitFinish: "/flea/submit_finish/",
    submitDeleteGoods: "/flea/submit_delete_goods/",
    getSellGoods: "/flea/get_sell_goods/",
    getExchangeGoods: "/flea/get_exchange_goods/",
    submitCollection: "/flea/submit_collection/",
    submitWantBuy: "/flea/submit_want_buy/",
    getPublishGoodsDetail: "/flea/get_publish_goods_detail/",
    getGoodsDetail: "/flea/get_goods_detail/",
    getExchangeGoodsDetail: "/flea/get_exchange_goods_detail/",
    submitExchange: "/flea/submit_exchange/",
    getOrder: "/flea/get_order/",
    submitGoods: "/flea/submit_goods/",
    getCheck: "/flea/get_check_goods/",
};

for(let name in urls){
    urls[name] = host + urls[name];
}

module.exports = {
    urls: urls
}
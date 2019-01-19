Page({

    data: {
        actions: [
                {
                width: 100,
                name: '删除',
                background: '#ed3f14',
                color: '#fff',
            },
            {
                name: '取消',
                width: 100,
                color: '#80848f',
                fontsize: '20',
            }
        ],
        message_list: [1, 2, 3, 4, 5, 6, 7],
    },

    onLoad: function(options) {

    },

    change: function(event){
        console.log(event, '222222');
    },

    click: function(event){
        console.log(event);
    },
})
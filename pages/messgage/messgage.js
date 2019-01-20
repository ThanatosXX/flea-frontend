Page({

    data: {
      actions: [
        {
          name: '置顶',
          width: 100,
          color: '#fff',
          fontsize: '20',
          background: "#bbb",
        },
        {
          name: '标为未读',
          width: 100,
          color: '#fff',
          background: "#E6A23C",
          fontsize: '20',
        },
        {
          width: 100,
          name: '删除',
          background: '#ed3f14',
          color: '#fff',
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
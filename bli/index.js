// �����Ѿ�Ĭ��cdn������vue-seamless-scroll���
// https://chenxuan0000.github.io/vue-seamless-scroll/zh/guide/01-basic.html
new Vue({
  el: "#myBli", // el��Ҫ���������id_name��Ӧ����html: ''���div��id
  data: function () {
    return {
      content: [],
      listData: [1, 2, 3, 4, 5, 6],
      classOption: {
        limitMoveNum: 2,
        direction: 3,
      },
    };
  },
  methods: {},
});
// �����任�ֲ���ʽ�ȣ����׵Ļ������Կ���� https://github.surmon.me/vue-awesome-swiper/
// ��Ȼ��Ҳ��������jquery����������Ե�, ��ֻ���ֲ�ͼ��������ЧҲ����
new Vue({
  el: "#mySwiper",
  data: function () {
    return {
      swiperOption: {
        direction: "vertical", // ��������ŵ�
        slidesPerView: 1,
        spaceBetween: 30,
        mousewheel: true,
        // ע��������ĸ�����ˮƽ�����ֲ�
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        // ע�͵��������������ʾС���
        loop: true, // ѭ��
        autoplay: {
          delay: 2500,
          disableOnInteraction: false,
        }, // �Զ�����,ע�͵����Զ�����
        on: {
          init: function () {
            swiperAnimateCache(this); //���ض���Ԫ��
            swiperAnimate(this); //��ʼ����ɿ�ʼ����
          },
          slideChangeTransitionEnd: function () {
            swiperAnimate(this); //ÿ��slide�л�����ʱҲ���е�ǰslide����
          },
        },
        // or data-swiper-parallax="-100"
        // ���������ֶ���Ч����ע����ȡ�����ֶ���������Ч���μ� https://www.swiper.com.cn/usage/animate/index.html
      },
    };
  },
  computed: {
    swiper() {
      return this.$refs.myswiper.$swiper;
    },
  },
  methods: {
    // �������ֹͣ�ֲ�
    stopAutoPlay() {
      this.swiperOption.autoplay && this.swiper.autoplay.stop();
    },
    // ����Ƴ���ʼ�ֲ�
    startAutoPlay() {
      this.swiperOption.autoplay && this.swiper.autoplay.start();
    },
  },
});
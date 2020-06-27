<template>
  <div id="swiper">
    <div class="swiper-content" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <ul class="swiper-list" :style="setTotalWidth" @transitionend="checkPosition">
        <li class="swiper-item" v-for="item in banners">
          <a :href="item.link">
            <img :src="item.image" alt="">
          </a>
        </li>
      </ul>
    </div>
    <div class="indicator" v-if="itemCount>1">
      <div class="indi-item" 
        v-for="(item, index) in originBanners" 
        :key="index" 
        :class="{active: index === currentIndex}">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Swiper',
  props: {
    banners: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      itemCount: 0,  // 记录初始banner数量
      bannerWidth: 0, // 记录每个banner的宽度
      currentIndex: 0, // 记录当前swiper中的banner序号 
      swiperListStyle: {},
      originBanners: [],  // 记录初始banner
      timer: null,
      moveStart: null,  // 记录点击初始位置
      dis: null,        // 轮播图被移动的距离
      moveFlag: false,  // 判断轮播图被触屏后是否产生移动
    }
  },
  methods: {
    /**
     * 处理传入的banner数据
     */
    handleBanners: function() {
      // 获取banner总数
      this.itemCount = this.banners.length;
      
      // 处理传入的banner数据，若banner数大于1，则克隆第一张插入尾部，克隆最后一场插入头部
      if(this.itemCount > 1) {
        this.banners.splice(this.itemCount, 0, this.banners[0]);
        this.banners.splice(0, 0, this.banners[this.itemCount - 1]);
        this.originBanners = this.banners.slice(1, this.itemCount + 1);
      }
    },

    /**
     * 设置timer,开始循环轮播
     */
    startTimer: function() {
      // 定时轮播，移动位置为当前index * banner宽度
      this.timer = setInterval(() => {
        this.currentIndex++;
        this.slideBanner(-this.currentIndex * this.bannerWidth, true);
      }, 3000);
    },

    /**
     *  关闭timer 
     */
    stopTimer: function() {
      clearInterval(this.timer);
    },

    /**
     * DOM操作以实现轮播图轮播
     */
    handleDom: function() {
      this.stopTimer();
      let swiper = document.querySelector(".swiper-content");
      let swiperList = document.querySelector(".swiper-list");
      let swiperItem = document.querySelectorAll(".swiper-item");
      
      // 获取banner宽度和swiperList的style
      this.bannerWidth = swiper.offsetWidth;
      this.swiperListStyle = swiperList.style;

      this.startTimer();
    },

    /**
     * 移动轮播图
     */
    slideBanner: function(translateX, flag) {
      this.setTransition(flag);
      this.swiperListStyle.transform = `translateX(${translateX}px)`;
    },

    /**
     * 检查轮播图是否播放到最后一张图
     */
    checkPosition: function() {
      if(this.currentIndex > this.itemCount - 1) {
        this.currentIndex = 0;
        this.slideBanner(-this.currentIndex * this.bannerWidth, false);
      } else if(this.currentIndex < 0) {
        this.currentIndex = this.itemCount - 1;
        this.slideBanner(-this.currentIndex * this.bannerWidth, false);
      }
    },

    /**
     * flag为true时，开启transition过渡动画，为false时，关闭transition
     */
    setTransition: function(flag) {
      if(flag) {
        this.swiperListStyle.transition = "all .3s";
      } else {
        this.swiperListStyle.transition = "none";
      }
    },

    /**
     * 用户触碰轮播图，停止轮播图自动切换
     */
    touchStart: function(e) {
      this.stopTimer();
      this.moveStart = e.targetTouches[0].pageX;
    },

    /**
     * 移动轮播图，并记录轮播图被移动的距离
     */
    touchMove: function(e) {
      this.moveFlag = true;
      let move = e.targetTouches[0].pageX;
      this.dis = move - this.moveStart;
      let translateX = -this.currentIndex * this.bannerWidth + this.dis;
      this.slideBanner(translateX, false);
    },

    /**
     * 手指离开屏幕后，判断轮播图移动位置是否满足切换下(上)一张，
     * 不满足则回到原图，满足则切换
     */
    touchEnd: function() {
      if(this.moveFlag) {
        this.moveFlag = false;
        if(Math.abs(this.dis) > 50) {
          if(this.dis > 0) {
            this.currentIndex--;
          } else {
            this.currentIndex++;
          }
        }
        this.slideBanner(-this.currentIndex * this.bannerWidth, true);
        this.resetTouchPara();
        this.startTimer();
      }
      
    },

    /**
     * 重置移动轮播图操作的参数
     */
    resetTouchPara: function() {
      this.moveStart = null;
      this.dis = null;
    }
  },
  computed: {
    /**
     * 计算swiper-list所需总宽度
     */
    setTotalWidth: function() {
      this.handleBanners();
      return {width: (this.itemCount + 2) * 100 + "%"};
    },
    
  },
  mounted: function() {
    // setTimeout(() => {
    //   this.handleDom();
    // }, 500);
    this.handleDom();
  }
  
}
</script>

<style scoped>
  #swiper {
    position: relative;
  }

  .swiper-content {
    position: relative;
    width: 100vw;
    overflow: hidden;
  }

  .swiper-list {
    margin-left: -100%;
  }

  .swiper-item {
    float: left;
  }

  .swiper-item img {
    width: 100vw;
  }

  .indicator {
    position: absolute;
    bottom: 10px;
    left: 50%;
    transform: translateX(-50%);
  }

  .indi-item {
    float: left;
    width: 5px;
    height: 5px;
    margin: 0 3px;
    border-radius: 2.5px;
    background-color: #fff;
    transition: all .2s;
  }

  .indi-item.active {
    width: 15px;
  }
</style>
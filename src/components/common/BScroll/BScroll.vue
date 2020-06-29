<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll';

export default {
  name: 'BScroll',
  data() {
    return {
      scroll: null,
    }
  },
  props: {
    probType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted: function() {
    this.scroll = new BScroll(this.$refs.wrapper, {
      probType: this.probType,
      click: true,
      pullUpLoad: this.pullUpLoad,
    });

    this.scroll.on('scroll', (pos) => {
      this.$emit('scroll', pos);
    });

    this.scroll.on('pullingUp', () => {
      // console.log("加载");
      // this.scroll.finishPullUp();
      this.$emit('pullingUp');
    });
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    }
  }
}
</script>

<style scoped>
  .wrapper {
    height: calc(100% - 44px - 49px);
    overflow: hidden;
  }
</style>
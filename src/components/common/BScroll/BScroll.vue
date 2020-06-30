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
      click: true,
      probType: this.probType,
      pullUpLoad: this.pullUpLoad,
    });

    if(this.probType == 2 || this.probType == 3) {
      this.scroll.on('scroll', (pos) => {
        this.$emit('scroll', pos);
      });
    }

    if(this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('loadMore');
      });
    }
  },
  methods: {
    scrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
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
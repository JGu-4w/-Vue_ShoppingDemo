<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
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
    probeType: {
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
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });

    if(this.probeType == 2 || this.probeType == 3) {
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
    myScrollTo(x, y, time=500) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    myRefresh() {
      this.scroll && this.scroll.refresh();
    },
    myFinishPullUp() {
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
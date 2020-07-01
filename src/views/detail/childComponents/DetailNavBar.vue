<template>
  <div id="detail-nav-bar">
    <nav-bar>
      <template v-slot:left>
        <div class="back" @click="back">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template v-slot:center>
        <div class="title">
          <div v-for="(item, index) in title" :key="index" :class="{active: currentIndex === index}">{{item}}</div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';

export default {
  name: 'DetailNavBar',
  components: {
    NavBar,
  },
  data() {
    return {
      title: ['商品','参数','评论','推荐'],
      currentIndex: 0,
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
  #detail-nav-bar {
    position: relative;
  }

  .title {
    display: flex;
    font-size: 13px;
  }

  .title div {
    flex: 1;
  }

  .back img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
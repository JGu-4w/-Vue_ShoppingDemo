<template>
  <div class="back-to-top">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'BackToTop'
}
</script>

<style scoped>
  .back-to-top {
    position: fixed;
    bottom: 60px;
    right: 14px;
  }

  .back-to-top img {
    width: 43px;
    height: 43px;
  }
</style>
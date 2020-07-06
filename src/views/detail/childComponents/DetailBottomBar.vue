<template>
  <div id="detail-bottom-bar">
    <div class="bar-left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>
      </div>
      <div>
        <i class="icon collect"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bar-right">
      <div class="add-to-cart" @click="add">加入购物车</div>
      <div class="pay">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    add() {
      this.$emit('addToCart');
    }
  }
}
</script>

<style scoped>
  #detail-bottom-bar {
    background-color: #fff;
    height: 49px;
    position: fixed;
    left: 0;
    right: 0;
    display: flex;
    text-align: center;
  }

  .bar-left, .bar-right {
    flex: 1;
    display: flex;
  }

  .bar-left>div, .bar-right>div {
    flex: 1;
  }

  .bar-left {
    font-size: 12px;
  }

  .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 7px auto 3px;
    background: url('~assets/img/detail/detail_bottom.png') 0 0/100%;
  }

  .service {
    background-position: 0 -53px;
  }

  .collect {
    background-position: 0 0;
  }

  .shop {
    background-position: 0 -98px;
  }

  .bar-right {
    line-height: 49px;
    font-size: 13px;
  }

  .add-to-cart {
    background-color: #ffe817;
  }

  .pay {
    color: #fff;
    background-color: #f69;
  }
</style>
<template>
  <div id="cart-list">
    <div class="shop-list" v-for="(list, index) in $store.state.cartList" :key="index">
      <div class="shop">
        <div class="select select-all"></div>
        <span>{{list.shopName}}</span>
      </div>
      <div class="cart-item" v-for="(item, indey) in list.productList" :key="indey">
        <div class="select select-single"></div>
        <img :src="item.productImg" alt="">
        <span class="title">{{item.title}}</span>
        <div class="type">
          <span>{{item.style}}</span>
          <span>{{item.size}}</span>
        </div>
        <span class="price">￥{{item.productPrice}}</span>
        <div class="counter">
          <span class="dec">-</span>
          <span class="count">{{item.qty}}</span>
          <span class="inc">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CartList',
}
</script>

<style scoped>
  .shop-list {
    width: 95vw;
    margin: 10px auto;
    border: 1px solid #f6f6f6;
    background-color: #fff;
    border-radius: 5px;
    padding: 8px;
  }

  .shop {
    position: relative;
    font-size: 14px;
    font-weight: 700;
    height: 30px;
    line-height: 30px;
  }

  .select {
    display: inline-block;
    position: relative;
    top: 4px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    border: 1px solid #ccc;
    margin-right: 18px;
  }

  .shop span::before {
    content: '';
    display: inline-block;
    position: relative;
    top: 3px;
    width: 16px;
    height: 16px;
    background: url("~assets/img/common/shop.svg") 0 0/16px 16px;
    margin-right: 5px;
  }

  .shop span::after {
    content: '';
    display: inline-block;
    position: relative;
    top: -1px;
    width: 7px;
    height: 7px;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
    transform: rotate(45deg);
    margin-left: 5px;
  }

  .cart-item {
    position: relative;
    margin: 10px 0;
  }

  .select-single {
    top: -25px;
  }

  .cart-item img {
    width: 66px;
    height: 70px;
    border-radius: 5px;
  }

  .cart-item .title {
    position: absolute;
    display: inline-block;
    width: 60vw;
    padding: 5px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .cart-item .type {
    font-size: 12px;
    color: #ccc;
    position: absolute;
    left: 106px;
    top: 30px;
  }

  .cart-item .price {
    color: var(--color-high-text);
    margin-left: 5px;
  }

  .counter {
    position: absolute;
    bottom: 0;
    right: 20px;
    text-align: center;
    font-size: 13px;
  }

  .counter .dec, .counter .inc, .counter .count {
    display: inline-block;
    width: 18px;
    height: 18px;
    margin-right: 3px;
    background-color: #f6f6f6;
  }

  .counter .disable {
    color: #e7e7e7;
    background-color: #fafafa;
  }
</style>
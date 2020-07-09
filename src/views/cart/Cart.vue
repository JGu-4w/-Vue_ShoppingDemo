<template>
  <div id="cart">
    <nav-bar class="cart-nav">
      <template v-slot:center>
        购物车
      </template>
    </nav-bar>
    <cart-list></cart-list>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import CartList from './childComponents/CartList';
export default {
  name: 'cart',
  components: {
    CartList,
    NavBar,
  }
}
</script>

<style>
  #cart {
    height: 100vh;
    background-color: #f6f6f6;
  }

  .cart-nav {
    position: relative;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
  }
</style>
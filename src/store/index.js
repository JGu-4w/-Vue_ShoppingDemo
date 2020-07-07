import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartList: [],
  },
  actions: {

  },
  mutations: {
    addToCart(state, payload) {
      // 查找cartList是否存在对应商品
      let hasShop = state.cartList.find(item => item.shopId === payload.shopId);

      if(hasShop) {
        // cartList中已有相同店铺，判断商品sku是否相等
        let product = hasShop.productList.find(item => item.skuId === payload.productList[0].skuId);
        if(product) {
          // cartList中已有相同店铺的同种商品，数量相加
          product.qty += payload.productList[0].qty;
        } else {
          // cartList中有相同店铺但是没有同种商品，将商品添加到对应店铺的productList中
          hasShop.productList.push(payload.productList[0]);
        }
      } else {
        // 不存在对应店铺，将整个payload加入cartList中
        this.state.cartList.push(payload);
      }
    }
  }
})
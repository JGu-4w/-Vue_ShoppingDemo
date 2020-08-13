import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartList: [],
  },
  mutations: {
    addCount(state, payload) {
      payload.product.qty += payload.qty;
    },
    addSameStoreProduct(state, payload) {
      payload.store.productList.push(payload.product);
    },
    addNewStoreProduct(state, payload) {
      state.cartList.push(payload);
    }
  },
  actions: {
    addToCart(context, payload) {
      return new Promise((resolve, reject) => {
        // 查找cartList是否存在对应商品
        let hasShop = context.state.cartList.find(item => item.shopId === payload.shopId);
        
        if(hasShop) {
          // cartList中已有相同店铺，判断商品sku是否相等
          let product = hasShop.productList.find(item => item.skuId === payload.productList[0].skuId);
          if(product) {
            // cartList中已有相同店铺的同种商品，数量相加
            context.commit('addCount', {"product": product, "qty": payload.productList[0].qty});
            resolve("商品数量已添加");
          } else {
            // cartList中有相同店铺但是没有同种商品，将商品添加到对应店铺的productList中
            context.commit('addSameStoreProduct', {"store": hasShop, "product": payload.productList[0]});
            resolve("店铺商品已添加");
          }
        } else {
          // 不存在对应店铺，将整个payload加入cartList中
          context.commit('addNewStoreProduct', payload);
          resolve("新商品已添加");
        }
      });
    },
  }
})
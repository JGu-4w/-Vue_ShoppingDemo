<template>
  <div class="product-list">
    <product-list-item v-for="item in productList" :key="item.iid" :productItem="item"></product-list-item>
  </div>
</template>

<script>
import ProductListItem from './ProductListItem';
export default {
  name: 'ProductList',
  components: {
    ProductListItem,
  },
  props: {
    productList: {
      type: Object,
      default() {
        return {};
      }
    }
  }
}
</script>

<style scoped>
  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }
</style>
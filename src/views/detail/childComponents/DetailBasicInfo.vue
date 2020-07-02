<template>
  <div id="detail-product-info" v-if="Object.keys(product).length !== 0">
    <div class="product-intro">
      <p>{{product.title}}</p>
      <div class="product-price">
        <span class="price">{{'￥' + product.price}}</span>
        <span class="old-price">{{'￥' + product.oldPrice}}</span>
        <span class="discount" 
              :style="{'background-color': product.discountBgColor}"
              v-if="product.discountDesc">{{product.discountDesc}}</span>
      </div>
    </div>
    <div class="columns">
      <span>{{product.columns[0]}}</span>
      <span>{{product.columns[1]}}</span>
      <span>{{product.services[product.services.length - 1].name}}</span>
    </div>
    <div class="services">
      <div v-for="index in product.services.length - 1"  :key="index">
        <img :src="product.services[index - 1].icon" alt="" v-if="product.services[index - 1].icon">
        <span>{{product.services[index - 1].name}}</span>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'DetailProductInfo',
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
}
</script>

<style scoped>
  #detail-product-info {
    margin: 10px;
    background-color: #fff;
  }

  .product-intro p {
    font-weight: 700;
    margin-bottom: 10px;
  }

  .product-price {
    position: relative;
    margin-bottom: 20px;
  }

  .price {
    font-size: 20px;
    color: var(--color-high-text);
    margin-right: 6px;
  }

  .old-price {
    font-size: 12px;
    text-decoration: line-through;
    color: #adadad;
    margin-right: 6px;
  }

  .discount {
    position: absolute;
    top: 0;
    height: 14px;
    font-size: 12px;
    text-align: center;
    color: #fff;
    border-radius: 5px;
    padding: 0 2px;
  }

  .columns {
    text-align: center;
    height: 24px;
    line-height: 20px;
    border-bottom: 2px solid #f6f6f6;
    font-size: 13px;
    color: #a1a1a1
  }

  .columns span:first-child {
    float: left;
  }

  .columns span:last-child {
    float: right;
  }

  .services {
    position: relative;
    font-size: 12px;
    height: 32px;
    line-height: 32px;
    margin: 10px 0;
    text-align: center;
    display: flex;
    justify-content: space-between;
  }

  .services img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
  }

  .services div {
    /* flex: 1; */
  }

  .services div span {
    padding-left: 12px;
  }
</style>
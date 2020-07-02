<template>
  <div id="detail-shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="shop-name">
      <img :src="shop.shopLogo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-summary">
      <div class="sell">
        <p>{{shop.sells | sellsFilter}}</p>
        <p>总销量</p>
      </div>
      <div class="total-products">
        <p>{{shop.goods}}</p>
        <p>全部宝贝</p>
      </div>
      <div class="shop-scores">
        <div v-for="(score, index) in shop.score" :key="index">
          <span>{{score.name}}</span>
          <span :style="[score.isBetter ? {color: 'rgb(243, 33, 33)'} : {color: 'rgb(5, 192, 77)'}]">{{score.score}}</span>
          <span v-if="score.isBetter" class="higher">高</span>
          <span v-else class="lower">低</span>
        </div>
      </div>
    </div>
    <div class="to-shop">
      <a :href="shop.shopUrl">
        <span>进店逛逛</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellsFilter: function(sells) {
      if(sells < 10000) return sells;
      return (sells / 10000).toFixed(1) + "万"; 
    }
  },
}
</script>

<style scoped>
  #detail-shop-info {
    border-top: 3px solid #f6f6f6;
    border-bottom: 3px solid #f6f6f6;
    background-color: #fff;
  }

  .shop-name {
    position: relative;
    height: 50px;
    line-height: 50px;
    margin: 5px 10px;
  }

  .shop-name img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }

  .shop-name span {
    display: inline-block;
    height: 50px;
    margin-left: 48px;
    font-size: 14px;
  }

  .shop-summary {
    position: relative;
    height: 60px;
    margin: 0 10px;
    font-size: 12px;
  }

  .shop-summary p {
    margin: 3px 0;
  }

  .sell, .total-products, .shop-scores {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  .sell {
    left: 20px;
  }

  .sell p:first-child, .total-products p:first-child {
    font-size: 16px;
    text-align: center;
  }

  .total-products {
    left: 90px;
    border-right: 1px solid #ccc;
    padding-right: 16px;
  }

  .shop-scores {
    right: 20px;
  }
  .shop-scores>div {
    margin: 6px 0;
  }

  .shop-scores span {
    margin-right: 5px;
  }

  .lower {
    background-color: rgb(5, 192, 77);
    color: #fff;
    font-size: 10px;
    padding: 1px;
    float: right;
  }

  .higher {
    background-color: rgb(243, 33, 33);
    color: #fff;
    font-size: 10px;
    padding: 1px;
    float: right;
  }

  .to-shop {
    position: relative;
    left: 50%;
    transform: translateX(-50%);
    width: 120px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    font-size: 13px;
    background-color: #f3f3f3;
    border-radius: 10px;
    margin: 20px 0;
  }
</style>
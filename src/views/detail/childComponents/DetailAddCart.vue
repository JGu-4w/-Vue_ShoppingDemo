<template>
  <div id="detail-add-cart" 
    v-show="showAddCart" 
    v-if="Object.keys(cartProductInfo).length !== 0" 
    @touchmove.prevent="" @mousewheel.prevent="">
      <div class="cover" @click="clickBlur"></div>
      <div class="cart">
        <img class="close" src="~assets/img/common/close.svg" alt="" @click="closePage">
        <div class="product-info">
          <div class="product-img">
            <img :src="cartProductInfo.skus[0].img" alt="" v-if="selectColor===-1">
            <img :src="cartProductInfo.skus[selectColor * cartProductInfo.options[1].list.length].img" alt="" v-else>
          </div>
          <template v-if="selectSize !== -1 && selectColor !== -1">
            <div class="product-desc">
              <div class="price">
                <span>￥{{cartProductInfo.skus[selectItem].nowprice / 100}}</span>
              </div>
              <div class="stock">
                <span>库存 {{cartProductInfo.skus[selectItem].stock}} 件</span>
              </div>
              <div class="selected">
                <span>已选择</span>
                <span>"{{cartProductInfo.options[0].list[selectColor].name}}"</span>
                <span>"{{cartProductInfo.options[1].list[selectSize].name}}"</span>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="product-desc">
              <div class="price">
                <span>{{cartProductInfo.defaultPrice}}</span>
              </div>
              <div class="stock">
                <span>库存 {{cartProductInfo.totalStock}} 件</span>
              </div>
              <div class="selected">
                <span>请选择</span>
                <span v-if="selectSize === -1">尺码</span>
                <span v-if="selectColor === -1">颜色</span>
              </div>
            </div>
          </template>
        </div>
        <Scroll class="content">
          <div>
            <div class="product-params">
              <div class="product-options" v-for="(item, index) in cartProductInfo.options" :key="index">
                <span>{{item.label}}</span>
                <div class="option" >
                  <span v-for="(i, indey) in item.list" 
                        :key="indey" 
                        :class="{'user-select': checkSelect(index, indey)}"
                        @click="optionClick(index, indey)">
                        {{i.name}}
                  </span>
                </div>
              </div>
            </div>
            <div class="quantity">
              <span>购买数量</span>
              <div class="counter">
                <span class="dec" :class="{disable: checkDec}" @click="decCount">-</span>
                <span class="count">{{qty}}</span>
                <span class="inc" :class="{disable: checkInc}" @click="incCount">+</span>
              </div>
            </div>
          </div>
        </Scroll>
        <div class="submit" @click="toCart">
          <span>确定</span>
        </div>
      </div>
  </div>
</template>

<script>
import Scroll from 'components/common/BScroll/BScroll';

export default {
  name: 'DetailAddCart',
  components: {
    Scroll,
  },
  data() {
    return {
      showAddCart: true,
      selectSize: -1,
      selectColor: -1,
      qty: 1,
    }
  },
  props: {
    cartProductInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    productTitle: {
      type: String,
      default: null,
    },
  },
  methods: {
    clickBlur() {
      this.showAddCart = false;
    },
    closePage() {
      this.showAddCart = false;
    },
    /**
     * 判断选项是是否被用户选择
     */
    checkSelect(index, indey) {
      if(index === 0) {
        return this.selectColor === indey;
      } else if(index === 1) {
        return this.selectSize === indey;
      }
    },
    /**
     * 获取用户选择的商品参数
     */
    optionClick(index, indey) {

      if(index === 0) {
        if(this.selectColor == -1 || this.selectColor !== indey) {
          this.selectColor = indey;
        } else {
          this.selectColor = -1;
        }
      } else if(index === 1) {
        if(this.selectSize == -1 || this.selectSize !== indey) {
          this.selectSize = indey;
        } else {
          this.selectSize = -1;
        }
      }
    },
    /**
     * 获取
     */
    itemStock() {
      if(this.selectColor === -1  || this.selectSize === -1) {
        return this.cartProductInfo.totalStock;
      } else {        
        return this.cartProductInfo.skus[this.selectItem].stock;
      }
    },
    decCount() {
      if(this.qty > 1) {
        this.qty--;
      }
    },
    incCount() {
      if(this.qty <= this.itemStock()) {
        this.qty++;
      }
    },
    /**
     * 将所选择的商品及参数放入购物车
     */
    toCart() {
      if(this.selectColor !== -1 && this.selectSize !== -1) {
        let sku = this.cartProductInfo.skus[this.selectItem];
        let img = sku.img;
        let price = sku.nowprice / 100;
        let skuId = sku.xdSkuId;
        let style = sku.style;
        let size = sku.size;

        let cartList = {
          shopId: this.cartProductInfo.shopId,
          shopName: this.cartProductInfo.shopName,
          productList: [{
            skuId: skuId,
            title: this.productTitle,
            productImg: img,
            productPrice: price,
            style: style,
            size: size,
            qty: this.qty,
          }]
        };
        this.$store.commit('addToCart', cartList);
      }
      
    }
  },
  computed: {
    selectItem() {
      return this.selectColor * this.cartProductInfo.options[1].list.length + this.selectSize;
    },
    checkQty() {
      if(this.selectColor !== -1  && this.selectColor !== -1) {
        if(this.qty > this.cartProductInfo.skus[this.selectItem].stock) {
          this.qty = this.cartProductInfo.skus[this.selectItem].stock;
        }
      }
    },
    checkInc() {
      return this.qty > this.itemStock();
    },
    checkDec() {
      return this.qty <= 1;
    },
  }
}
</script>

<style scoped>
  #detail-add-cart {
    position: relative;
    width: 100vw;
    height: calc(100vh + 49px);
    top: -100%;
    z-index: 10;
    flex-direction: column;
  }

  .cover {
    width: 100vw;
    height: 100%;
    background-color: rgba(0, 0, 0, .4);
  }

  .cart {
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 75%;
    background-color: #fff;
    border-radius: 16px 16px 0 0;
  }
  
  .cart .close {
    position: absolute;
    right: 12px;
    top: 10px;
    width: 20px;
    height: 20px;
    z-index: 2;
  }

  .product-info {
    position: relative;
    margin: 14px 14px 10px;
  }

  .product-img img {
    width: 88px;
    height: 100px;
    border-radius: 5px;
  }

  .product-desc {
    position: absolute;
    left: 40%;
    top: 50%;
    transform: translateY(-50%);
  }

  .product-desc .price {
    font-size: 16px;
    color: var(--color-high-text);
    margin: 5px 0;
  }

  .product-desc .stock {
    font-size: 13px;
    color: #aaa;
    margin: 5px 0;
  }

  .product-desc .selected {
    font-size: 13px;
  }

  .selected span {
    margin-right: 5px;
    margin-top: 5px;
  }

  .content {
    height: calc(75% - 40px - 50px);
  }

  .product-params {
    margin: 0 14px;
  }

  .product-options {
    padding: 10px 0;
    border-bottom: 1px solid #eee;
  }

  .product-options>span {
    font-size: 14px;
  }

  .option .user-select {
    border-color: var(--color-high-text);
  }

  .option {
    display: flex;
    flex-wrap: wrap;
    font-size: 13px;
    margin-top: 10px;
  }

  .option span {
    margin: 4px 5px;
    padding: 5px 8px;
    background-color: #f6f6f6;
    border-radius: 3px;
    border: 1px solid transparent;
  }

  .quantity {
    position: relative;
    margin: 10px 10px 20px;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
  }

  .counter {
    position: absolute;
    top: 0;
    right: 20px;
    text-align: center;
    line-height: 30px;
  }

  .counter .dec, .counter .inc, .counter .count {
    display: inline-block;
    width: 30px;
    height: 30px;
    margin-right: 3px;
    background-color: #f6f6f6;
  }

  .counter .disable {
    color: #e7e7e7;
    background-color: #fafafa;
  }

  .submit {
    position: fixed;
    bottom: 10px;
    width: 100vw;
    background-color: #fff;
    height: 40px;
    line-height: 40px;
  }

  .submit span {
    display: block;
    bottom: 10px;
    width: 90%;
    margin: 0 auto;
    text-align: center;
    border-radius: 30px;
    font-size: 14px;
    color: #fff;
    background-image: linear-gradient(135deg, #fcb5c2, #ff5777);
  }
</style>
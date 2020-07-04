import { request } from './request';
export { getProductDetail, 
         getRecommend, 
         ProductInfo, 
         ShopInfo, 
         DetailInfo, 
         ProductParams, 
         CommentInfo };

function getProductDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid: iid,
    }
  });
}

function getRecommend() {
  return request({
    url: '/recommend',
  })
}

class ProductInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title;
    this.discountDesc = itemInfo.discountDesc;
    this.discountBgColor = itemInfo.discountBgColor;
    this.oldPrice = itemInfo.lowPrice;
    this.price = itemInfo.lowNowPrice;
    this.services = services;
    this.columns = columns;
  }
}

class ShopInfo {
  constructor(shopInfo) {
    this.name = shopInfo.name;
    this.shopLogo = shopInfo.shopLogo;
    this.sells = shopInfo.cSells;
    this.goods = shopInfo.cGoods;
    this.score = shopInfo.score;
    this.shopUrl = shopInfo.shopUrl;
  }
}

class DetailInfo {
  constructor(detailInfo) {
    this.desc = detailInfo.desc;
    this.detailImage = detailInfo.detailImage
  }
}

class ProductParams {
  constructor(info, rule) {
    this.info = info;
    this.rule = rule;
  }
}

class CommentInfo {
  constructor(rate) {
    this.rate = rate.cRate;
    this.list = rate.list;
  }
}
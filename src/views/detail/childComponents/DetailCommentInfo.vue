<template>
  <div class="detail-comment-info" v-if="Object.keys(comments).length !== 0">
    <div class="comment-bar">
      <span>用户评价({{comments.rate}})</span>
      <span class="more">更多</span>
    </div>
    <div class="comment-detail" v-for="(item, index) in comments.list" :key="index">
      <div class="comment-user">
        <img :src="item.user.avatar" alt="">
        <span>{{item.user.uname}}</span>
      </div>
      <p class="comment">{{item.content}}</p>
      <p class="comment-date">{{item.created | getDate}}</p>
      <p class="product-style">{{item.style}}</p>
      <div class="image-list" >
        <img :src="img" alt="" v-for="(img, indey) in item.images" :key="indey">
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'
export default {
  name: 'DetailCommentInfo',
  props: {
    comments: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    getDate(value) {
      const commentDate = new Date(value * 1000);
      return formatDate(commentDate, 'yyyy-MM-dd');
    }
  }
}
</script>

<style scoped>
  .detail-comment-info {
    margin: 10px 0;
    padding: 0 10px;
    border-top: 3px solid #f6f6f6;
    border-bottom: 3px solid #f6f6f6;
  }
  .comment-bar {
    margin: 10px 0;
    font-size: 13px;
    height: 20px;
    line-height: 20px;
  }

  .comment-bar .more {
    position: absolute;
    right: 20px;
  }

  .comment-bar .more::after {
    content: '';
    display: inline-block;
    width: 8px;
    height: 8px;
    border-top: 1px solid #000;
    border-right: 1px solid #000;
    transform: rotate(45deg);
  }

  .comment-detail {
    border-top: 1px solid rgb(235, 233, 233);
    padding: 10px 0;
  }
  .comment-user {
    position: relative;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
  }

  .comment-user img {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }

  .comment-user span {
    position: relative;
    left: 45px;
  }

  .comment {
    line-height: 1.5;
    font-size: 13px;
    margin: 6px 0;
  }

  .comment-date, .product-style {
    display: inline-block;
    font-size: 12px;
    color: #a3a3a5;
  }

  .product-style {
    margin-left: 10px;
  }
  .image-list {
    display: flex;
    flex-wrap: wrap;
    margin: 10px 0;
  }

  .image-list img {
    width: 80px;
    height: 100px;
    margin-right: 5px;
  }
</style>
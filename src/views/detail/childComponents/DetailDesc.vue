<template>
  <div id="detail-desc" v-if="Object.keys(detail).length !== 0">
    <div class="desc">
      <div class="start"></div>
      <p>{{detail.desc}}</p>
      <div class="end"></div>
    </div>
    <div class="images" v-for="(item, index) in detail.detailImage" :key="index">
      <p class="image-key">{{item.key}}</p>
      <div class="img-list">
        <img :src="item" 
            alt="" 
            v-for="(item, indey) in item.list" 
            :key="indey"
            @load="imgLoaded">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailDesc',
  props: {
    detail: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      imgCount: 0,
      imgLength: 0,
    }
  },
  methods: {
    imgLoaded() {
      if(++this.imgCount == this.imgLength) {
        this.$emit('imgLoaded');
      }
    }
  },
  watch: {
    detail() {
      this.imgLength = this.detail.detailImage[0].list.length;
    }
  }
}
</script>

<style scoped>
  #detail-desc {
    width: 100vw;
    padding: 10px;
  }

  .desc .start, .desc .end {
    position: relative;
    width: 90px;
    height: 1px;
    background-color: #a3a3a5;
  }

  .desc .start {
    float: left;
  }

  .desc .end {
    float: right;
  }

  .desc .start::before, .desc .end::after {
    position: absolute;
    bottom: 0;
    content: '';
    width: 5px;
    height: 5px;
    background-color: #000;
  }

  .desc .end::after {
    right: 0;
  }

  .desc p {
    padding: 20px 0;
    font-size: 14px;
  }

  .images {
    margin: 20px 0;
  }

  .image-key {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .img-list img {
    width: 100%;
  }
</style>
<template>
  <div id="left-side-bar">
    <ul class="side-bar-list">
      <li class="side-bar-item" 
          v-for="(item, index) in categoryList" :key="item.acm"
          :class="{active: currentIndex === index}"
          @click="categoryItemClick(item.maitKey, index)">
          <span>{{ item.title }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LeftSideBar',
  props: {
    categoryList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    categoryItemClick(maitKey, index) {
      this.currentIndex = index;
      this.$emit('categoryItemClick', maitKey);
    }
  }
}
</script>

<style scoped>
  .side-bar-list {
    background-color: rgb(245, 245, 245);
    width: 25%;
    text-align: center;
  }

  .side-bar-item {
    height: 8vh;
    line-height: 8vh;
    font-size: 14px;
  }

  .side-bar-list .active {
    color: var(--color-high-text);
    background-color: #fff;
    border-left: 4px solid var(--color-high-text);
  }
</style>
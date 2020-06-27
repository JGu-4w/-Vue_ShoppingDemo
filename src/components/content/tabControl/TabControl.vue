<template>
  <div class="tab-control">
    <div class="title-list" 
        v-for="(item, index) in titles" :key="index" 
        :class="{active: index === currentIndex}" 
        @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  props: {
    titles: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      currentIndex: 0,
    }
  },
  methods: {
    itemClick: function(index) {
      this.currentIndex = index;
    }
  }
}
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    margin: 4px 0;
    background-color: #fff;
  }

  .title-list {
    flex: 1;
  }

  .title-list span {
    padding: 10px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
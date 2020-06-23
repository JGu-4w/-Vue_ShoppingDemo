<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <template #item-icon>
        <img src="~assets/img/tabbar/home.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/home-active.svg" alt="">
      </template>
      <template #item-text>
        <p>首页</p>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/catagory">
      <template #item-icon>
        <img src="~assets/img/tabbar/catagory.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/catagory-active.svg" alt="">
      </template>
      <template #item-text>
        <p>分类</p>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/cart">
      <template #item-icon>
        <img src="~assets/img/tabbar/cart.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/cart-active.svg" alt="">
      </template>
      <template #item-text>
        <p>购物车</p>
      </template>
    </tab-bar-item>

    <tab-bar-item path="/profile">
      <template #item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt="">
      </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/profile-active.svg" alt="">
      </template>
      <template #item-text>
        <p>我的</p>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>
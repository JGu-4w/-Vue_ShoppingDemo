<template>
  <div id="category">
    <nav-bar class="category-nav">
      <template v-slot:center>
        <p>商品分类</p>
      </template>
    </nav-bar>
    <left-side-bar :categoryList="categoryList" @categoryItemClick="categoryItemClick"></left-side-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import Scroll from "components/common/BScroll/BScroll";
import LeftSideBar from "./childComponents/LeftSideBar";
import { getCategory } from "network/category";
export default {
  name: "catagory",
  components: {
    NavBar,
    Scroll,
    LeftSideBar,
  },
  data() {
    return {
      categoryList: [],
    };
  },
  created() {
    this.getCategory();
  },

  methods: {
    getCategory() {
      getCategory()
        .then((res) => {
          this.categoryList = res.data.category.list;
          console.log(this.categoryList);
        })
        .catch((err) => console.log(err));
    },
    categoryItemClick(matiKey) {
      console.log(matiKey);
    },
  },
};
</script>

<style>
.category-nav {
  position: relative;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 9;
}
</style>
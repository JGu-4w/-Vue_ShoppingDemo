<template>
  <div id="toast" v-show="isShow">
    <div>{{ message }}</div>
  </div>
</template>

<script>
import { debounce } from 'common/utils';

export default {
  name: 'Toast',
  data() {
    return {
      message: '',
      isShow: false,
    }
  },
  methods: {
    show(message, duration=1000) {
      this.message = message;
      this.isShow = true;
      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  }
}
</script>

<style scoped>
  #toast {
    position: fixed;
    padding: 20px 30px;
    top: 50%;
    left: 50%;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .6);
    color: #fff;
    z-index: 999;
  }
</style>
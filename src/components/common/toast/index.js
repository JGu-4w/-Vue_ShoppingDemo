import toast from './Toast';

const Toast = {}

Toast.install = function(Vue) {
  // 1.创建构造器
  const toastConstructor = Vue.extend(toast);
  // 2. 创建实例
  const myToast = new toastConstructor();
  console.log(myToast);
  // 3.将实例挂载
  const toastEl = myToast.$mount().$el;
  // 4.将创建的实例添加到body中
  document.body.appendChild(toastEl);
  // 5.将 toast组件挂载到 Vue.prototype 中
  Vue.prototype.$toast = myToast;
}

export default Toast;
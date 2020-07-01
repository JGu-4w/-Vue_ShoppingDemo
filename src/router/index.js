import Vue from 'vue';
import VueRouter from 'vue-router';

const Home = () => import(/* webpackChunkName: "home" */ '../views/home/Home');
const Catagory = () => import(/* webpackChunkName: "catagory" */ '../views/catagory/Catagory');
const Cart = () => import(/* webpackChunkName: "cart" */ '../views/cart/Cart');
const Profile = () => import(/* webpackChunkName: "profile" */ '../views/profile/Profile');
const Detail = () => import(/* webpackChunkName: "detail" */ '../views/detail/Detail');

Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/catagory',
    component: Catagory,
  },
  {
    path: '/cart',
    component: Cart,
  },
  {
    path: '/profile',
    component: Profile,
  },
  {
    path: '/detail/:iid',
    component: Detail,
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
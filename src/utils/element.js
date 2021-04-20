import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup
 } from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'mini'};
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
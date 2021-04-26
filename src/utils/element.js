import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css';
import {
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Breadcrumb,
  BreadcrumbItem,
  Message,
  MessageBox,
  Table,
  TableColumn,
  Button,
  Loading,
  Dialog,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Checkbox,
  CheckboxGroup,
 } from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'mini'};
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Button);
Vue.use(Loading.directive);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);

Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
import Vue from 'vue'
import {Loadmore,Toast,Indicator,Actionsheet,Button,Popup,Checklist} from 'mint-ui';

Vue.component(Loadmore.name, Loadmore); //mint-ui库无法使用vue.use()挂载，
Vue.component(Actionsheet.name, Actionsheet);
Vue.component(Button.name, Button);
Vue.component(Popup.name, Popup);
Vue.component(Checklist.name, Checklist);
Vue.prototype.$toast=Toast;
Vue.prototype.$Indicator=Indicator;
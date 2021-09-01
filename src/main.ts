import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { CurrentUser } from "@/CurrentUser";

Vue.config.productionTip = false;

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTemperatureHigh, faTint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { TemperatureService } from "@/TemperatureService";
import { HumidityService } from "@/HumidityService";

library.add(faTemperatureHigh, faTint);

Vue.component("font-awesome-icon", FontAwesomeIcon);

export let currentUser: CurrentUser;
export let temperatureService: TemperatureService;
export let humidityService: HumidityService;

fetch("/__/firebase/init.json").then(async (response) => {
  const app = firebase.initializeApp(await response.json());

  currentUser = new CurrentUser(app);
  temperatureService = new TemperatureService(app);
  humidityService = new HumidityService(app);

  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
});

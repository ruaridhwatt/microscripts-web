import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { CurrentUser } from "@/CurrentUser";
import { SensorReadings } from "@/SensorReadings";

Vue.config.productionTip = false;

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTemperatureHigh, faTint } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTemperatureHigh, faTint);

Vue.component("font-awesome-icon", FontAwesomeIcon);

export let currentUser: CurrentUser;
export let sensorReadings: SensorReadings;

fetch("/__/firebase/init.json").then(async (response) => {
  const app = firebase.initializeApp(await response.json());

  currentUser = new CurrentUser(app);
  sensorReadings = new SensorReadings(app);

  new Vue({
    router,
    render: (h) => h(App),
  }).$mount("#app");
});

<template>
  <div>
    <nav>
      <span class="user-info" v-if="currentUser.isSignedIn">
        Signed in as {{ currentUser.displayName }}
      </span>
      <button
        class="sign-out-btn"
        v-if="currentUser.isSignedIn"
        @click="signOut"
      >
        Sign Out
      </button>
      <button class="sign-in-btn" v-else @click="signIn">Sign In</button>
    </nav>
    <div
      class="latest-sensor-reading-card"
      v-if="sensorReadings.latest.isValid"
    >
      <div class="latest-sensor-reading-time">
        Time
        {{
          sensorReadings.latest.timestamp.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        }}
      </div>
      <div class="latest-sensor-reading">
        <font-awesome-icon icon="temperature-high" />
        <span> {{ sensorReadings.latest.temperature.toFixed(1) }}°C </span>

        <font-awesome-icon icon="tint" />
        <span> {{ sensorReadings.latest.humidity.toFixed(0) }}% </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { currentUser, sensorReadings } from "@/main";

@Component
export default class Home extends Vue {
  currentUser = currentUser;
  sensorReadings = sensorReadings;

  signIn() {
    currentUser.signIn();
  }

  signOut() {
    currentUser.signOut();
  }
}
</script>

<style scoped>
nav {
  overflow: hidden;
  margin-bottom: 20px;
}

.sign-in-btn {
  float: right;
}

.sign-out-btn {
  float: right;
}

.latest-sensor-reading-card {
  display: inline-block;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 5px;
}

.latest-sensor-reading-time {
  margin-bottom: 10px;
}

.latest-sensor-reading {
  display: inline-grid;
  grid-template-columns: auto auto;
  gap: 10px;
}
</style>

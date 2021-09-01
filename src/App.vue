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
    <div id="app">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { currentUser } from "@/main";
@Component
export default class App extends Vue {
  currentUser = currentUser;

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
</style>

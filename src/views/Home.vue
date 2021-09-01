<template>
  <div>
    <conditions-card
      v-if="temperatureService.latest.isValid && humidityService.latest.isValid"
      v-bind:temperature="temperatureService.latest.temperature"
      v-bind:temperature-timestamp="temperatureService.latest.timestamp"
      v-bind:humidity="humidityService.latest.humidity"
      v-bind:humidity-timestamp="humidityService.latest.timestamp"
    ></conditions-card>
  </div>
</template>

<script lang="ts">
import { Vue } from "vue-property-decorator";
import Component from "vue-class-component";
import { temperatureService, humidityService } from "@/main";
import ConditionsCard from "@/components/ConditionsCard.vue";

@Component({
  components: {
    ConditionsCard,
  },
})
export default class Home extends Vue {
  temperatureService = temperatureService;
  humidityService = humidityService;
}
</script>

<style scoped></style>

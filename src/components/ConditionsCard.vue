<template>
  <div class="latest-sensor-reading-card">
    <div class="latest-sensor-reading">
      <font-awesome-icon icon="temperature-high" />
      <span class="sensor-value"> {{ temperature.toFixed(1) }}°C</span>
      <span class="timestamp">{{
        temperatureTimestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      }}</span>

      <font-awesome-icon icon="tint" />
      <span class="sensor-value"> {{ humidity.toFixed(0) }}% </span>
      <span class="timestamp">{{
        humidityTimestamp.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })
      }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Prop, Vue } from "vue-property-decorator";
import Component from "vue-class-component";

@Component
export default class ConditionsCard extends Vue {
  @Prop({ required: true })
  readonly temperature!: number;

  @Prop({ required: true })
  readonly temperatureTimestamp!: Date;

  @Prop({ required: true })
  readonly humidity!: number;

  @Prop({ required: true })
  readonly humidityTimestamp!: Date;
}
</script>

<style scoped>
.latest-sensor-reading-card {
  display: inline-block;
  padding: 10px 15px;
  border: 1px solid black;
  border-radius: 5px;
}

.latest-sensor-reading {
  display: inline-grid;
  grid-template-columns: auto auto auto;
  gap: 10px;
  align-items: center;
}

.sensor-value {
  font-weight: bold;
  padding-right: 10px;
}

.timestamp {
  font-size: small;
}
</style>

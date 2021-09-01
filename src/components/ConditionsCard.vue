<template>
  <div class="latest-sensor-reading-card">
    <div class="latest-sensor-reading">
      <font-awesome-icon icon="temperature-high" />
      <span> {{ temperature.toFixed(1) }}°C </span>

      <font-awesome-icon icon="tint" />
      <span> {{ humidity.toFixed(0) }}% </span>
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
  readonly humidity!: number;
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
  grid-template-columns: auto auto;
  gap: 10px;
}
</style>

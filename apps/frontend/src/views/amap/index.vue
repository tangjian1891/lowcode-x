<template>
  <div class="ok" id="ok" ref="ok"></div>

  <CustomControl ref="customControl" :map="map" />
</template>

<script lang="ts" setup>
import CustomControl from "./custom-control.vue";
import { onMounted, shallowRef, useTemplateRef } from "vue";
import * as ol from "ol";
import { createLayerByName, LayerNameEnum } from "./default-layers";
import Control from "ol/control/Control";

const ok = useTemplateRef("ok");
const customControl = useTemplateRef("customControl");
const map = shallowRef(null);
onMounted(() => {
  const m = new ol.Map({
    view: new ol.View({
      center: [0, 0],
      zoom: 8,
    }),
    layers: [...createLayerByName(LayerNameEnum.VECTOR), ...createLayerByName(LayerNameEnum.IMAGE)],
    controls: [
      new Control({
        element: customControl.value.$el,
      }),
    ],
    target: ok.value,
  });
  map.value = m;
  m.setProperties({
    initialConfig: {
      center: [0, 0],
      zoom: 8,
    },
  });
});
</script>

<style lang="scss" scoped>
.ok {
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div id="map" class="map"></div>
  <div class="row">
    <div class="col-auto">
      <span class="input-group">
        <label class="input-group-text" for="type">Geometry type:</label>
        <select class="form-select" id="type">
          <option value="Point">Point</option>
          <option value="LineString">LineString</option>
          <option value="Polygon">Polygon</option>
          <option value="Circle">Circle</option>
          <option value="None">None</option>
        </select>
        <input class="form-control" type="button" value="Undo" id="undo" />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Map from "ol/Map.js";
import View from "ol/View.js";
import Draw from "ol/interaction/Draw.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector.js";
import OSM from "ol/source/OSM.js";
import VectorSource from "ol/source/Vector.js";
import { Style, Stroke, Fill, Circle as CircleStyle } from "ol/style.js";
import "ol/ol.css";
import { createEditingStyle } from "ol/style/Style";
onMounted(() => {
  const raster = new TileLayer({
    source: new OSM(),
  });

  const source = new VectorSource({ wrapX: false });

  const vector = new VectorLayer({
    source: source,
  });

  const map = new Map({
    layers: [raster, vector],
    target: "map",
    view: new View({
      center: [-11000000, 4600000],
      zoom: 4,
    }),
  });

  const typeSelect = document.getElementById("type") as HTMLSelectElement | null;

  let draw: Draw | undefined; // global so we can remove it later
  function addInteraction() {
    if (!typeSelect) return;
    const value = typeSelect.value;
    if (value !== "None") {
      // 自定义绘制样式：
      // 1) 跟随鼠标的小圆点（Point）
      const sketchPointStyleInner = new Style({
        image: new CircleStyle({
          radius: 6, // 小圆点半径
          fill: new Fill({ color: "rgba(0, 153, 255, 0.9)" }), // 蓝色填充
          stroke: new Stroke({ color: "#ffffff", width: 2 }), // 白色描边
        }),
      });
      // 外层高亮圆环（可选）
      const sketchPointStyleHalo = new Style({
        image: new CircleStyle({
          radius: 12, // 外圈半径
          fill: undefined,
          stroke: new Stroke({ color: "#f04d42", width: 2 }), // 红色外圈
        }),
      });
      // 2) 绘制中的线样式（LineString）
      const sketchLineStyle = new Style({
        stroke: new Stroke({ color: "#f04d42", width: 2, lineDash: [6, 6] }),
      });

      draw = new Draw({
        source: source,
        type: "LineString",
        // 仅控制“绘制过程中的草稿要素”样式（不影响最终写入图层的要素）
        style: (feature) => {
          const geom = feature.getGeometry();
          const type = geom && geom.getType();
          if (type === "Point") {
            // 跟随鼠标的小圆点样式（可返回多个 Style 叠加）
            return [sketchPointStyleHalo, sketchPointStyleInner];
          } else {
            const editing = createEditingStyle();
            const def = editing[type as keyof typeof editing];
            return def;
          }
        },
      });
      map.addInteraction(draw);
    }
  }

  /**
   * Handle change event.
   */
  if (typeSelect) {
    typeSelect.onchange = function () {
      if (draw) {
        map.removeInteraction(draw);
      }
      addInteraction();
    };
  }

  const undoBtn = document.getElementById("undo");
  undoBtn?.addEventListener("click", function () {
    draw?.removeLastPoint();
  });

  addInteraction();
});
</script>

<style lang="scss" scoped>
.map {
  width: 100%;
  height: 400px;
}
</style>

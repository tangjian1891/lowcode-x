<template>
  <div class="maps">
    <div id="map-left" class="map">
      <div class="map-label">EPSG:4326 (天地图/WGS84)</div>
    </div>
    <div id="map-right" class="map">
      <div class="map-label">EPSG:4490 (天地图经纬度/CGCS2000)</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
// import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import "ol/ol.css";
import { fromLonLat, toLonLat, transform } from "ol/proj";
import proj4 from "proj4";
import { register } from "ol/proj/proj4";
import { Draw, Interaction } from "ol/interaction";
import { Geometry, Point } from "ol/geom";
import { Style } from "ol/style";
import { Feature } from "ol";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { toStringXY } from "ol/coordinate";
// 天安门-国旗  4326 wgs84
// [116.39121664174226,39.90547069825051]

// 天安门-国旗4490 大地2000
// [116.39122024224467,39.905474171596175]

// 注册 CGCS2000 的 EPSG:4490（天地图经纬度）
// 公式使用 GRS80 椭球，与 CGCS2000 定义一致
proj4.defs("EPSG:4490", "+proj=longlat +ellps=GRS80 +no_defs");
register(proj4);

onMounted(() => {
  // 天安门坐标
  const tiananmen = [116.39133845203403, 39.90556687373877];

  // 转换为的高德  [116.473207,39.993202]
  const TIANDITU_TOKEN = "b736560fb4eee72b3637128cf90c18f1";
  const url = `http://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}`;
  const url2 = `http://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}`;
  // 左侧：天地图墨卡托（EPSG:3857）
  const q1 = new TileLayer({
    source: new XYZ({
      url: `http://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}`,
      projection: "EPSG:3857",
    }),
  });
  const q2 = new TileLayer({
    source: new XYZ({
      url: `http://t{0-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}`,
      projection: "EPSG:3857",
    }),
  });
  const leftMap = new Map({
    target: "map-left",
    layers: [q1, q2],
    view: new View({
      projection: "EPSG:3857",
      // center: tiananmen,
      center: fromLonLat([116.39120637162468, 39.90546294145471], "EPSG:3857"),
      // center: [116.397464, 39.906913],
      zoom: 18,
    }),
  });

  console.log(transform([116.39120637162468, 39.90546294145471], "EPSG:4326", "EPSG:3857"));
  console.log(transform([12956609.826104078, 4852213.906842839], "EPSG:3857", "EPSG:4326"));
  // 右侧：天地图经纬度（EPSG:4490）
  const gdUrl = `http://wprd0{1-4}.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=1&style=7`;
  const tianditu4490 = new TileLayer({
    source: new XYZ({
      // url: url2,
      url: gdUrl,
      projection: "EPSG:3857",
    }),
    opacity: 0.2,
  });
  //

  const q11 = new TileLayer({
    source: new XYZ({
      url: `http://t{0-7}.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}`,
      projection: "EPSG:3857",
    }),
  });
  const q22 = new TileLayer({
    source: new XYZ({
      url: `http://t{0-7}.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}`,
      projection: "EPSG:3857",
    }),
  });
  const q223 = new TileLayer({
    source: new XYZ({
      url: `http://t{0-7}.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${TIANDITU_TOKEN}`,
      projection: "EPSG:4326",
    }),
  });
  const rightMap = new Map({
    target: "map-right",
    layers: [q11, q223],
    view: new View({
      projection: "EPSG:3857",
      center: fromLonLat([116.39120637162468, 39.90546294145471], "EPSG:3857"),
      zoom: 18,
    }),
  });

  // Expose maps for debugging in devtools console (optional)
  // @ts-expect-error expose for debugging in devtools (may be missing in prod types)
  window._maps = { leftMap, rightMap };
  // setTimeout(() => {
  //   console.log(leftMap.getView().getCenter());
  //   console.log(rightMap.getView().getCenter());

  //   const point3857 = new Point([116.391216, 39.90547069]);
  //   const feature3857 = new Feature({ geometry: point3857 });
  //   const vectorSource3857 = new VectorSource({ features: [feature3857] });
  //   const vectorLayer3857 = new VectorLayer({ source: vectorSource3857 });

  //   // 创建右侧点要素（CGCS2000坐标，适配EPSG:4490地图）
  //   const point4490 = new Point([116.39122, 39.9054741]);
  //   const feature4490 = new Feature({ geometry: point4490 });
  //   const vectorSource4490 = new VectorSource({ features: [feature4490] });
  //   const vectorLayer4490 = new VectorLayer({ source: vectorSource4490 });

  //   leftMap.addLayer(vectorLayer3857);
  //   rightMap.addLayer(vectorLayer4490);
  //   //
  //   leftMap.addLayer(vectorLayer4490);
  //   rightMap.addLayer(vectorLayer3857);
  // }, 0);
  // const draw = new Draw({
  //   type: "Point",
  //   style: new Style({}),
  // });
  // draw.on("drawend", (e) => {
  //   const geo = e.feature.getGeometry();
  //   if (geo?.getType() === "Point") {
  //     console.log(toStringXY((geo as Point).getCoordinates(), 6));
  //   }
  // });
  // leftMap.addInteraction(draw);
});
</script>

<style lang="scss" scoped>
.maps {
  display: flex;
  gap: 12px;
}
.map {
  flex: 1 1 0;
  height: 1080px;
  position: relative;
  border: 1px solid #e5e7eb;
}
.map-label {
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(255, 255, 255, 0.85);
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  color: #111827;
  z-index: 2;
}
</style>

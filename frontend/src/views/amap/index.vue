<template>
  <div id="my-panel2" class="panel">2313</div>
  <div id="container" class=""></div>
  <div id="my-panel" class="panel"></div>
  <input id="my-input" type="text" placeholder="请输入搜索内容" />
</template>

<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import "@amap/amap-jsapi-types";
import * as ol from "ol";
import TileLayer from "ol/layer/Tile";
import { WMTS } from "ol/source";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { get as getProjection } from "ol/proj";
import { getWidth, getTopLeft } from "ol/extent";
import * as Control from "ol/control";
import "ol/ol.css";
(window as any)._AMapSecurityConfig = {
  securityJsCode: "60712b81f5cf0fb8b8342c9d80b8992c",
};
const tiandituKey = "b736560fb4eee72b3637128cf90c18f1";
onMounted(() => {
  const projection = getProjection("EPSG:3857")!;
  const projectionExtent = projection.getExtent();
  const size = getWidth(projectionExtent) / 256;
  const resolutions: number[] = [];
  const matrixIds: string[] = [];
  for (let z = 0; z < 18; ++z) {
    resolutions[z] = size / Math.pow(2, z);
    matrixIds[z] = z.toString();
  }
  window.ol = ol;
  const map = new ol.Map({
    controls: [],
    target: "container",
    layers: [
      new TileLayer({
        source: new WMTS({
          url: `https://t{0-7}.tianditu.gov.cn/vec_w/wmts?tk=${tiandituKey}`,
          layer: "vec",
          matrixSet: "w",
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
          }),
          style: "default",
          wrapX: true,
          attributions: "© 天地图 & 高德地图", // 这里自定义版权信息
        }),
      }),
      new TileLayer({
        source: new WMTS({
          url: `https://t{0-7}.tianditu.gov.cn/cva_w/wmts?tk=${tiandituKey}`,
          layer: "cva",
          matrixSet: "w",
          tileGrid: new WMTSTileGrid({
            origin: getTopLeft(projectionExtent),
            resolutions: resolutions,
            matrixIds: matrixIds,
          }),
          style: "default",
          wrapX: true,
        }),
      }),
    ],
    view: new ol.View({
      center: [12753423.190977562, 3737019.0259810174],
      zoom: 15,
    }),
  });
  const panelElement = document.getElementById("my-panel2");
  const c = new Control.Control({
    element: panelElement,
  });

  map.addControl(c);
  map.addControl(
    new Control.Attribution({
      // className: "qwerqwer",
    }),
  );
  // const cc = new Control.MousePosition();
  // map.addControl(new Control.FullScreen());
  // map.addControl(cc);

  // map.addControl(
  //   new Control.OverviewMap({
  //     layers: [
  //       new TileLayer({
  //         source: new WMTS({
  //           url: `https://t{0-7}.tianditu.gov.cn/vec_w/wmts?tk=${tiandituKey}`,
  //           layer: "vec",
  //           matrixSet: "w",
  //           tileGrid: new WMTSTileGrid({
  //             origin: getTopLeft(projectionExtent),
  //             resolutions: resolutions,
  //             matrixIds: matrixIds,
  //           }),
  //           style: "default",
  //           wrapX: true,
  //         }),
  //       }),
  //     ],
  //   }),
  // );
  // map.addControl(new Control.Rotate());
  // setTimeout(() => {
  //   map.getView().setRotation(Math.PI / 6);
  // }, 2000);
  // map.addControl(new Control.ScaleLine());
  // map.addControl(new Control.ZoomSlider());
  // map.addControl(new Control.ZoomToExtent());
  // map.addControl(new Control.Zoom());
  (window as any).map = map;
  console.log("当前缩放层级:", map.getView().getZoom());
  console.log("当前缩放层级:", map.getView().getCenter());
  console.log(map.getLayers());
  console.log(map.getAllLayers());
  console.log(map.getControls());

  // AMapLoader.load({
  //   key: "904ffdc1eb2c7d781fdcb1156b5187aa",
  //   version: "2.1Beta",
  //   plugins: [
  //     "AMap.CitySearch",
  //     "AMap.Geolocation",
  //     "AMap.Driving",
  //     "AMap.Geocoder",
  //     "AMap.DragRoute",
  //     "AMap.AutoComplete",
  //     "AMap.PlaceSearch",
  //     "AMap.GraspRoad",
  //     "AMap.DistrictSearch",
  //     "AMap.MouseTool",
  //   ],
  // }).then((AMap: typeof window.AMap) => {
  //   const map = new AMap.Map("container", {
  //     viewMode: "2D", //设置地图模式
  //     zoom: 12, //地图级别
  //     layers: [],
  //   });
  //   // b736560fb4eee72b3637128cf90c18f1
  //   // 天地图 API Key
  //   const layer = new AMap.TileLayer.WMTS({
  //     url: "http://t1.tianditu.gov.cn/img_w/wmts",
  //     params: {
  //       Version: "1.0.0",
  //       layer: "img",
  //       tileMatrixSet: "w",
  //       tk: tiandituKey,
  //     },
  //   });
  //   const layer2 = new AMap.TileLayer.WMTS({
  //     url: "http://t0.tianditu.gov.cn/cia_w/wmts",
  //     params: {
  //       Version: "1.0.0",
  //       layer: "cia",
  //       tileMatrixSet: "w",
  //       tk: tiandituKey,
  //     },
  //   });
  //   map.setLayers([]);
  //   map.addLayer(layer);
  //   // map.addLayer(layer);
  //   // map.addLayer(layer2);
  //   console.log(map.getLayers());
  // });
});
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
#my-panel2 {
  position: absolute;
  top: 4em;
  left: 0.5em;
}
</style>

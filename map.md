---
# 天地图底图服务加载方式

天地图有很多地图服务，常作为“底图”图层使用。其服务遵循 OGC 的 WMTS 标准，可通过 WMTS 和 XYZ 两种方式加载。

## 图层分类

- 矢量图：道路、边界、河流等要素，数据类型为矢量数据。
- 影像图：遥感卫星拍摄的真实地表照片，数据类型为图片。
- 地形图：地形更立体，数据类型为矢量数据。

---

## 1. 高德地图加载天地图图层

### 1.1 WMTS方式加载

```js
const layer = new AMap.TileLayer.WMTS({
  url: "http://t1.tianditu.gov.cn/cva_w/wmts",
  params: {
    version: "1.0.0",
    layer: "cva",
    tileMatrixSet: "w",
    tk: tiandituKey,
  },
});
map.setLayers([]); // 清空所有图层，便于查看天地图图层
map.addLayer(layer);
```

> **注意事项：**
>
> 1. tk 必须写在 params 中，不能放在 url 上。
> 2. params 参数大小写不敏感，但至少需要以上四个参数。
> 3. layer 和 tileMatrixSet 要与 url 保持一致，如 cva_w，代表图层名 cva，投影为 w。
> 4. 其他图层同理。

### 1.2 XYZ方式加载

> **注意事项：**
> 有问题，url 会被拦截，高德地图可能做了特殊封装。

---

## 2. OpenLayers 加载天地图图层

### 2.1 WMTS方式加载

```js
import * as ol from "ol";
import TileLayer from "ol/layer/Tile";
import { WMTS } from "ol/source";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { get as getProjection } from "ol/proj";
import { getWidth, getTopLeft } from "ol/extent";
import "ol/ol.css";
//需要手动区分瓦片网格，中心点位置。提前准备数据，高德内置了，所以不用。
const projection = getProjection("EPSG:3857")!;
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
const resolutions = [];
const matrixIds = [];
for (let z = 0; z < 18; ++z) {
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z.toString();
}
//开始初始化地图
const map = new ol.Map({
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
```

> **注意事项：**
>
> 1. 计算分辨率那块，可能有点不理解，但是不用担心，官方示例中通用的代码可以直接参考。
> 2. 剩下的参数就是图层、投影类型，与前述一致。

### 2.2 XYZ方式加载

```js
import * as ol from "ol";
import TileLayer from "ol/layer/Tile";
import { XYZ } from "ol/source";
import "ol/ol.css";
const map = new ol.Map({
  target: "container",
  layers: [
    new TileLayer({
      source: new XYZ({
        url: `http://t{0-7}.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tiandituKey}`,
      }),
    }),
    new TileLayer({
      source: new XYZ({
        url: `http://t{0-7}.tianditu.gov.cn/cia_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cia&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&tk=${tiandituKey}`,
      }),
    }),
  ],
  view: new ol.View({
    center: [12753423.190977562, 3737019.0259810174],
    zoom: 15,
  }),
});
```

> **注意事项：**
> 直接使用天地图“地图瓦片获取”url即可，查询参数中的 layer 要对应图层名。

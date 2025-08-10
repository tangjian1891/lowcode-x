import TileLayer from "ol/layer/Tile";
import { WMTS } from "ol/source";
import { get as getProjection } from "ol/proj";
import { getWidth, getTopLeft } from "ol/extent";
import WMTSTileGrid from "ol/tilegrid/WMTS";

const tiandituKey = "b736560fb4eee72b3637128cf90c18f1";

const projection = getProjection("EPSG:3857");
const projectionExtent = projection.getExtent();
const size = getWidth(projectionExtent) / 256;
const resolutions = [];
const matrixIds = [];
for (let z = 0; z < 18; ++z) {
  resolutions[z] = size / Math.pow(2, z);
  matrixIds[z] = z.toString();
}

const LayerNameEnum = {
  VECTOR: "vec",
  IMAGE: "img",
};

const createLayer = (layer, matrixSet) => {
  return new TileLayer({
    source: new WMTS({
      url: `https://t{0-7}.tianditu.gov.cn/${layer}_${matrixSet}/wmts?tk=${tiandituKey}`,
      layer: layer,
      matrixSet: matrixSet,
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(projectionExtent),
        resolutions: resolutions,
        matrixIds: matrixIds,
      }),
      style: "default",
      wrapX: true,
    }),
  });
};

const createLayerByName = (layerName) => {
  if (layerName === LayerNameEnum.VECTOR) {
    return [createLayer("vec", "w"), createLayer("cva", "w")];
  } else if (layerName === LayerNameEnum.IMAGE) {
    return [createLayer("img", "w"), createLayer("cia", "w")];
  }
};

export { createLayerByName, LayerNameEnum, createLayer };

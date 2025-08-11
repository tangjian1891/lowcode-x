import * as Source from "ol/source";
import * as Layer from "ol/layer";
import * as ol from "ol";
import * as Interaction from "ol/interaction";
import * as Sphere from "ol/sphere";
import * as Style from "ol/style";
import { LineString, Point } from "ol/geom";
export class Measure {
  helpMsg = {
    start: "点击开始绘制线",
    drawing: "单击继续绘制，双击结束",
  };
  layerStyle = new Style.Style({
    stroke: new Style.Stroke({
      width: 2,
      color: "red",
      lineDash: [10, 10],
    }),
  });
  segmentStyle = new Style.Style({
    text: new Style.Text({
      font: "12px sans-serif",
      fill: new Style.Fill({ color: "#333" }),
      backgroundFill: new Style.Fill({ color: "rgba(255, 255, 255, 0.9)" }),
      backgroundStroke: new Style.Stroke({ color: "red" }),
      padding: [2, 4, 2, 4],
      textBaseline: "bottom",
      offsetY: -10,
    }),
  });
  totalStyle = new Style.Style({
    text: new Style.Text({
      font: "14px sans-serif",
      fill: new Style.Fill({ color: "#fff" }),
      backgroundFill: new Style.Fill({ color: "rgba(255, 0, 0, 0.8)" }),
      backgroundStroke: new Style.Stroke({ color: "red" }),
      padding: [3, 5, 3, 5],
      textBaseline: "bottom",
      offsetY: -15,
    }),
  });
  map: ol.Map;
  layer: Layer.Vector;
  constructor(map: ol.Map) {
    this.map = map;
    const source = new Source.Vector();

    this.layer = new Layer.Vector({
      source,
      style: this.styleFunction.bind(this),
    });
    map.addLayer(this.layer);

    const div = document.createElement("div");
    div.innerHTML = this.helpMsg.start;
    Object.assign(div.style, {
      position: "relative",
      background: "rgba(0, 0, 0, 0.5)",
      borderRadius: "4px",
      color: "white",
      padding: "4px 8px",
      opacity: "0.7",
      whiteSpace: "nowrap",
      fontSize: "12px",
      cursor: "default",
      userSelect: "none",
    });
    // 构建鼠标点提示
    const tooltipOverlay = new ol.Overlay({
      element: div,
      stopEvent: false,
      insertFirst: false,
    });
    map.addOverlay(tooltipOverlay);
    map.on("pointermove", (e) => {
      const coordinate = e.coordinate;
      tooltipOverlay.setPosition(coordinate);
    });

    // 构建交互绘制对象
    const draw = new Interaction.Draw({
      source,
      type: "LineString",
      style: this.styleFunction.bind(this),
    });

    // 绘制结束，绘制总长
    draw.on("drawend", (e) => {
      map.removeInteraction(draw);
      map.removeOverlay(tooltipOverlay);
    });

    draw.on("drawstart", (e) => {
      div.innerHTML = this.helpMsg.drawing;
    });

    // 绘制交互放入地图
    map.addInteraction(draw);
  }

  styleFunction(feature) {
    const _that = this;
    const geom = feature.getGeometry();
    if (geom instanceof LineString) {
      const segmentStyleList = [];
      geom.forEachSegment((a, b) => {
        const segmentLine = new LineString([a, b]);
        const length = Sphere.getLength(segmentLine);
        const segmentStyle = _that.segmentStyle.clone();
        const segmentPoint = new Point(segmentLine.getCoordinateAt(0.5));
        segmentStyle.getText()?.setText(length + "m");
        segmentStyle.setGeometry(segmentPoint);
        segmentStyleList.push(segmentStyle);
      });
      const total = Sphere.getLength(geom);
      _that.totalStyle.getText().setText("总距离为" + total + "m");
      _that.totalStyle.setGeometry(new Point(geom.getLastCoordinate()));
      return [_that.layerStyle, _that.totalStyle, ...segmentStyleList];
    }
    return [];
  }
  //   清空当前图层
  clear() {
    this.map.removeLayer(this.layer);
  }
}

<template>
  <div class="custom-control">
    <div class="control-header">
      <span class="title">控制</span>
      <button class="minimize-btn" @click="toggleMinimize">
        {{ isMinimized ? "+" : "−" }}
      </button>
    </div>

    <div class="control-content" v-show="!isMinimized">
      <div v-for="category in controlTree" :key="category.id" class="control-category">
        <div class="category-header" @click="toggleCategory(category.id)" v-if="category.visible">
          <span class="category-icon">{{ category.expanded ? "▼" : "▶" }}</span>
          <span class="category-title">{{ category.title }}</span>
        </div>

        <div class="category-items" v-show="category.expanded && category.visible">
          <button
            v-for="item in category.children"
            :key="item.id"
            v-show="item.visible"
            class="control-btn"
            :class="{ active: item.active }"
            @click="item.onClick"
          >
            {{ item.title }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import * as ol from "ol";
import * as Sphere from "ol/sphere";
import * as Layer from "ol/layer";
import * as Source from "ol/source";
import * as Style from "ol/style";
import * as Interaction from "ol/interaction";

const props = defineProps({
  map: {
    type: ol.Map,
    required: true,
  },
});
const isMinimized = ref(false);
let draw: Interaction.Draw | null = null;
const measureSource = new Source.Vector();
const measureLayer = new Layer.Vector({
  source: measureSource,
  style: new Style.Style({
    stroke: new Style.Stroke({ color: "red", width: 2 }),
    fill: new Style.Fill({ color: "rgba(255,77,79,0.15)" }),
  }),
});
onMounted(() => {
  console.log("没有吗", props.map);
  setTimeout(() => {
    props.map.addLayer(measureLayer);
  }, 0);
});
// 树形控制结构
const controlTree = reactive([
  {
    id: "view",
    title: "视图控制",
    visible: true,
    expanded: true,
    children: [
      {
        id: "zoom-in",
        title: "放大",
        visible: true,
        active: false,
        onClick: () => {
          const max = props.map.getView().getMaxZoom();
          const zoom = props.map.getView().getZoom();
          props.map.getView().animate({ zoom: zoom + 1 > max ? max : zoom + 1, duration: 250 });
        },
      },
      {
        id: "zoom-out",
        title: "缩小",
        visible: true,
        active: false,
        onClick: () => {
          const min = props.map.getView().getMinZoom();
          const zoom = props.map.getView().getZoom();
          props.map.getView().animate({ zoom: zoom - 1 < min ? min : zoom - 1, duration: 250 });
        },
      },
      {
        id: "reset",
        title: "重置",
        visible: true,
        active: false,
        onClick: () => {
          console.log("执行重置操作");
          // 这里编写重置逻辑
          console.log(props.map.getView());
          const initialConfig = props.map.getProperties().initialConfig;
          props.map.getView().animate({
            center: initialConfig.center,
            zoom: initialConfig.zoom,
            duration: 250,
          });
        },
      },
    ],
  },
  {
    id: "measure",
    title: "测量",
    visible: true,
    expanded: true,
    children: [
      {
        id: "measure-distance",
        title: "距离测量",
        visible: true,
        active: false,
        onClick: () => {
          if (draw) {
            props.map.removeInteraction(draw);
            draw = null;
          }
          draw = new Interaction.Draw({
            source: measureSource,
            type: "LineString",
          });

          draw.on("drawend", (e) => {
            console.log("绘制结束", e);
            const geom = e.feature.getGeometry();
            const length = Sphere.getLength(geom);
            console.log(length);
            e.feature.setStyle(
              new Style.Style({
                stroke: new Style.Stroke({ color: "red", width: 2 }),
                text: new Style.Text({
                  text: length + "m",
                  placement: "line",
                  font: "12px sans-serif",
                  fill: new Style.Fill({ color: "#fff" }),
                  backgroundFill: new Style.Fill({ color: "rgba(0,0,0,0.6)" }),
                  padding: [2, 4, 2, 4],
                }),
              }),
            );
          });

          props.map.addInteraction(draw);
        },
      },
      {
        id: "measure-area",
        title: "距离测量",
        visible: true,
        active: false,
        onClick: () => {
          console.log("开启距离测量");
        },
      },
      {
        id: "measure-clear",
        title: "清空测量",
        visible: true,
        active: false,
        onClick: () => {
          console.log("开启清空测量");
        },
      },
    ],
  },
  {
    id: "layers",
    title: "图层管理",
    visible: true,
    expanded: false,
    children: [
      {
        id: "layer-1",
        title: "基础图层",
        visible: true,
        active: true,
        onClick: () => {
          console.log("切换基础图层");
          const item = controlTree[1].children.find((c) => c.id === "layer-1");
          item.active = !item.active;
          alert(`基础图层已${item.active ? "显示" : "隐藏"}`);
        },
      },
      {
        id: "layer-2",
        title: "标注图层",
        visible: true,
        active: false,
        onClick: () => {
          console.log("切换标注图层");
          const item = controlTree[1].children.find((c) => c.id === "layer-2");
          item.active = !item.active;
          alert(`标注图层已${item.active ? "显示" : "隐藏"}`);
        },
      },
      {
        id: "layer-3",
        title: "数据图层",
        visible: true,
        active: false,
        onClick: () => {
          console.log("切换数据图层");
          const item = controlTree[1].children.find((c) => c.id === "layer-3");
          item.active = !item.active;
          alert(`数据图层已${item.active ? "显示" : "隐藏"}`);
        },
      },
    ],
  },
  {
    id: "tools",
    title: "工具箱",
    visible: true,
    expanded: false,
    children: [
      {
        id: "select",
        title: "选择工具",
        visible: true,
        active: true,
        onClick: () => {
          console.log("激活选择工具");
          // 取消其他工具的激活状态
          controlTree[2].children.forEach((tool) => (tool.active = false));
          const item = controlTree[2].children.find((c) => c.id === "select");
          item.active = true;
          alert("选择工具已激活");
        },
      },
      {
        id: "draw",
        title: "绘制工具",
        visible: true,
        active: false,
        onClick: () => {
          console.log("激活绘制工具");
          controlTree[2].children.forEach((tool) => (tool.active = false));
          const item = controlTree[2].children.find((c) => c.id === "draw");
          item.active = true;
          alert("绘制工具已激活");
        },
      },
      {
        id: "measure",
        title: "测量工具",
        visible: true,
        active: false,
        onClick: () => {
          console.log("激活测量工具");
          controlTree[2].children.forEach((tool) => (tool.active = false));
          const item = controlTree[2].children.find((c) => c.id === "measure");
          item.active = true;
          alert("测量工具已激活");
        },
      },
    ],
  },
  {
    id: "settings",
    title: "设置",
    visible: true,
    expanded: false,
    children: [
      {
        id: "config",
        title: "配置",
        visible: true,
        active: false,
        onClick: () => {
          console.log("打开配置面板");
          alert("打开配置面板");
        },
      },
      {
        id: "help",
        title: "帮助",
        visible: true,
        active: false,
        onClick: () => {
          console.log("打开帮助文档");
          alert("打开帮助文档");
        },
      },
      {
        id: "about",
        title: "关于",
        visible: false, // 默认隐藏
        active: false,
        onClick: () => {
          console.log("显示关于信息");
          alert("关于信息");
        },
      },
    ],
  },
]);

// 切换最小化
const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value;
};

// 切换分类展开状态
const toggleCategory = (categoryId) => {
  const category = controlTree.find((cat) => cat.id === categoryId);
  if (category) {
    category.expanded = !category.expanded;
  }
};

// 动态控制项目可见性的方法
const setItemVisible = (categoryId, itemId, visible) => {
  const category = controlTree.find((cat) => cat.id === categoryId);
  if (category) {
    const item = category.children.find((child) => child.id === itemId);
    if (item) {
      item.visible = visible;
    }
  }
};

// 动态控制分类可见性的方法
const setCategoryVisible = (categoryId, visible) => {
  const category = controlTree.find((cat) => cat.id === categoryId);
  if (category) {
    category.visible = visible;
  }
};

// 暴露方法供外部调用
defineExpose({
  setItemVisible,
  setCategoryVisible,
  controlTree,
});
</script>

<style lang="scss" scoped>
.custom-control {
  background-color: #ffffff;
  position: absolute;
  right: 20px;
  bottom: 20px;
  width: 160px;
  border-radius: 6px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border: 1px solid #e0e0e0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  z-index: 1000;

  .control-header {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 8px 12px;
    border-radius: 6px 6px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-weight: 500;
      font-size: 13px;
    }

    .minimize-btn {
      background: none;
      border: none;
      color: white;
      font-size: 16px;
      cursor: pointer;
      padding: 0;
      width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 3px;
      transition: background-color 0.2s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }

  .control-content {
    padding: 8px;
    max-height: 300px;
    overflow-y: auto;

    .control-category {
      margin-bottom: 8px;

      &:last-child {
        margin-bottom: 0;
      }

      .category-header {
        display: flex;
        align-items: center;
        padding: 6px 8px;
        background: #f8f9fa;
        border-radius: 4px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        color: #495057;
        transition: background-color 0.2s;
        margin-bottom: 4px;

        &:hover {
          background: #e9ecef;
        }

        .category-icon {
          margin-right: 6px;
          font-size: 10px;
          transition: transform 0.2s;
        }

        .category-title {
          flex: 1;
        }
      }

      .category-items {
        padding-left: 16px;

        .control-btn {
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          border-radius: 4px;
          padding: 6px 8px;
          font-size: 11px;
          color: #495057;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          width: 100%;
          margin-bottom: 3px;

          &:last-child {
            margin-bottom: 0;
          }

          &:hover {
            background: #e9ecef;
            border-color: #adb5bd;
          }

          &:active {
            background: #dee2e6;
          }

          &.active {
            background: #d4edda;
            border-color: #c3e6cb;
            color: #155724;
            font-weight: 500;
          }
        }
      }
    }
  }

  // 滚动条样式
  .control-content::-webkit-scrollbar {
    width: 4px;
  }

  .control-content::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }

  .control-content::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 2px;

    &:hover {
      background: #a8a8a8;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .custom-control {
    right: 10px;
    bottom: 10px;
    width: 140px;
  }
}
</style>

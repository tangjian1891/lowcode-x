<template>
  <div id="container" class=""></div>
</template>

<script lang="ts" setup>
import AMapLoader from "@amap/amap-jsapi-loader";
import "@amap/amap-jsapi-types";
(window as any)._AMapSecurityConfig = {
  securityJsCode: "60712b81f5cf0fb8b8342c9d80b8992c",
};

onMounted(() => {
  AMapLoader.load({
    key: "904ffdc1eb2c7d781fdcb1156b5187aa",
    version: "2.1Beta",
  }).then((AMap: typeof window.AMap) => {
    const map = new AMap.Map("container", {
      center: [116.397428, 39.90923],

      viewMode: "2D", //设置地图模式
      zoom: 12, //地图级别
    });

    setTimeout(() => {
      var gps = [116.3, 39.9]; //需要转换的gps类型的坐标
      //参数说明：需要转换的坐标或者坐标组，需要转换的坐标类型，转换成功后的回调函数
      AMap.convertFrom(gps, "gps", function (status, result) {
        //status：complete 表示查询成功，no_data 为查询无结果，error 代表查询错误
        //查询成功时，result.locations 即为转换后的高德坐标系
        if (status === "complete" && result.info === "ok") {
          var lnglats = result.locations; //转换后的高德坐标 Array.<LngLat>
          console.log(lnglats);
        }
      });
    }, 5000);
  });
});
</script>

<style lang="scss" scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>

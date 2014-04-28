/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/config"], function(require, exports, Map, esriConfig) {
    esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    esriConfig.defaults.map.panDuration = 1; // time in milliseconds, default panDuration: 250
    esriConfig.defaults.map.panRate = 1; // default panRate: 25
    esriConfig.defaults.map.zoomDuration = 100; // default zoomDuration: 500
    esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25

    var map = new Map("mapDiv", {
        basemap: "satellite",
        center: [-93.5, 36.972],
        zoom: 5
    });
});
//# sourceMappingURL=main.js.map

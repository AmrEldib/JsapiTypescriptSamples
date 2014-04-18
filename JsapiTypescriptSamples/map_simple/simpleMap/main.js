/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/config"], function(require, exports, Map, esriConfig) {
    esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

    var map = new Map("mapDiv", {
        basemap: "topo",
        center: [-122.45, 37.75],
        zoom: 13
    });
});
//# sourceMappingURL=main.js.map

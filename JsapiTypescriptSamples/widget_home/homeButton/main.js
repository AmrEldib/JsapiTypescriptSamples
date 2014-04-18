/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/dijit/HomeButton", "esri/config"], function(require, exports, Map, HomeButton, esriConfig) {
    esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

    var map = new Map("mapDiv", {
        center: [-56.049, 38.485],
        zoom: 3,
        basemap: "streets"
    });

    var home = new HomeButton({
        map: map
    }, "homeButtonDiv");
    home.startup();
});
//# sourceMappingURL=main.js.map

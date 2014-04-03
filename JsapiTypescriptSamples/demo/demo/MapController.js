/// <reference path="../../esri.d.ts"/>
define(["require", "exports", "esri/map", "./Point", "esri/config"], function(require, exports, Map, Point, esriConfig) {
    

    var MapController = (function () {
        function MapController(mapDiv) {
            this.mapDiv = mapDiv;
            esriConfig.defaults.io.proxyUrl = "/DojoProxy/proxy.ashx";
        }
        MapController.prototype.start = function () {
            var point = new Point(-122.45, 37.75);
            point.log();

            var mapOptions = {};
            mapOptions.basemap = "topo";
            mapOptions.center = point;
            mapOptions.zoom = 13;

            this.map = new Map(this.mapDiv, mapOptions);
        };
        return MapController;
    })();
    return MapController;
});
//# sourceMappingURL=MapController.js.map

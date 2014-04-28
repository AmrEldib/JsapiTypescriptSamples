/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/dijit/BasemapToggle", "esri/config"], function(require, exports, Map, BasemapToggle, esriConfig) {
    

    var BasemapToggleController = (function () {
        function BasemapToggleController(mapDiv, basemapToggleDiv, initialBasemap, otherBasemap) {
            this.mapDiv = mapDiv;
            this.basemapToggleDiv = basemapToggleDiv;
            this.initialBasemap = initialBasemap;
            this.otherBasemap = otherBasemap;
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        BasemapToggleController.prototype.start = function () {
            try  {
                var map = new Map(this.mapDiv, {
                    basemap: this.initialBasemap,
                    center: [-70.6508, 43.1452],
                    zoom: 16
                });

                var toggle = new BasemapToggle({
                    map: map,
                    basemap: this.otherBasemap
                }, this.basemapToggleDiv);
                toggle.startup();
            } catch (error) {
                console.log(error);
            }
        };
        return BasemapToggleController;
    })();
    return BasemapToggleController;
});
//# sourceMappingURL=BasemapToggleController.js.map

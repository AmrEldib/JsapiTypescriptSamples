/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/dijit/LocateButton", "esri/config"], function(require, exports, Map, LocateButton, esriConfig) {
    

    var LocateController = (function () {
        function LocateController(mapDiv, initialBasemap, locateButtonDiv) {
            this.mapDiv = mapDiv;
            this.initialBasemap = initialBasemap;
            this.locateButtonDiv = locateButtonDiv;
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        LocateController.prototype.start = function () {
            try  {
                var map = new Map(this.mapDiv, {
                    basemap: this.initialBasemap,
                    center: [-70.6508, 43.1452],
                    zoom: 16
                });

                var geoLocate = new LocateButton({
                    map: map
                }, this.locateButtonDiv);
                geoLocate.startup();
            } catch (error) {
                console.log(error);
            }
        };
        return LocateController;
    })();
    return LocateController;
});
//# sourceMappingURL=LocateController.js.map

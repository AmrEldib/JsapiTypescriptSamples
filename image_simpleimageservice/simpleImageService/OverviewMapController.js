/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/dijit/OverviewMap", "dojo/parser", "esri/config"], function(require, exports, Map, OverviewMap, parser, esriConfig) {
    

    var OverviewMapController = (function () {
        function OverviewMapController(mapDiv, initialBasemap, overviewMapDiv) {
            this.mapDiv = mapDiv;
            this.initialBasemap = initialBasemap;
            this.overviewMapDiv = overviewMapDiv;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        OverviewMapController.prototype.start = function () {
            try  {
                var map = new Map(this.mapDiv, {
                    basemap: this.initialBasemap,
                    center: [-70.6508, 43.1452],
                    zoom: 16
                });

                var overviewMapDijit = new OverviewMap({
                    map: map,
                    visible: true
                }, this.overviewMapDiv);
                overviewMapDijit.startup();
            } catch (error) {
                console.log(error);
            }
        };
        return OverviewMapController;
    })();
    return OverviewMapController;
});
//# sourceMappingURL=OverviewMapController.js.map

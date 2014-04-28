/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/dijit/Scalebar", "dojo/parser", "esri/config"], function(require, exports, Map, Scalebar, parser, esriConfig) {
    

    var ScalebarController = (function () {
        function ScalebarController(mapDiv, initialBasemap) {
            this.mapDiv = mapDiv;
            this.initialBasemap = initialBasemap;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        ScalebarController.prototype.start = function () {
            try  {
                var map = new Map(this.mapDiv, {
                    basemap: this.initialBasemap,
                    center: [-116.093, 34.218],
                    zoom: 7
                });

                var scalebar = new Scalebar({
                    map: map,
                    // "dual" displays both miles and kilmometers
                    // "english" is the default, which displays miles
                    // use "metric" for kilometers
                    scalebarUnit: "dual"
                });
            } catch (error) {
                console.log(error);
            }
        };
        return ScalebarController;
    })();
    return ScalebarController;
});
//# sourceMappingURL=ScalebarController.js.map

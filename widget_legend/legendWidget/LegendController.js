/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/layers/FeatureLayer", "esri/dijit/Legend", "dojo/_base/array", "dojo/parser", "esri/config"], function(require, exports, Map, FeatureLayer, Legend, arrayUtils, parser, esriConfig) {
    

    var LegendController = (function () {
        function LegendController(mapDiv, initialBasemap, legendDiv) {
            this.mapDiv = mapDiv;
            this.initialBasemap = initialBasemap;
            this.legendDiv = legendDiv;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        LegendController.prototype.start = function () {
            try  {
                var map = new Map(this.mapDiv, {
                    basemap: this.initialBasemap,
                    center: [-96.53, 38.374],
                    zoom: 13
                });

                var rivers = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/1", {
                    mode: FeatureLayer.MODE_ONDEMAND,
                    outFields: ["*"]
                });
                var waterbodies = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/0", {
                    mode: FeatureLayer.MODE_ONDEMAND,
                    outFields: ["*"]
                });

                //add the legend
                map.on("layers-add-result", function (evt) {
                    var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
                        return { layer: layer.layer, title: layer.layer.name };
                    });
                    if (layerInfo.length > 0) {
                        var legendDijit = new Legend({
                            map: map,
                            layerInfos: layerInfo
                        }, this.legendDiv);
                        legendDijit.startup();
                    }
                });

                map.addLayers([waterbodies, rivers]);
            } catch (error) {
                console.log(error);
            }
        };
        return LegendController;
    })();
    return LegendController;
});
//# sourceMappingURL=LegendController.js.map

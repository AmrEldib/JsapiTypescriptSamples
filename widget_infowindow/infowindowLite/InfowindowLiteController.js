/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/dijit/InfoWindowLite", "esri/InfoTemplate", "esri/layers/FeatureLayer", "dojo/dom-construct", "dojo/parser", "esri/config"], function(require, exports, Map, InfoWindowLite, InfoTemplate, FeatureLayer, domConstruct, parser, esriConfig) {
    

    var InfowindowLiteController = (function () {
        function InfowindowLiteController(map) {
            this.map = map;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        InfowindowLiteController.prototype.start = function () {
            try  {
                var map = new Map(this.map, {
                    basemap: "topo",
                    center: [-98.416, 39.781],
                    zoom: 6
                });

                var infoWindow = new InfoWindowLite(null, domConstruct.create("div", null, null, map.root));
                infoWindow.startup();
                map.setInfoWindow(infoWindow);

                var template = new InfoTemplate();
                template.setTitle("<b>${STATE_NAME} - ${STATE_ABBR}</b>");
                template.setContent("${STATE_NAME} is in the ${SUB_REGION} sub region.");

                //add a layer to the map
                var featureLayer = new FeatureLayer("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer/3", {
                    mode: FeatureLayer.MODE_ONDEMAND,
                    infoTemplate: template,
                    outFields: ["STATE_NAME", "SUB_REGION", "STATE_ABBR"]
                });
                map.addLayer(featureLayer);

                map.infoWindow.resize(200, 75);
            } catch (error) {
                console.log(error);
            }
        };
        return InfowindowLiteController;
    })();
    return InfowindowLiteController;
});
//# sourceMappingURL=InfowindowLiteController.js.map

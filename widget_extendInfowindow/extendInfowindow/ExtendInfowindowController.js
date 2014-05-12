/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "dojo/parser", "dojo/dom", "dojo/dom-construct", "esri/map", "myModules/InfoWindow", "esri/layers/FeatureLayer", "esri/InfoTemplate", "dojo/string", "esri/config"], function(require, exports, parser, dom, domConstruct, Map, InfoWindow, FeatureLayer, InfoTemplate, string, esriConfig) {
    

    var WebmapbyIdController = (function () {
        function WebmapbyIdController(map) {
            this.map = map;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        WebmapbyIdController.prototype.start = function () {
            try  {
                var infoWindow = new InfoWindow({
                    domNode: domConstruct.create("div", null, dom.byId(this.map))
                });

                //create the map and specify the custom info window as the info window that will
                //be used by the map
                var map = new Map(this.map, {
                    center: [-122.41, 37.78],
                    zoom: 17,
                    basemap: "topo",
                    infoWindow: infoWindow
                });

                //define the info template that is used to display the popup content.
                var template = new InfoTemplate();
                template.setTitle("<b>${qAddress}</b>");
                template.setContent("hello");
                template.setContent(getTextContent);

                //create the feature layer (street trees of San Francisco)
                var featureLayer = new FeatureLayer("http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Street_Trees/FeatureServer/0", {
                    infoTemplate: template,
                    outFields: ["*"]
                });
                map.addLayer(featureLayer);

                //resize the info window
                map.infoWindow.resize(180, 75);

                function getTextContent(graphic) {
                    var attr = graphic.attributes.qSpecies.replace('"', "");
                    var names = attr.split("::");
                    var commName = string.trim(names[1].replace('"', ""));
                    var hlink = names[0].split(" ");
                    var sciName = hlink[0] + "_" + hlink[1];
                    if (commName == "") {
                        commName = names[0];
                    }
                    return "<b>" + commName + "</b><br /><a target='_blank' href=http://en.wikipedia.org/wiki/" + sciName + ">Wikipedia Entry</a>";
                }
            } catch (error) {
                console.log(error);
            }
        };
        return WebmapbyIdController;
    })();
    return WebmapbyIdController;
});
//# sourceMappingURL=ExtendInfowindowController.js.map

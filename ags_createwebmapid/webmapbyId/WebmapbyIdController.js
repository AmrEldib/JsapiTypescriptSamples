/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "dojo/parser", "dojo/dom", "esri/arcgis/utils", "esri/dijit/Legend", "esri/dijit/Scalebar", "esri/config"], function(require, exports, parser, dom, arcgisUtils, Legend, Scalebar, esriConfig) {
    

    var WebmapbyIdController = (function () {
        function WebmapbyIdController(map, legend) {
            this.map = map;
            this.legend = legend;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        WebmapbyIdController.prototype.start = function () {
            try  {
                arcgisUtils.createMap("4778fee6371d4e83a22786029f30c7e1", this.map).then(function (response) {
                    //update the app
                    dom.byId("title").innerHTML = response.itemInfo.item.title;
                    dom.byId("subtitle").innerHTML = response.itemInfo.item.snippet;

                    var map = response.map;

                    //add the scalebar
                    var scalebar = new Scalebar({
                        map: map,
                        scalebarUnit: "english"
                    });

                    //add the legend. Note that we use the utility method getLegendLayers to get
                    //the layers to display in the legend from the createMap response.
                    var legendLayers = arcgisUtils.getLegendLayers(response);
                    var legendDijit = new Legend({
                        map: map,
                        layerInfos: legendLayers
                    }, this.legend);
                    legendDijit.startup();
                });
            } catch (error) {
                console.log(error);
            }
        };
        return WebmapbyIdController;
    })();
    return WebmapbyIdController;
});
//# sourceMappingURL=WebmapbyIdController.js.map

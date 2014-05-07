/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "dojo/parser", "esri/config", "esri/tasks/GeometryService", "esri/urlUtils", "esri/arcgis/utils", "dojo/dom", "dojo/_base/array", "esri/dijit/editing/Editor"], function(require, exports, parser, config, GeometryService, urlUtils, arcgisUtils, dom, array, Editor) {
    

    var EditWebmapController = (function () {
        function EditWebmapController(mapDiv, editorDiv) {
            this.mapDiv = mapDiv;
            this.editorDiv = editorDiv;
            parser.parse();
            config.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        EditWebmapController.prototype.start = function () {
            try  {
                config.defaults.geometryService = new GeometryService("http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

                //check to see if a webmap was specified using URL params. If not use the
                //hardcoded webmap id
                this.urlObject = urlUtils.urlToObject(document.location.href);
                this.webmap = "a193c5459e6e4fd99ebf09d893d65cf0";
                if (this.urlObject.query && this.urlObject.query.webmap) {
                    this.webmap = this.urlObject.query.webmap;
                }

                //create the map
                arcgisUtils.createMap(this.webmap, this.mapDiv, {
                    mapOptions: {
                        sliderStyle: "large"
                    },
                    ignorePopups: true
                }).then(function (response) {
                    this.webmap = "a193c5459e6e4fd99ebf09d893d65cf0";
                    var map = response.map;
                    dom.byId("title").innerHTML = response.itemInfo.item.title;
                    dom.byId("snippet").innerHTML = response.itemInfo.item.snippet;
                    dom.byId("dataSource").innerHTML = "<a target='_blank' href='http://www.arcgis.com/home/item.html?id=" + this.webmap + "'>View data details</a>";

                    //create the editor widget
                    var layerInfo = [];

                    var layers = response.itemInfo.itemData.operationalLayers;
                    array.forEach(layers, function (layer) {
                        layerInfo.push({
                            "featureLayer": layer.layerObject
                        });
                    });

                    var settings = {
                        map: map,
                        layerInfos: layerInfo
                    };

                    var editorWidget = new Editor({
                        settings: settings
                    }, this.editorDiv);
                    editorWidget.startup();
                });
            } catch (error) {
                console.log(error);
            }
        };
        return EditWebmapController;
    })();
    return EditWebmapController;
});
//# sourceMappingURL=EditWebmapController.js.map

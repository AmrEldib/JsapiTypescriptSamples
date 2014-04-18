/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/dijit/BasemapGallery", "esri/config", "dojo/parser"], function(require, exports, Map, BasemapGallery, esriConfig, parser) {
    

    var WidgetBasemapController = (function () {
        function WidgetBasemapController(mapDiv, basemapGalleryDiv, initialBasemap) {
            this.mapDiv = mapDiv;
            this.basemapGalleryDiv = basemapGalleryDiv;
            this.initialBasemap = initialBasemap;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/DojoProxy/proxy.ashx";
        }
        WidgetBasemapController.prototype.start = function () {
            try  {
                var map = new Map(this.mapDiv, {
                    basemap: this.initialBasemap,
                    center: [-105.255, 40.022],
                    zoom: 13
                });

                //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
                var basemapGallery = new BasemapGallery({
                    showArcGISBasemaps: true,
                    map: map
                }, this.basemapGalleryDiv);
                basemapGallery.startup();

                basemapGallery.on("error", function (msg) {
                    console.log("basemap gallery error:  ", msg);
                });
            } catch (error) {
                console.log(error);
            }
        };
        return WidgetBasemapController;
    })();
    return WidgetBasemapController;
});
//# sourceMappingURL=WidgetBasemapController.js.map

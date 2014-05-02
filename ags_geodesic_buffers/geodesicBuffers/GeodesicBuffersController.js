/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "dojo/parser", "esri/Color", "dojo/_base/array", "esri/arcgis/utils", "esri/config", "esri/tasks/BufferParameters", "esri/graphicsUtils", "esri/tasks/GeometryService", "esri/symbols/SimpleFillSymbol", "esri/graphic"], function(require, exports, parser, Color, array, arcgisUtils, config, BufferParameters, graphicsUtils, GeometryService, SimpleFillSymbol, Graphic) {
    

    var GeodesicBuffersController = (function () {
        function GeodesicBuffersController(map) {
            this.map = map;
            parser.parse();
            config.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        GeodesicBuffersController.prototype.start = function () {
            try  {
                config.defaults.geometryService = new GeometryService("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");

                //config.defaults.io.proxyUrl = "/proxy";
                //why write a lot of javascript code when you can use arcgis.com to author your webmap?
                //csv file from a webserver (usgs.gov), basemap, rederer, custom popup are conatined in this simple webmap.
                var webmapId = "c5db002dffec4bf0a16a5ed7223f9a2c";

                arcgisUtils.createMap(webmapId, this.map, {
                    mapOptions: { slider: false }
                }).then(function (response) {
                    var map = response.map;

                    //when the map is ready geodesically buffer all features
                    bufferEarthquakes(map);
                });

                function bufferEarthquakes(map) {
                    //Pull first layer from the webmap and use it as input for the buffer operation
                    var featureLayer = map.getLayer(map.graphicsLayerIds[0]);

                    var bufferGeodesic = new BufferParameters();

                    //get all geometries from the featurelayer and set on bufferparameter.
                    bufferGeodesic.geometries = graphicsUtils.getGeometries(featureLayer.graphics);
                    bufferGeodesic.distances = [2000];
                    bufferGeodesic.outSpatialReference = map.spatialReference;
                    bufferGeodesic.unit = GeometryService.UNIT_KILOMETER;

                    //the 10.1 geometry service magic sauce;
                    // buffers will have correct distance no matter what the spatial reference of the map is.
                    bufferGeodesic.geodesic = true;

                    //union all buffers that interesect each other.
                    bufferGeodesic.unionResults = true;

                    config.defaults.geometryService.buffer(bufferGeodesic, function (geometries) {
                        //when buffer is done set up renderer and add each geometry to the maps graphics layer as a graphic
                        var symbol = new SimpleFillSymbol();
                        symbol.setColor(new Color([100, 100, 100, 0.25]));
                        symbol.setOutline(null);
                        array.forEach(geometries, function (geometry) {
                            map.graphics.add(new Graphic(geometry, symbol));
                        });
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        return GeodesicBuffersController;
    })();
    return GeodesicBuffersController;
});
//# sourceMappingURL=GeodesicBuffersController.js.map

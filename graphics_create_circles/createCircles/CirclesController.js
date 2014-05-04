/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/geometry/Circle", "esri/symbols/SimpleFillSymbol", "esri/graphic", "esri/layers/GraphicsLayer", "dojo/dom", "dojo/dom-attr"], function(require, exports, Map, Circle, SimpleFillSymbol, Grahpic, GraphicsLayer, dom, domAttr) {
    

    var CirclesController = (function () {
        function CirclesController(mapDiv, initialBasemap) {
            this.mapDiv = mapDiv;
            this.initialBasemap = initialBasemap;
        }
        CirclesController.prototype.start = function () {
            try  {
                var map = new Map(this.mapDiv, {
                    basemap: this.initialBasemap,
                    center: [-120.741, 56.39],
                    slider: false,
                    zoom: 6
                });

                var symbol = new SimpleFillSymbol();
                symbol.setColor(null);
                symbol.outline.setColor("blue");
                var gl = new GraphicsLayer({ id: "circles" });
                var geodesic = dom.byId("geodesic");
                map.addLayer(gl);
                map.on("click", function (e) {
                    var radius = map.extent.getWidth() / 10;
                    var circle = new Circle(e.mapPoint, {
                        geodesic: Boolean(domAttr.get(geodesic, "checked")),
                        radius: radius
                    });
                    var graphic = new Grahpic(circle, symbol);
                    gl.add(graphic);
                });
            } catch (error) {
                console.log(error);
            }
        };
        return CirclesController;
    })();
    return CirclesController;
});
//# sourceMappingURL=CirclesController.js.map

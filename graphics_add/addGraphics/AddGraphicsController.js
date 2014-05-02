/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/toolbars/draw", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/PictureFillSymbol", "esri/symbols/CartographicLineSymbol", "esri/graphic", "dojo/dom", "dojo/on", "esri/config"], function(require, exports, Map, Draw, SimpleMarkerSymbol, SimpleLineSymbol, PictureFillSymbol, CartographicLineSymbol, Graphic, dom, on, esriConfig) {
    

    var AddGraphicsController = (function () {
        function AddGraphicsController(mapDiv, initialBasemap) {
            this.mapDiv = mapDiv;
            this.initialBasemap = initialBasemap;
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        AddGraphicsController.prototype.start = function () {
            var _this = this;
            try  {
                this.map = new Map(this.mapDiv, {
                    basemap: this.initialBasemap,
                    center: [-25.312, 34.307],
                    zoom: 3
                });
                this.map.on("load", function () {
                    return _this.initToolbar();
                });
                console.log(this.map);
                this.markerSymbol = new SimpleMarkerSymbol();
                this.markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
                this.markerSymbol.setColor("#00FFFF");

                // lineSymbol used for freehand polyline, polyline and line.
                this.lineSymbol = new CartographicLineSymbol(CartographicLineSymbol.STYLE_SOLID, "blue", 10, CartographicLineSymbol.CAP_ROUND, CartographicLineSymbol.JOIN_MITER, "5");

                // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
                // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png
                this.fillSymbol = new PictureFillSymbol("images/mangrove.png", new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, '#000', 1), 42, 42);
            } catch (error) {
                console.log(error);
            }
        };

        AddGraphicsController.prototype.initToolbar = function () {
            var _this = this;
            this.tb = new Draw(this.map);
            this.tb.on("draw-end", function (evt) {
                return _this.addGraphic(evt);
            });

            // event delegation so a click handler is not
            // needed for each individual button
            on(dom.byId("info"), "click", function (evt) {
                return _this.handleToolbarButtonClick(evt);
            });
        };

        AddGraphicsController.prototype.handleToolbarButtonClick = function (evt) {
            if (evt.target.id === "info") {
                return;
            }
            var tool = evt.target.id.toLowerCase();
            this.map.disableMapNavigation();
            this.tb.activate(tool);
        };

        AddGraphicsController.prototype.addGraphic = function (evt) {
            //deactivate the toolbar and clear existing graphics
            this.tb.deactivate();
            this.map.enableMapNavigation();

            // figure out which symbol to use
            var symbol;
            if (evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
                symbol = this.markerSymbol;
            } else if (evt.geometry.type === "line" || evt.geometry.type === "polyline") {
                symbol = this.lineSymbol;
            } else {
                symbol = this.fillSymbol;
            }

            this.map.graphics.add(new Graphic(evt.geometry, symbol));
        };
        return AddGraphicsController;
    })();
    return AddGraphicsController;
});
//# sourceMappingURL=AddGraphicsController.js.map

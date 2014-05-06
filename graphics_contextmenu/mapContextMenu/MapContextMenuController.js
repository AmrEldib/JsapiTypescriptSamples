/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/geometry/Point", "esri/geometry/Polygon", "esri/toolbars/edit", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/SimpleLineSymbol", "esri/symbols/SimpleFillSymbol", "esri/graphic", "esri/geometry/jsonUtils", "dojo/parser", "dijit/Menu", "dijit/MenuItem", "dijit/MenuSeparator"], function(require, exports, Map, Point, Polygon, Edit, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Graphic, geometryJsonUtils, parser, Menu, MenuItem, MenuSeparator) {
    

    var MapContextMenuController = (function () {
        function MapContextMenuController(mapDiv, initialBasemap) {
            this.mapDiv = mapDiv;
            this.initialBasemap = initialBasemap;
            parser.parse();
        }
        MapContextMenuController.prototype.start = function () {
            try  {
                this.map = new Map(this.mapDiv, {
                    basemap: this.initialBasemap,
                    center: [20.039, 62.739],
                    zoom: 3
                });
                this.map.on("load", this.createToolbarAndContextMenu);
            } catch (error) {
                console.log(error);
            }
        };

        MapContextMenuController.prototype.createToolbarAndContextMenu = function () {
            // Add some graphics to the map
            this.addGraphics();

            // Create and setup editing tools
            this.editToolbar = new Edit(this.map);

            this.map.on("click", function (evt) {
                this.editToolbar.deactivate();
            });

            this.createMapMenu();
            this.createGraphicsMenu();
        };

        MapContextMenuController.prototype.createMapMenu = function () {
            // Creates right-click context menu for map
            this.ctxMenuForMap = new Menu({
                onOpen: function (box) {
                    // Lets calculate the map coordinates where user right clicked.
                    // We'll use this to create the graphic when the user clicks
                    // on the menu item to "Add Point"
                    this.currentLocation = this.getMapPointFromMenuPosition(box);
                    this.editToolbar.deactivate();
                }
            });

            this.ctxMenuForMap.addChild(new MenuItem({
                label: "Add Point",
                onClick: function (evt) {
                    var symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 30, new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, [200, 235, 254, 0.9], 2), [200, 235, 254, 0.5]);
                    var graphic = new Graphic(geometryJsonUtils.fromJson(this.currentLocation.toJson()), symbol);
                    this.map.graphics.add(graphic);
                }
            }));

            this.ctxMenuForMap.startup();
            this.ctxMenuForMap.bindDomNode(this.map.container);
        };

        MapContextMenuController.prototype.createGraphicsMenu = function () {
            // Creates right-click context menu for GRAPHICS
            this.ctxMenuForGraphics = new Menu({});
            this.ctxMenuForGraphics.addChild(new MenuItem({
                label: "Edit",
                onClick: function () {
                    if (this.selected.geometry.type !== "point") {
                        this.editToolbar.activate(Edit.EDIT_VERTICES, this.selected);
                    } else {
                        alert("Not implemented");
                    }
                }
            }));

            this.ctxMenuForGraphics.addChild(new MenuItem({
                label: "Move",
                onClick: function () {
                    this.editToolbar.activate(Edit.MOVE, this.selected);
                }
            }));

            this.ctxMenuForGraphics.addChild(new MenuItem({
                label: "Rotate/Scale",
                onClick: function () {
                    if (this.selected.geometry.type !== "point") {
                        this.editToolbar.activate(Edit.ROTATE | Edit.SCALE, this.selected);
                    } else {
                        alert("Not implemented");
                    }
                }
            }));

            this.ctxMenuForGraphics.addChild(new MenuItem({
                label: "Style",
                onClick: function () {
                    alert("Not implemented");
                }
            }));

            this.ctxMenuForGraphics.addChild(new MenuSeparator());
            this.ctxMenuForGraphics.addChild(new MenuItem({
                label: "Delete",
                onClick: function () {
                    this.map.graphics.remove(this.selected);
                }
            }));

            this.ctxMenuForGraphics.startup();

            this.map.graphics.on("mouse-over", this.handleMouseOver);

            this.map.graphics.on("mouse-out", this.handleMouseOut);
        };

        MapContextMenuController.prototype.handleMouseOver = function (evt) {
            // We'll use this "selected" graphic to enable editing tools
            // on this graphic when the user click on one of the tools
            // listed in the menu.
            this.selected = evt.graphic;

            // Let's bind to the graphic underneath the mouse cursor
            this.ctxMenuForGraphics.bindDomNode(evt.graphic.getDojoShape().getNode());
        };

        MapContextMenuController.prototype.handleMouseOut = function (evt) {
            this.ctxMenuForGraphics.unBindDomNode(evt.graphic.getDojoShape().getNode());
        };

        MapContextMenuController.prototype.getMapPointFromMenuPosition = function (box) {
            var x = box.x, y = box.y;
            switch (box.corner) {
                case "TR":
                    x += box.w;
                    break;
                case "BL":
                    y += box.h;
                    break;
                case "BR":
                    x += box.w;
                    y += box.h;
                    break;
            }

            var screenPoint = new Point(x - this.map.position.x, y - this.map.position.y);
            return this.map.toMap(screenPoint);
        };

        MapContextMenuController.prototype.addGraphics = function () {
            // Adds pre-defined geometries to map
            var polygonSymbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new SimpleLineSymbol(SimpleLineSymbol.STYLE_DOT, [151, 249, 0, .80], 3), [151, 249, 0, 0.45]);

            var polygon = new Polygon({
                "rings": [
                    [
                        [-4226661.916056009, 8496372.808143634],
                        [-3835304.3312360067, 8731187.359035634],
                        [-2269873.991956003, 9005137.668409634],
                        [-1213208.5129420012, 8613780.083589634],
                        [-1017529.7205320001, 8065879.464841632],
                        [-1213208.5129420012, 7478843.087611631],
                        [-2230738.233474003, 6891806.710381631],
                        [-2935181.8861500043, 6735263.6764536295],
                        [-3522218.263380006, 6891806.710381631],
                        [-3952711.606682008, 7165757.01975563],
                        [-4265797.674538009, 7283164.295201631],
                        [-4304933.433020009, 7635386.121539632],
                        [-4304933.433020009, 7674521.880021632],
                        [-4226661.916056009, 8496372.808143634]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100
                }
            });

            var arrow = new Polygon({
                "rings": [
                    [
                        [9862211.137464028, 6617856.40100763],
                        [8922952.933896024, 5522055.163511626],
                        [8922952.933896024, 5991684.265295628],
                        [6105178.323192019, 5991684.265295628],
                        [6105178.323192019, 7087485.50279163],
                        [8922952.933896024, 7087485.50279163],
                        [8922952.933896024, 7557114.604575632],
                        [9862211.137464028, 6617856.40100763]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100
                }
            });

            var triangle = new Polygon({
                "rings": [
                    [
                        [2426417.02588401, 8535508.566625634],
                        [4304933.433020014, 12292541.380897645],
                        [6183449.840156019, 8535508.566625634],
                        [2426417.02588401, 8535508.566625634]
                    ]
                ],
                "spatialReference": {
                    "wkid": 102100
                }
            });

            this.map.graphics.add(new Graphic(polygon, polygonSymbol));
            this.map.graphics.add(new Graphic(arrow, polygonSymbol));
            this.map.graphics.add(new Graphic(triangle, polygonSymbol));
        };
        return MapContextMenuController;
    })();
    return MapContextMenuController;
});
//# sourceMappingURL=MapContextMenuController.js.map

/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import Circle = require("esri/geometry/Circle");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
import Grahpic = require("esri/graphic");
import GraphicsLayer = require("esri/layers/GraphicsLayer");
import dom = require("dojo/dom");
import domAttr = require("dojo/dom-attr");

export = CirclesController;

class CirclesController {

    constructor(public mapDiv: string, public initialBasemap: string) {
    }

    start() {

        try {
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

        }
        catch (error) {
            console.log(error);
        }
    }
}
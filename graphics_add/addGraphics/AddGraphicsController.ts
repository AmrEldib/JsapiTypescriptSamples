/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import Draw = require("esri/toolbars/draw");
import SimpleMarkerSymbol = require("esri/symbols/SimpleMarkerSymbol");
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
import PictureFillSymbol = require("esri/symbols/PictureFillSymbol");
import CartographicLineSymbol = require("esri/symbols/CartographicLineSymbol");
import Graphic = require("esri/graphic");
import dom = require("dojo/dom");
import on = require("dojo/on");
import esriConfig = require("esri/config");

export = AddGraphicsController;

class AddGraphicsController {

    map: Map;
    tb: Draw;
    markerSymbol: SimpleMarkerSymbol;
    lineSymbol: CartographicLineSymbol;
    fillSymbol: PictureFillSymbol;

    constructor(public mapDiv: string,
        public initialBasemap: string) {

        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

    }

    start() {

        try {
            this.map = new Map(this.mapDiv, {
                basemap: this.initialBasemap,
                center: [-25.312, 34.307],
                zoom: 3
            });
            this.map.on("load", () => this.initToolbar());
            console.log(this.map);
            this.markerSymbol = new SimpleMarkerSymbol();
            this.markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
            this.markerSymbol.setColor("#00FFFF");

            // lineSymbol used for freehand polyline, polyline and line.
            this.lineSymbol = new CartographicLineSymbol(
                CartographicLineSymbol.STYLE_SOLID,
                "blue", 10,
                CartographicLineSymbol.CAP_ROUND,
                CartographicLineSymbol.JOIN_MITER, "5"
                );

            // fill symbol used for extent, polygon and freehand polygon, use a picture fill symbol
            // the images folder contains additional fill images, other options: sand.png, swamp.png or stiple.png
            this.fillSymbol = new PictureFillSymbol(
                "images/mangrove.png",
                new SimpleLineSymbol(
                    SimpleLineSymbol.STYLE_SOLID,
                    '#000',
                    1
                    ),
                42,
                42
                );

        }
        catch (error) {
            console.log(error);
        }
    }

    initToolbar() {
        this.tb = new Draw(this.map);
        this.tb.on("draw-end", (evt) => this.addGraphic(evt));

        // event delegation so a click handler is not
        // needed for each individual button
        on(dom.byId("info"), "click", (evt) => this.handleToolbarButtonClick(evt));
    }

    handleToolbarButtonClick(evt) {
        if (evt.target.id === "info") {
            return;
        }
        var tool = evt.target.id.toLowerCase();
        this.map.disableMapNavigation();
        this.tb.activate(tool);
    }

    addGraphic(evt) {
        //deactivate the toolbar and clear existing graphics 
        this.tb.deactivate();
        this.map.enableMapNavigation();

        // figure out which symbol to use
        var symbol;
        if (evt.geometry.type === "point" || evt.geometry.type === "multipoint") {
            symbol = this.markerSymbol;
        } else if (evt.geometry.type === "line" || evt.geometry.type === "polyline") {
            symbol = this.lineSymbol;
        }
        else {
            symbol = this.fillSymbol;
        }

        this.map.graphics.add(new Graphic(evt.geometry, symbol));
    }

}
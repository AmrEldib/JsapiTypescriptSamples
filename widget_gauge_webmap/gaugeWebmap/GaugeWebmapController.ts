﻿/// <reference path="../../lib/esri.d.ts" />

import arcgisUtils = require("esri/arcgis/utils");
import Gauge = require("esri/dijit/Gauge");
import Graphic = require("esri/graphic");
import GraphicsLayer = require("esri/layers/GraphicsLayer");
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
import arrayUtils = require("dojo/_base/array");
import Color = require("esri/Color");
import fx = require("dojo/_base/fx");
import dom = require("dojo/dom");
import domConstruct = require("dojo/dom-construct");
import domStyle = require("dojo/dom-style");
import parser = require("dojo/parser");
import registry = require("dijit/registry");
import esriConfig = require("esri/config");


export = GaugeWebmapController;

class GaugeWebmapController {

    constructor(public map: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    start() {

        try {
            var agol_map = new arcgisUtils.createMap("2c8a6fe72ae44a5f8e6d1ddd02fe11db", this.map);
            agol_map.then(
                function (response) {
                    // Keep a reference to the map
                    app.map = response.map;

                    createWidgets(response);
                },
                function (err) {
                    console.log("err from arcgis.com: ", err);
                }
                );

            function createWidgets(resp) {
                // look for gauges in the webmap
                var itemData = resp.itemInfo.itemData;
                if (!itemData.hasOwnProperty("widgets") ||
                    !itemData.widgets.hasOwnProperty("gadgets") ||
                    itemData.widgets.gadgets.length == 0) {
                    return;
                }

                app.gauges = arrayUtils.filter(itemData.widgets.gadgets, function (g) {
                    return g.type == "gauge";
                });
                // also add a reference to the layer to the gadget JSON
                arrayUtils.forEach(app.gauges, function (g) {
                    g.fromWebmap = true;
                    // g.layer = app.map.getLayer(g.layerId);
                });
                console.log("app.gauges: ", app.gauges);

                // create the gauges
                app._gauges = [];
                arrayUtils.forEach(app.gauges, function (g, idx) {
                    var gaugeDiv = domConstruct.create("div", null, dom.byId("dashboardWidgets"));
                    var gaugeId = "gauge_" + idx;
                    g._id = gaugeId;
                    // console.log("gauge def: ", g);
                    app._gauges.push(g);
                    app[gaugeId] = new Gauge(g, gaugeDiv);
                    app[gaugeId].startup();
                });

                // highlight features on mouse over
                app.hGraphics = new GraphicsLayer({ "id": "highlights" });
                app.map.addLayer(app.hGraphics);

                var hOutline = new SimpleLineSymbol()
                    .setColor(app.gauges[0].color).setWidth(3);
                app.highlight = new SimpleFillSymbol()
                    .setColor(new Color([0, 0, 0, 0]))
                    .setOutline(hOutline);

                var gaugeLayer = app.map.getLayer(app.map.graphicsLayerIds[0]);
                // console.log("gaugeLayer: ", gaugeLayer, app.gauges[0].layerId);
                gaugeLayer.on("mouse-over", function (e) {
                    app.hGraphics.clear();
                    app.hGraphics.add(
                        new Graphic(
                            e.graphic.geometry,
                            app.highlight
                            )
                        );
                    // update the gauges
                    arrayUtils.forEach(app._gauges, function (gauge) {
                        app[gauge._id].set("feature", e);
                    });
                });

                // fade out the loading icon and div once the map loads
                var fade = fx.fadeOut({
                    node: "loading",
                    onEnd: function () {
                        domStyle.set(registry.byId("container").domNode, "visibility", "visible");
                        domConstruct.destroy(dom.byId("loading"));
                    }
                });
                // connect.connect(fade, );
                fade.play();

            };        

        }

        catch (error) {
            console.log(error);
        }

    }
}
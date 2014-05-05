/// <reference path="../../lib/esri.d.ts" />

import on = require("dojo/on");
import dom = require("dojo/dom");
import registry = require("dijit/registry");
import domConstruct = require("dojo/dom-construct");
import parser = require("dojo/parser");
import ContentPane = require("dijit/layout/ContentPane");
import Map = require("esri/map");
import arcgisUtils = require("esri/arcgis/utils");
import coreFx = require("dojo/fx");
import baseFx = require("dojo/_base/fx");
import config = require("esri/config");

export = FadeWebmapsController;

class FadeWebmapsController {

    constructor(public mainWindow: string) {
        parser.parse();
        config.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    currentMap: Map;
    previousMap: Map;
    counter: number;
    webmaps: string[];

    start() {

        try {

            this.counter = -1;
            this.webmaps = [
                "d94dcdbe78e141c2b2d3a91d5ca8b9c9", // national geographic basemap
                "d802f08316e84c6592ef681c50178f17", // imagery
                "dbbe6ca611ba460ea9a3ba5133d54969", // topo
                "f28762ef94ef4700864fd57d0ef7ec7a" // streets
            ];

            on(dom.byId("show_next"), "click", this.nextMap);
            this.loadNext();

        }

        catch (error) {
            console.log("ERROR " + error);
        }

    }

    loadNext(map?: Map) {
        //create the content pane for the map
        var mapPane = new ContentPane({
            "content": "",
            "id": "map" + (++this.counter),
            "region": "center"
        }, domConstruct.create("div"));

        //add the newly constructed content pane to the page 
        registry.byId(this.mainWindow).addChild(mapPane);

        var deferred;
        if (map && map.hasOwnProperty("extent")) {
            deferred = arcgisUtils.createMap((this.webmaps[this.counter % this.webmaps.length]), mapPane.domNode.id, {
                mapOptions: {
                    extent: map.extent
                }
            });
        } else {
            deferred = arcgisUtils.createMap((this.webmaps[this.counter % this.webmaps.length]), mapPane.domNode.id);
        }
        deferred.then(function (response) {
            dom.byId("current_map").innerHTML = response.itemInfo.item.title;
            this.fadeMap(response.map);
        });
    }

    fadeMap(map: Map) {
        this.currentMap = map;

        if (this.currentMap.loaded) {
            if (this.previousMap) {
                // References:
                // http://dojotoolkit.org/documentation/tutorials/1.6/effects/
                // http://dojotoolkit.org/documentation/tutorials/1.6/animation/
                var combinedAnim = coreFx.combine([
                    baseFx.fadeIn({
                        node: this.currentMap.container,
                        duration: 1000
                    }),
                    baseFx.fadeOut({
                        node: this.previousMap.container,
                        duration: 1000,
                        onEnd: this.removePrevious
                    })
                ]);
                combinedAnim.play();
            } else {
                baseFx.fadeIn({ node: this.currentMap.container }).play();
            }
        } else {
            // handle map onLoad from webmap
            map.on("load", function () {
                this.fadeMap(map);
            });
        }
    }

    removePrevious() {
        this.previousMap.destroy();
        domConstruct.destroy(this.previousMap.container);
    }

    nextMap() {
        if (this.currentMap) {
            this.previousMap = this.currentMap;
            this.loadNext(this.currentMap);
        };
    }

}
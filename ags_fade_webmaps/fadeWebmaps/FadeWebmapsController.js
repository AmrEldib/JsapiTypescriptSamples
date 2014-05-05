/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "dojo/on", "dojo/dom", "dijit/registry", "dojo/dom-construct", "dojo/parser", "dijit/layout/ContentPane", "esri/arcgis/utils", "dojo/fx", "dojo/_base/fx", "esri/config"], function(require, exports, on, dom, registry, domConstruct, parser, ContentPane, arcgisUtils, coreFx, baseFx, config) {
    

    var FadeWebmapsController = (function () {
        function FadeWebmapsController(mainWindow) {
            this.mainWindow = mainWindow;
            parser.parse();
            config.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        FadeWebmapsController.prototype.start = function () {
            try  {
                this.counter = -1;
                this.webmaps = [
                    "d94dcdbe78e141c2b2d3a91d5ca8b9c9",
                    "d802f08316e84c6592ef681c50178f17",
                    "dbbe6ca611ba460ea9a3ba5133d54969",
                    "f28762ef94ef4700864fd57d0ef7ec7a"
                ];

                on(dom.byId("show_next"), "click", this.nextMap);
                this.loadNext();
            } catch (error) {
                console.log("ERROR " + error);
            }
        };

        FadeWebmapsController.prototype.loadNext = function (map) {
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
        };

        FadeWebmapsController.prototype.fadeMap = function (map) {
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
        };

        FadeWebmapsController.prototype.removePrevious = function () {
            this.previousMap.destroy();
            domConstruct.destroy(this.previousMap.container);
        };

        FadeWebmapsController.prototype.nextMap = function () {
            if (this.currentMap) {
                this.previousMap = this.currentMap;
                this.loadNext(this.currentMap);
            }
            ;
        };
        return FadeWebmapsController;
    })();
    return FadeWebmapsController;
});
//# sourceMappingURL=FadeWebmapsController.js.map

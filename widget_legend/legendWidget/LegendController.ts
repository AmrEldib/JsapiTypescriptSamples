/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import FeatureLayer = require("esri/layers/FeatureLayer");
import Legend = require("esri/dijit/Legend");
import arrayUtils = require("dojo/_base/array");
import parser = require("dojo/parser");
import esriConfig = require("esri/config");

export = LegendController;

class LegendController {

    constructor(public mapDiv: string,
        public initialBasemap: string,
        public legendDiv: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

    }

    start() {

        try {
            var map = new Map(this.mapDiv, {
                basemap: this.initialBasemap,
                center: [-96.53, 38.374],
                zoom: 13
            });

            var rivers = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/1", {
                mode: FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"]
            });
            var waterbodies = new FeatureLayer("http://sampleserver3.arcgisonline.com/ArcGIS/rest/services/Hydrography/Watershed173811/MapServer/0", {
                mode: FeatureLayer.MODE_ONDEMAND,
                outFields: ["*"]
            });

            //add the legend
            map.on("layers-add-result", function (evt) {
                var layerInfo = arrayUtils.map(evt.layers, function (layer, index) {
                    return { layer: layer.layer, title: layer.layer.name };
                });
                if (layerInfo.length > 0) {
                    var legendDijit = new Legend({
                        map: map,
                        layerInfos: layerInfo
                    }, this.legendDiv);
                    legendDijit.startup();
                }
            });

            map.addLayers([waterbodies, rivers]);
        }
        catch (error) {
            console.log(error);
        }
    }
}
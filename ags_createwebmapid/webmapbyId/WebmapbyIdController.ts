/// <reference path="../../lib/esri.d.ts" />

import parser = require("dojo/parser");
import dom = require("dojo/dom");
import Map = require("esri/map");
import arcgisUtils = require("esri/arcgis/utils");
import Legend = require("esri/dijit/Legend");
import Scalebar = require("esri/dijit/Scalebar");
import esriConfig = require("esri/config");


export = WebmapbyIdController;

class WebmapbyIdController {

    constructor(public map: string, public legend: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    start() {

        try {
            arcgisUtils.createMap("4778fee6371d4e83a22786029f30c7e1", this.map).then(function (response) {
            //update the app 
            dom.byId("title").innerHTML = response.itemInfo.item.title;
            dom.byId("subtitle").innerHTML = response.itemInfo.item.snippet;

            var map = response.map;

            //add the scalebar 
            var scalebar = new Scalebar({
                map: map,
                scalebarUnit: "english"
            });

            //add the legend. Note that we use the utility method getLegendLayers to get 
            //the layers to display in the legend from the createMap response.
            var legendLayers = arcgisUtils.getLegendLayers(response);
            var legendDijit = new Legend({
                map: map,
                layerInfos: legendLayers
            }, this.legend);
            legendDijit.startup();


            });

        }

        catch (error) {
            console.log(error);
        }

    }
}
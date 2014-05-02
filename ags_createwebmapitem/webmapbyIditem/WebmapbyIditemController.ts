/// <reference path="../../lib/esri.d.ts" />

import parser = require("dojo/parser");
import dom = require("dojo/dom");
import Map = require("esri/map");
import Extent = require("esri/geometry/Extent");
import urlUtils = require("esri/urlUtils");
import arcgisUtils = require("esri/arcgis/utils");
import Legend = require("esri/dijit/Legend");
import Scalebar = require("esri/dijit/Scalebar");
import esriConfig = require("esri/config");


export = WebmapbyIditemController;

class WebmapbyIditemController {

    constructor(public map: string, public legend: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    start() {

        try {
        var webmap = {};
        webmap.item = {
            "title": "Soil Survey Map of USA",
            "snippet": "This map shows the Soil Survey Geographic (SSURGO) by the United States Department of Agriculture's Natural Resources Conservation Service.",
            "extent": [[-139.4916, 10.7191], [-52.392, 59.5199]]
        };

        webmap.itemData = {
            "operationalLayers": [{
                "url": "http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/Soil_Survey_Map/MapServer",
                "visibility": true,
                "opacity": 0.75,
                "title": "Soil Survey Map",
                "itemId": "204d94c9b1374de9a21574c9efa31164"
            }],
            "baseMap": {
                "baseMapLayers": [{
                    "opacity": 1,
                    "visibility": true,
                    "url": "http://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer"
                }, {
                        "isReference": true,
                        "opacity": 1,
                        "visibility": true,
                        "url": "http://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer"
                    }],
                "title": "World_Terrain_Base"
            },
            "version": "1.1"
        };

        dom.byId("title").innerHTML = webmap.item.title;
        dom.byId("subtitle").innerHTML = webmap.item.snippet;

        arcgisUtils.createMap(webmap, this.map).then(function (response) {


            var map = response.map;

            //By default the extent will be that of the web map. Here we change it 
            //to a custom extent. 
            var extent = new Extent({
                "xmin": "-13529153",
                "ymin": "4665612",
                "xmax": "-13281497",
                "ymax": "872422882",
                "spatialReference": { "wkid": 102100 }
            });
            map.setExtent(extent);


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
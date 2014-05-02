/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import BasemapGallery = require("esri/dijit/BasemapGallery");
import arcgisUtils = require("esri/arcgis/utils");
import esriConfig = require("esri/config");
import parser = require("dojo/parser");

export = BasemapGalleryController;

class BasemapGalleryController {
        
    constructor(public mapDiv: string, public basemapGalleryDiv: string, public initialBasemap: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    start() {

        try {
            var map = new Map(this.mapDiv, {
                basemap: this.initialBasemap,
                center: [-105.255, 40.022],
                zoom: 13
            });
             
            //add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
            var basemapGallery = new BasemapGallery({
                showArcGISBasemaps: true,
                map: map
            }, this.basemapGalleryDiv);
            basemapGallery.startup();

            basemapGallery.on("error", function (msg) {
                console.log("basemap gallery error:  ", msg);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
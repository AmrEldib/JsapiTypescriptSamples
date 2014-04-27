/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import Scalebar = require("esri/dijit/Scalebar");
import parser = require("dojo/parser");
import esriConfig = require("esri/config");

export = ScalebarController;

class ScalebarController {
        
    constructor(public mapDiv: string,
        public initialBasemap: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

    }

    start() {

        try {
            var map = new Map(this.mapDiv, {
                basemap: this.initialBasemap,
                center: [-116.093, 34.218],
                zoom: 7
            });

            var scalebar = new Scalebar({
                map: map,
                // "dual" displays both miles and kilmometers
                // "english" is the default, which displays miles
                // use "metric" for kilometers
                scalebarUnit: "dual"
            });

        }
        catch (error) {
            console.log(error);
        }
    }
}
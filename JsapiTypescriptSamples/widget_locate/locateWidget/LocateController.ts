/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import LocateButton = require("esri/dijit/LocateButton");
import esriConfig = require("esri/config");

export = LocateController;

class LocateController {
        
    constructor(public mapDiv: string,
        public initialBasemap: string,
        public locateButtonDiv: string) {
        
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

    }

    start() {

        try {
            var map = new Map(this.mapDiv, {
                basemap: this.initialBasemap,
                center: [-70.6508, 43.1452],
                zoom: 16
            });

            var geoLocate = new LocateButton({
                map: map
            }, this.locateButtonDiv);
            geoLocate.startup();

        }
        catch (error) {
            console.log(error);
        }
    }
}
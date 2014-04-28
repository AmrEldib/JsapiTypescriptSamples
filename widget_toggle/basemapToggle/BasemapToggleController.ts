/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import BasemapToggle = require("esri/dijit/BasemapToggle");
import esriConfig = require("esri/config");

export = BasemapToggleController;

class BasemapToggleController {
        
    constructor(public mapDiv: string,
        public basemapToggleDiv: string,
        public initialBasemap: string,
        public otherBasemap: string) {
        
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

    }

    start() {

        try {
            var map = new Map(this.mapDiv, {
                basemap: this.initialBasemap,
                center: [-70.6508, 43.1452],
                zoom: 16
            });

            var toggle = new BasemapToggle({
                map: map,
                basemap: this.otherBasemap
            }, this.basemapToggleDiv);
            toggle.startup();

        }
        catch (error) {
            console.log(error);
        }
    }
}
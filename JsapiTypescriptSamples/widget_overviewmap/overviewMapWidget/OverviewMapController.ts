/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import OverviewMap = require("esri/dijit/OverviewMap");
import parser = require("dojo/parser");
import esriConfig = require("esri/config");

export = OverviewMapController;

class OverviewMapController {
        
    constructor(public mapDiv: string,
        public initialBasemap: string,
        public overviewMapDiv: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

    }

    start() {

        try {
            var map = new Map(this.mapDiv, {
                basemap: this.initialBasemap,
                center: [-70.6508, 43.1452],
                zoom: 16
            });

            var overviewMapDijit = new OverviewMap({
                map: map,
                visible: true
            }, this.overviewMapDiv);
            overviewMapDijit.startup();

        }
        catch (error) {
            console.log(error);
        }
    }
}
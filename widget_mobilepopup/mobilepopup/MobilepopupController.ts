/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import arcgisUtils = require("esri/arcgis/utils");
import PopupMobile = require("esri/dijit/PopupMobile");
import domConstruct = require("dojo/dom-construct");
import parser = require("dojo/parser");
import esriConfig = require("esri/config");

export = MobilepopupController;

class MobilepopupController {
        
    constructor(public map: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    start() {

        try {
            var popup = new PopupMobile(null, domConstruct.create("div"));
            arcgisUtils.createMap("1df512c380994cc5a3dad2e2d428eea3", this.map, {
                mapOptions: {
                    center: [-59.48, 44.066],
                    zoom: 4,
                    infoWindow: popup
                }
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
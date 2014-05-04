/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import parser = require("dojo/parser");

export = SampleController;

class SampleController {
        
    constructor(public param: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    start() {

        try {
            // This is just a sample. It does nothing
        }
        catch (error) {
            console.log(error);
        }
    }
}
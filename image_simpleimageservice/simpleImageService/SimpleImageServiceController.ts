/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import ArcGISImageServiceLayer = require("esri/layers/ArcGISImageServiceLayer");
import ImageServiceParameters = require("esri/layers/ImageServiceParameters");
import parser = require("dojo/parser");
import esriConfig = require("esri/config");

export = SimpleImageServiceController;

class SimpleImageServiceController {
        
    constructor(public mapDiv: string,
        public initialBasemap: string,
        public imageServiceLayerUrl: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    start() {

        try {
            var map = new Map(this.mapDiv, {
                basemap: this.initialBasemap,
                center: [-79.40, 43.64],
                zoom: 12
            });

            var params = new ImageServiceParameters();
            params.noData = 0;
            var imageServiceLayer = new ArcGISImageServiceLayer(this.imageServiceLayerUrl, {
                imageServiceParameters: params,
                opacity: 0.75
            });
            map.addLayer(imageServiceLayer);

        }
        catch (error) {
            console.log(error);
        }
    }
}
/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import esriConfig = require("esri/config");

esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

var map = new Map("mapDiv", {
    basemap: "topo",
    center: [-122.45, 37.75], // longitude, latitude
    zoom: 13
});




/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import HomeButton = require("esri/dijit/HomeButton");
import esriConfig = require("esri/config");

esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";

var map = new Map("mapDiv", {
    center: [-56.049, 38.485],
    zoom: 3,
    basemap: "streets"
});

var home = new HomeButton({
    map: map
}, "homeButtonDiv");
home.startup();





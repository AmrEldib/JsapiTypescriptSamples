/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import esriConfig = require("esri/config");

esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
esriConfig.defaults.map.panDuration = 1; // time in milliseconds, default panDuration: 250
esriConfig.defaults.map.panRate = 1; // default panRate: 25
esriConfig.defaults.map.zoomDuration = 100; // default zoomDuration: 500
esriConfig.defaults.map.zoomRate = 1; // default zoomRate: 25

var map = new Map("mapDiv", {
    basemap: "satellite",
    center: [-93.5, 36.972],
    zoom: 5
});

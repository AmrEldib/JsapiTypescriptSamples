/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import InfoTemplate = require("esri/InfoTemplate");
import FeatureLayer = require("esri/layers/FeatureLayer");
import SimpleRenderer = require("esri/renderers/SimpleRenderer");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
import SimpleLineSymbol = require("esri/symbols/SimpleLineSymbol");
import dom = require("dojo/dom");
import number = require("dojo/number");
import on = require("dojo/on");
import parser = require("dojo/parser");
import Color = require("esri/Color");
import esriConfig = require("esri/config");

export = FormatInfowindowController;

class FormatInfowindowController {

    constructor(public map: string) {
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    start() {

        try {

            //var map, compare, compare2; 

            parser.parse();

            map = new Map(this.map, {
                basemap: "streets",
                center: [-86.796, 47.13],
                zoom: 7
            });

            var infoTemplate = new InfoTemplate();
            infoTemplate.setTitle("Population in ${NAME}");
            infoTemplate.setContent("<b>2007 :D: </b>${POP2007:compare}<br/>" +
                "<b>2007 density: </b>${POP07_SQMI:compare}<br/><br/>" +
                "<b>2000: </b>${POP2000:NumberFormat}<br/>" +
                "<b>2000 density: </b>${POP00_SQMI:NumberFormat}");

            var counties = new FeatureLayer("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Census_USA/MapServer/3", {
                mode: FeatureLayer.MODE_SNAPSHOT,
                infoTemplate: infoTemplate,
                outFields: [
                    "NAME", "POP2000", "POP2007", "POP00_SQMI",
                    "POP07_SQMI"
                ]
            });

            counties.setDefinitionExpression("STATE_NAME = 'Michigan'");

            //apply a renderer
            var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
                new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                    new Color([255, 255, 255, 0.35]), 1),
                new Color([109, 146, 155, 0.35]));
            counties.setRenderer(new SimpleRenderer(symbol));

            map.addLayer(counties);

            on(dom.byId("chkT1"), "click", changeInfoTemplate);
            on(dom.byId("chkT2"), "click", changeInfoTemplate);

            dom.byId("chkT1").checked = true;

            compare = function (value, key, data) {
                var result = "", diff, pctChange;

                switch (key) {
                    case "POP2007":
                        result = value > data.POP2000 ? "images/up.png" : "images/down.png";
                        diff = data.POP2007 - data.POP2000;
                        pctChange = (diff * 100) / data.POP2000;
                        break;

                    case "POP07_SQMI":
                        result = value > data.POP00_SQMI ? "images/up.png" : "images/down.png";
                        diff = data.POP07_SQMI - data.POP00_SQMI;
                        pctChange = (diff * 100) / data.POP00_SQMI;
                        break;
                }

                return number.format(value) +
                    "   <img src='" + result + "'/>" +
                    "  <span style='color: " +
                    (pctChange < 0 ? "red" : "green") + ";'>"
                    + number.format(pctChange, { places: 3 }) +
                    "%</span>";
            };

            compare2 = function (value, key, data) {
                var diff = data.POP2007 - data.POP2000;
                var result = diff > 0 ? "images/up.png" : "images/down.png";
                var pctChange = (diff * 100) / data.POP2000;

                return "<img src='" + result + "'/>" +
                    "  <span style='color: " +
                    (pctChange < 0 ? "red" : "green") + ";'>"
                    + number.format(pctChange, { places: 3 }) +
                    "%</span>";
            };

            function changeInfoTemplate() {
                console.log("changed");
                map.infoWindow.hide();

                var t1Checked = dom.byId("chkT1").checked;
                var t2Checked = dom.byId("chkT2").checked;
                var templateContent = "";

                if (t1Checked) {
                    templateContent = "<b>2007: </b>${POP2007:compare}<br/>" +
                    "<b>2007 density: </b>${POP07_SQMI:compare}<br/><br/>" +
                    "<b>2000: </b>${POP2000:NumberFormat}<br/>" +
                    "<b>2000 density: </b>${POP00_SQMI:NumberFormat}";
                }
                else if (t2Checked) {
                    templateContent = "<b>2007: </b>${POP2007}<br/>" +
                    "<b>2007 density: </b>${POP07_SQMI}<br/><br/>" +
                    "<b>2000: </b>${POP2000:NumberFormat}<br/>" +
                    "<b>2000 density: </b>${POP00_SQMI:NumberFormat}<br/><br/>" +
                    "Diff: ${DIFF:compare2}";
                }

                counties.infoTemplate.setContent(templateContent);


            }
        }

        catch (error) {
            console.log(error);
        }

    }
}
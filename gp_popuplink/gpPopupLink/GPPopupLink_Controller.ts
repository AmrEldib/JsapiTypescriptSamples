/// <reference path="../../lib/esri.d.ts" />

import Map = require("esri/map");
import arcgisUtils = require("esri/arcgis/utils");
import Geoprocessor = require("esri/tasks/Geoprocessor");
import GeometryService = require("esri/tasks/GeometryService");
import BufferParameters = require("esri/tasks/BufferParameters");
import webMercatorUtils = require("esri/geometry/webMercatorUtils");
import SpatialReference = require("esri/SpatialReference");
import FeatureSet = require("esri/tasks/FeatureSet");
import SimpleFillSymbol = require("esri/symbols/SimpleFillSymbol");
import Graphic = require("esri/graphic");
import config = require("esri/config");
import domConstruct = require("dojo/dom-construct");
import query = require("dojo/query");
import on = require("dojo/on");
import domAttr = require("dojo/dom-attr");
import dom = require("dojo/dom");
import parser = require("dojo/parser");
import Color = require("esri/Color");


export = FormatInfowindowController;

class FormatInfowindowController {

    constructor(public map: string) {
        parser.parse();
        config.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
    }

    start() {

        try {

            var map;

            //This service is for development and testing purposes only. We recommend that you create your own geometry service for use within your applications. 
            config.defaults.geometryService = new GeometryService("http://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
            //config.defaults.io.proxyUrl = "/proxy";

            //create the map based on an arcgis online webmap id 
            arcgisUtils.createMap("a193c5459e6e4fd99ebf09d893d65cf0", this.map).then(function (response) {

                window.map = response.map;

                //setup the geoprocessing tool that will run when users click the new link. This tool 
                //calculates the population in the specified area. 
                window.gp = new Geoprocessor("http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Demographics/ESRI_Population_World/GPServer/PopulationSummary");

                //create a link that we'll the map's popup window.
                //The link section of the popup has a class called actionList assigned so we can
                //use dojo/query to find the elements with this class name. 
                var link = domConstruct.create("a", {
                    "class": "action",
                    "id": "statsLink",
                    "innerHTML": "Population", //text that appears in the popup for the link 
                    "href": "javascript: void(0);"
                }, query(".actionList", window.map.infoWindow.domNode)[0]);


                //when the link is clicked register a function that will run 
                on(link, "click", calculatePopulation);

            });

            function calculatePopulation(evt) {
                //display a message so user knows something is happening
                domAttr.set(dom.byId("statsLink"), "innerHTML", "Calculating...");

                //Get the feature associated with the displayed popup and use it as 
                //input to the geoprocessing task. The geoprocessing task will calculate 
                //population statistics for the area within the specified buffer distance. 
                var feature = window.map.infoWindow.getSelectedFeature();

                var param = new BufferParameters();
                param.geometries = [webMercatorUtils.webMercatorToGeographic(feature.geometry)];

                param.distances = [10]; //buffer distance
                param.unit = GeometryService.UNIT_KILOMETER;
                param.bufferSpatialReference = new SpatialReference({ "wkid": 4326 });
                param.outSpatialReference = new SpatialReference({ "wkid": 102100 });
                param.geodesic = true;

                config.defaults.geometryService.buffer(param, function (geometries) {

                    var graphic = new Graphic(geometries[0]);
                    graphic.setSymbol(new SimpleFillSymbol().setColor(new Color([0, 255, 255, .25])));

                    window.map.graphics.add(graphic);


                    //Use the buffered geometry as input to the GP task 
                    var featureSet = new FeatureSet();
                    featureSet.geometryType = "esriGeometryPolygon";
                    featureSet.features = [graphic];
                    var taskParams = {
                        "inputPoly": featureSet
                    };
                    window.gp.execute(taskParams, gpResultAvailable, gpFailure);


                });
            }

            function gpResultAvailable(results, messages) {
                domAttr.set(dom.byId("statsLink"), "innerHTML", "Population");
                //clear any existing features displayed in the popup 
                window.map.infoWindow.clearFeatures();

                //display the query results 
                var content = "";
                if (results.length > 0) {
                    content = "Population = " + results[0].value.features[0].attributes.SUM;
                } else {
                    content = "No Results Found"
            }
                window.map.infoWindow.setContent(content);
            }
            function gpFailure(error) {
                domAttr.set(dom.byId("statsLink"), "innerHTML", "Population");

                var details = domConstruct.create("div", {
                    "innerHTML": "Population = " + error
                }, query(".break", window.map.infoWindow.domNode)[0], "after");
                console.error("Error occurred: ", error);
            }
        }

        catch (error) {
            console.log(error);
        }

    }
}
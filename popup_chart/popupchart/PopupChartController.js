/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/dijit/Popup", "esri/dijit/PopupTemplate", "esri/layers/FeatureLayer", "dojo/dom-class", "dojo/dom-construct", "dojo/parser", "esri/config"], function(require, exports, Map, Popup, PopupTemplate, FeatureLayer, domClass, domConstruct, parser, esriConfig) {
    

    var PopupChartController = (function () {
        function PopupChartController(map) {
            this.map = map;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        PopupChartController.prototype.start = function () {
            try  {
                //The popup is the default info window so you only need to create the popup and
                //assign it to the map if you want to change default properties. Here we are
                //noting that the specified title content should display in the header bar
                var popup = new Popup({
                    titleInBody: false
                }, domConstruct.create("div"));

                var map = new Map(this.map, {
                    basemap: "gray",
                    center: [-98.57, 39.82],
                    zoom: 4,
                    infoWindow: popup
                });

                //apply custom theme to popup. The custom popup theme was defined using css
                //to specify new colors, fonts etc for the popup
                //We've also modified the default popup image used for the popup pointers to
                //match the new color scheme.
                domClass.add(map.infoWindow.domNode, "myTheme");

                //define the popup content using a popup template
                //a custom chart theme (dollar) is specified. Note that you'll have to load
                //then theme first
                var template = new PopupTemplate({
                    title: "Boston Marathon 2013",
                    description: "{Percent_Fi} of starters from {STATE_NAME} finished",
                    fieldInfos: [
                        {
                            fieldName: "Number_Ent",
                            label: "Entrants"
                        }, {
                            fieldName: "Number_Sta",
                            label: "Starters"
                        }, {
                            fieldName: "Number_Fin",
                            label: "Finishers"
                        }],
                    mediaInfos: [{
                            caption: "Details",
                            type: "barchart",
                            value: {
                                theme: "Dollar",
                                fields: ["Number_Ent", "Number_Sta", "Number_Fin"]
                            }
                        }]
                });

                var featureLayer = new FeatureLayer("http://services.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/rest/services/Boston_Marathon/FeatureServer/0", {
                    mode: FeatureLayer.MODE_ONDEMAND,
                    outFields: ["*"],
                    infoTemplate: template
                });

                map.addLayer(featureLayer);
            } catch (error) {
                console.log(error);
            }
        };
        return PopupChartController;
    })();
    return PopupChartController;
});
//# sourceMappingURL=PopupChartController.js.map

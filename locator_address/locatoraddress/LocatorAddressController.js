/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/map", "esri/tasks/locator", "esri/graphic", "esri/InfoTemplate", "esri/symbols/SimpleMarkerSymbol", "esri/symbols/Font", "esri/symbols/TextSymbol", "dojo/_base/array", "esri/Color", "dojo/parser", "dojo/dom", "dijit/registry", "esri/config"], function(require, exports, Map, Locator, Graphic, InfoTemplate, SimpleMarkerSymbol, Font, TextSymbol, arrayUtils, Color, parser, dom, registry, esriConfig) {
    

    var LocatorAddressController = (function () {
        function LocatorAddressController(map, button) {
            this.map = map;
            this.button = button;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        LocatorAddressController.prototype.start = function () {
            try  {
                var map, locator;

                map = new Map(this.map, {
                    basemap: "streets",
                    center: [-93.5, 41.431],
                    zoom: 5
                });

                locator = new Locator("http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer");
                locator.on("address-to-locations-complete", showResults);

                // listen for button click then geocode
                registry.byId("locate").on("click", locate);

                //on(dom.byId("locate"), "click", locate);
                map.infoWindow.resize(200, 125);

                function locate() {
                    console.log("click");
                    map.graphics.clear();
                    var address = {
                        "SingleLine": dom.byId("address").value
                    };
                    locator.outSpatialReference = map.spatialReference;
                    var options = {
                        address: address,
                        outFields: ["Loc_name"]
                    };
                    console.log("click");
                    locator.addressToLocations(options);
                }

                function showResults(evt) {
                    var candidate;
                    var symbol = new SimpleMarkerSymbol();
                    var infoTemplate = new InfoTemplate("Location", "Address: ${address}<br />Score: ${score}<br />Source locator: ${locatorName}");
                    symbol.setStyle(SimpleMarkerSymbol.STYLE_SQUARE);
                    symbol.setColor(new Color([153, 0, 51, 0.75]));

                    var geom;
                    arrayUtils.every(evt.addresses, function (candidate) {
                        console.log(candidate.score);
                        if (candidate.score > 80) {
                            console.log(candidate.location);
                            var attributes = {
                                address: candidate.address,
                                score: candidate.score,
                                locatorName: candidate.attributes.Loc_name
                            };
                            geom = candidate.location;
                            var graphic = new Graphic(geom, symbol, attributes, infoTemplate);

                            //add a graphic to the map at the geocoded location
                            map.graphics.add(graphic);

                            //add a text symbol to the map listing the location of the matched address.
                            var displayText = candidate.address;
                            var font = new Font("16pt", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLD, "Helvetica");

                            var textSymbol = new TextSymbol(displayText, font, new Color("#666633"));
                            textSymbol.setOffset(0, 8);
                            map.graphics.add(new Graphic(geom, textSymbol));
                            return false;
                        }
                    });
                    if (geom !== undefined) {
                        map.centerAndZoom(geom, 12);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        return LocatorAddressController;
    })();
    return LocatorAddressController;
});
//# sourceMappingURL=LocatorAddressController.js.map

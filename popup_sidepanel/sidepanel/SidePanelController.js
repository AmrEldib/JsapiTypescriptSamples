/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "dojo/on", "dojo/_base/connect", "dojo/dom", "dijit/registry", "dojo/parser", "esri/arcgis/utils", "esri/domUtils", "esri/config"], function(require, exports, on, connect, dom, registry, parser, arcgisUtils, domUtils, esriConfig) {
    

    var SidePanelController = (function () {
        function SidePanelController(map) {
            this.map = map;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        SidePanelController.prototype.start = function () {
            try  {
                //setup event handlers for the next/previous buttons
                on(dom.byId("previous"), "click", selectPrevious);
                on(dom.byId("next"), "click", selectNext);

                //Create a map based on an ArcGIS Online web map id
                arcgisUtils.createMap("0ab0004e243641568713ba968d1c424a", this.map).then(function (response) {
                    window.map = response.map;

                    //set the popup's popupWindow property to false. This prevents the popup from displaying
                    map.infoWindow.set("popupWindow", false);
                    initializeSidebar(window.map);
                }, function (error) {
                    console.log("Map creation failed: ", dojo.toJson(error));
                });

                function initializeSidebar(map) {
                    var popup = map.infoWindow;

                    //when the selection changes update the side panel to display the popup info for the
                    //currently selected feature.
                    connect.connect(popup, "onSelectionChange", function () {
                        displayPopupContent(popup.getSelectedFeature());
                    });

                    //when the selection is cleared remove the popup content from the side panel.
                    connect.connect(popup, "onClearFeatures", function () {
                        //dom.byId replaces dojo.byId
                        dom.byId("featureCount").innerHTML = "Click to select feature(s)";

                        //registry.byId replaces dijit.byId
                        registry.byId("leftPane").set("content", "");
                        domUtils.hide(dom.byId("pager"));
                    });

                    //When features are associated with the  map's info window update the sidebar with the new content.
                    connect.connect(popup, "onSetFeatures", function () {
                        displayPopupContent(popup.getSelectedFeature());
                        dom.byId("featureCount").innerHTML = popup.features.length + " feature(s) selected";

                        //enable navigation if more than one feature is selected
                        popup.features.length > 1 ? domUtils.show(dom.byId("pager")) : domUtils.hide(dom.byId("pager"));
                    });
                }

                function displayPopupContent(feature) {
                    if (feature) {
                        var content = feature.getContent();
                        registry.byId("leftPane").set("content", content);
                    }
                }

                function selectPrevious() {
                    window.map.infoWindow.selectPrevious();
                }

                function selectNext() {
                    window.map.infoWindow.selectNext();
                }
            } catch (error) {
                console.log(error);
            }
        };
        return SidePanelController;
    })();
    return SidePanelController;
});
//# sourceMappingURL=SidePanelController.js.map

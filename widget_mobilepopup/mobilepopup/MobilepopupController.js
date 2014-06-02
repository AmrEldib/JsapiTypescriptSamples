/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "esri/arcgis/utils", "esri/dijit/PopupMobile", "dojo/dom-construct", "dojo/parser", "esri/config"], function(require, exports, arcgisUtils, PopupMobile, domConstruct, parser, esriConfig) {
    

    var MobilepopupController = (function () {
        function MobilepopupController(map) {
            this.map = map;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        MobilepopupController.prototype.start = function () {
            try  {
                var popup = new PopupMobile(null, domConstruct.create("div"));
                arcgisUtils.createMap("1df512c380994cc5a3dad2e2d428eea3", this.map, {
                    mapOptions: {
                        center: [-59.48, 44.066],
                        zoom: 4,
                        infoWindow: popup
                    }
                });
            } catch (error) {
                console.log(error);
            }
        };
        return MobilepopupController;
    })();
    return MobilepopupController;
});
//# sourceMappingURL=MobilepopupController.js.map

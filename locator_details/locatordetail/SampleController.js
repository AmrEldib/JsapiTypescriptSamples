/// <reference path="../../lib/esri.d.ts" />
define(["require", "exports", "dojo/parser"], function(require, exports, parser) {
    

    var SampleController = (function () {
        function SampleController(param) {
            this.param = param;
            parser.parse();
            esriConfig.defaults.io.proxyUrl = "/EsriProxy/proxy.ashx";
        }
        SampleController.prototype.start = function () {
            try  {
                // This is just a sample. It does nothing
            } catch (error) {
                console.log(error);
            }
        };
        return SampleController;
    })();
    return SampleController;
});
//# sourceMappingURL=SampleController.js.map

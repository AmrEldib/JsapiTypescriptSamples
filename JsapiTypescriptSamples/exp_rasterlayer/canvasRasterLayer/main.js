define(["require", "exports", "./CanvasRasterLayerController"], function(require, exports, CanvasRasterLayerController) {
    var canvasRasterLayerController = new CanvasRasterLayerController("mapCanvas", "topo", "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Toronto/ImageServer");
    canvasRasterLayerController.start();
});
//# sourceMappingURL=main.js.map

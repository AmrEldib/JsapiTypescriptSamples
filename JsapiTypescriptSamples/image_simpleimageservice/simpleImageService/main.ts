import SimpleImageServiceController = require("./SimpleImageServiceController");

var simpleImageServiceController = new SimpleImageServiceController("mapDiv", "topo", "http://sampleserver6.arcgisonline.com/arcgis/rest/services/Toronto/ImageServer");
simpleImageServiceController.start();

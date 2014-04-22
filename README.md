# TypeScript Samples for Esri's JSAPI #
Esri released the [TypeScript](http://www.typescriptlang.org/) [definition files](https://github.com/Esri/jsapi-resources) for the [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/), this project offers the [JSAPI samples](https://developers.arcgis.com/javascript/jssamples/) in TypeScript.

## Resources ##
- [TypeScript](http://www.typescriptlang.org/)
- [Definition files for Esri's JSAPI](https://github.com/Esri/jsapi-resources)
- [ArcGIS API for JavaScript](https://developers.arcgis.com/javascript/)
- [JSAPI samples](https://developers.arcgis.com/javascript/jssamples/)

## Setup Instructions ##
- Download and setup the code as an application in IIS.
- The code assumes that [Esri's proxy](https://github.com/Esri/resource-proxy) is setup as another application named 'EsriProxy'.
- To make things easier, turn off the filtering of the proxy by switching the value of the 'mustMatch' attribute to 'false'.
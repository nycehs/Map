let geoDataURL = "../CD_simplified_wPM.geojson";
let geoRequest = new XMLHttpRequest();
let geoObj = {};

geoRequest.open('GET',geoDataURL);
geoRequest.responseType = 'json';
geoRequest.send();

geoRequest.onload = function(){
    geoObj = geoRequest.response;
}

let spec = "map1.vl.json";
  vegaEmbed('#map', spec).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
  }).catch(console.error);
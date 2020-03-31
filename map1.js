let geoDataURL = "../ZCTA.geo.json";
let covidDataURL = "../FakeZCTAData.csv";
let geoRequest = new XMLHttpRequest();
let covidRequest = new XMLHttpRequest();
let geoObj = {};
let covidObj = {};
let viewObj = {};

geoRequest.open('GET',geoDataURL);
geoRequest.responseType = 'json';
geoRequest.send();

covidRequest.open('GET',covidDataURL);
covidRequest.responseType = 'text';
covidRequest.send();

geoRequest.onload = function(){
    geoObj = geoRequest.response;
}

covidRequest.onload = function(){
    covidObj = covidRequest.response;
}

let spec = "map1.vl.json";
  vegaEmbed('#map', spec).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    viewObj = result.view;
  }).catch(console.error);
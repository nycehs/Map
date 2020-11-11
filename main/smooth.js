"use strict";

// missing forEach on NodeList for IE11
//   thanks panthony: https://github.com/miguelcobain/ember-paper/issues/1058
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}

var geoDataURL = "../zcta.topo.json";
var covidDataURL = "../FakeZCTAData.csv";
var geoObj = {};
var covidObj = {};
var viewObj = {};

var rateSpec = "mapRate.vl.json";
var countSpec = "mapCountCircle.vl.json";

var deathRateSpec = "mapDeathRate.vl.json";
var deathCountSpec = "mapDeathCountCircle.vl.json";

var percentSpec = "mapPercent.vl.json";

var deathSpec = "";
var opt = {
  "renderer": "svg"
};
var el = document.getElementById('#map'); // this code listens to the form with map chooser; must run after DOM loads


function changeMap(spec) {
  vegaEmbed('#map', spec, opt).then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    viewObj = result.view;
  }).catch(console.error);
}

changeMap(rateSpec);
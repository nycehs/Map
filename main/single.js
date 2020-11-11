/*
This file connects to single.html
It uses a single vega spec, and runs a function to update the vega spec object based on radio button value
It also updates the legend name.
*/

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

var vegaSpec =
{
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "width": "container",
  "height": "container",
  "autosize": {
    "type": "fit",
    "contains": "padding"
  },
  "layer": [
    {
      "data": {
        "url": "MODZCTA_2010_WGS1984.topo.json",
        "format": {
          "type": "topojson",
          "feature": "collection"
        }
      },
      "mark": {
        "type": "geoshape",
        "stroke": "#ffffff",
        "fill": "lightgray"
      }
    },
    {
      "data": {
        "url": "MODZCTA_2010_WGS1984.topo.json",
        "format": {
          "type": "topojson",
          "feature": "collection"
        }
      },
      "transform": [
        {
          "lookup": "properties.MODZCTA",
          "from": {
            "data": {
              "url": "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/totals/data-by-modzcta.csv"
            },
            "key": "MODIFIED_ZCTA",
            "fields": [
              "MODIFIED_ZCTA",
              "NEIGHBORHOOD_NAME",
              "BOROUGH_GROUP",
              "COVID_CASE_COUNT",
              "COVID_CASE_RATE",
              "PERCENT_POSITIVE",
              "COVID_DEATH_COUNT",
              "COVID_DEATH_RATE",
              "POP_DENOMINATOR"
            ]
          }
        }
      ],
      "mark": {
        "type": "geoshape",
        "stroke": "#FFFFFF"
      },
      "encoding": {
        "color": {
          "bin": false,
          "field": "PERCENT_POSITIVE",
          "type": "quantitative",
          "scale": {
            "scheme": {
              "name": "blues",
              "extent": [
                0.2,
                1.25
              ]
            }
          },
          "legend": {
            "title": "Percent Positive",
            "titleFontSize": 10,
            "orient": "top-left",
            "gradientLength": 100
          }
        },
        "strokeWidth": {
          "value": 0.5
        },
        "tooltip": [
          {
            "field": "properties.label",
            "type": "nominal",
            "title": "ZIP Code"
          },
          {
            "field": "NEIGHBORHOOD_NAME",
            "type": "nominal",
            "title": "Neighborhood"
          },
          {
            "field": "COVID_CASE_COUNT",
            "type": "quantitative",
            "title": "Case Count"
          },
          {
            "field": "COVID_CASE_RATE",
            "type": "quantitative",
            "title": "Cases per 100,000"
          },
          {
            "field": "PERCENT_POSITIVE",
            "type": "quantitative",
            "title": "Percent of people tested who tested positive"
          },
          {
            "field": "COVID_DEATH_COUNT",
            "type": "quantitative",
            "title": "Deaths"
          },
          {
            "field": "COVID_DEATH_RATE",
            "type": "quantitative",
            "title": "Deaths per 100,000"
          }
        ]
      }
    }
  ]
};


var opt = {
  "renderer": "svg"
};
var el = document.getElementById('#map'); // this code listens to the form with map chooser; must run after DOM loads
var radios = [];

var label = "Percent Positive"

window.onload = listenRadios;
function listenRadios() {
  radios = document.querySelectorAll('input[type=radio][name="mapRadioGroup"]');
  radios.forEach(function (radio) {
    return radio.addEventListener('change', function () {
      if (radio.value === 'perpos') {
        changeVar('PERCENT_POSITIVE');
      } else if (radio.value === 'caserate') {
        changeVar('COVID_CASE_RATE');
      } else if (radio.value === 'deathrate') {
        changeVar('COVID_DEATH_RATE');
      }

      ;
    });
  });
}




function changeMap(spec) {
  vegaEmbed('#map', spec, opt).then(function (result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    viewObj = result.view;
  }).catch(console.error);
}

changeMap(vegaSpec);
console.log(vegaSpec.layer[1].encoding.color.field + ' initial state')
console.log(vegaSpec.layer[1].encoding.color.scale.scheme.name);


function changeVar(chosenMetric) {
  vegaSpec.layer[1].encoding.color.field = chosenMetric;
  if (chosenMetric === 'PERCENT_POSITIVE') {
    vegaSpec.layer[1].encoding.color.legend.title = 'Percent Positive';
    vegaSpec.layer[1].encoding.color.scale.scheme.name = "blues";
  } else if (chosenMetric === 'COVID_CASE_RATE') {
    vegaSpec.layer[1].encoding.color.legend.title = 'Cases per 100,000';
    vegaSpec.layer[1].encoding.color.scale.scheme.name = "redpurple";
  } else if (chosenMetric === "COVID_DEATH_RATE") {
    vegaSpec.layer[1].encoding.color.legend.title = 'Deaths per 100,000';
    vegaSpec.layer[1].encoding.color.scale.scheme.name = "greys";

  }

  console.log('you have changed it to ' + chosenMetric);
  changeMap(vegaSpec);
}
//MAP TOGGLE JAVASCRIPT


"use strict";

// missing forEach on NodeList for IE11
//   thanks panthony: https://github.com/miguelcobain/ember-paper/issues/1058
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

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
                "url": "js/MODZCTA_2010_RI99999_WGS1984_1_topoms.json",
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
                "url": "js/MODZCTA_2010_RI99999_WGS1984_1_topoms.json",
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
                            "url": "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/last7days-by-modzcta.csv"
                        },
                        "key": "modzcta",
                        "fields": [
                            "modzcta",
                            "modzcta_name",
                            "percentpositivity_7day",
                            "people_tested",
                            "people_positive",
                            "daterange",
                            "median_daily_test_rate",
                            "adequately_tested"
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
                    "field": "percentpositivity_7day",
                    "type": "quantitative",
                    "scale": {
                        "scheme": {
                            "name": "orangered",
                            "extent": [
                                0.1,
                                1.5
                            ]
                        }
                    },
                    "legend": {
                        "title": "7-day percent positive",
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
                        "title": "ZIP code"
                    },
                    {
                        "field": "modzcta_name",
                        "type": "nominal",
                        "title": "Neighborhood"
                    },
                    {
                        "field": "percentpositivity_7day",
                        "type": "quantitative",
                        "title": "Percent positive"
                    },
                    {
                        "field": "people_tested",
                        "type": "quantitative",
                        "title": "People tested (reported to date)"
                    },
                    {
                        "field": "people_positive",
                        "type": "quantitative",
                        "title": "People positive (reported to date)"
                    },
                    {
                        "field": "median_daily_test_rate",
                        "type": "quantitative",
                        "title": "Daily tests per 100,000"
                    },
                    {
                        "field": "adequately_tested",
                        "type": "nominal",
                        "title": "Adequate testing sample"
                    },
                    {
                        "field": "daterange",
                        "type": "nominal",
                        "title": "Dates"
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


function showMap(spec) {
    vegaEmbed('#map', spec, opt).then(function (result) {
        // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
        viewObj = result.view;
    }).catch(console.error);
}

showMap(vegaSpec);
console.log(vegaSpec.layer[1].encoding.color.field + ' initial state')
console.log(vegaSpec.layer[1].encoding.color.scale.scheme.name);

//END MAP TOGGLE JAVASCRIPT







//START CHART EMBED JS
var chartSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "description": "Test rate over time",
    "width": "container",
    "height": 350,
    "config": {
        "background": "#FFFFFF",
        "axisX": {
            "grid": false
        },
        "axisY": {
            "domain": false,
            "ticks": false,
            "gridDash": [
                2
            ],
            "gridWidth": 1
        },
        "view": {
            "stroke": "transparent"
        }
    },
    "data": {
        "url": "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/trends/testrate-by-modzcta.csv"
    },
    "layer": [
        {
            "mark": {
                "type": "line",
                "point": true,
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "week_ending",
                    "type": "temporal",
                    "title": "Week end date"
                },
                "y": {
                    "field": "TESTRATE_CITY",
                    "type": "quantitative",
                    "title": null
                },
                "color": {
                    "value": "black"
                },
                "tooltip": [
                    {
                        "field": "TESTRATE_CITY",
                        "title": "New York City"
                    },
                    {
                        "field": "week_ending",
                        "type": "temporal",
                        "title": "Week ending"
                    }
                ]
            }
        },
        {
            "mark": {
                "type": "line",
                "point": true,
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "week_ending",
                    "type": "temporal"
                },
                "y": {
                    "field": "TESTRATE_BK",
                    "type": "quantitative"
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "TESTRATE_BK",
                        "title": "Brooklyn"
                    },
                    {
                        "field": "week_ending",
                        "type": "temporal",
                        "title": "Week ending"
                    }
                ]
            }
        },
        {
            "mark": {
                "type": "line",
                "point": {
                    "filled": false,
                    "fill": "white"
                },
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 3
            },
            "encoding": {
                "x": {
                    "field": "week_ending",
                    "type": "temporal"
                },
                "y": {
                    "field": "TESTRATE_11226",
                    "type": "quantitative"
                },
                "color": {
                    "value": "hotpink"
                },
                "tooltip": [
                    {
                        "field": "TESTRATE_11226",
                        "title": "ZIP Code 11226"
                    },
                    {
                        "field": "week_ending",
                        "type": "temporal",
                        "title": "Week ending"
                    }
                ]
            }
        }
    ]
};

vegaEmbed("#trchart", chartSpec);

"use strict";

// missing forEach on NodeList for IE11
//   thanks panthony: https://github.com/miguelcobain/ember-paper/issues/1058
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var geoObj = {};
var covidObj = {};
var viewObj = {};


// Get value of form on submit, and prevent submission
var zipCodeForm = document.getElementById('zip-code-form');

// set global instace of zipcode

var zipCode;
var zipCodeData;
var zipString;
var fullName;
var parentBoro;

console.log(chartSpec);

// This listens for submission of the zip code form
zipCodeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page re-load
    fullName = event.target[0].value; // assign selected value to fullName variable
    console.log(event.target[0].value);
    zipCode = event.target[0].value.slice(0, 5); // trims it down to just the ZIP
    zipString = zipCode.toString(); // converts the numerical value to a string
    console.log("zipCode: " + zipCode);

    chartSpec.layer[0].encoding.y.field = "TESTRATE_" + zipString;
    chartSpec.layer[0].encoding.tooltip[0].field = "TESTRATE_" + zipString;;
    chartSpec.layer[0].encoding.tooltip[0].title = "ZIP Code " + zipString;
    chartSpec.layer[0].encoding.color.value = "hotpink";
    chartSpec.layer[0].mark.strokeWidth = 3;
    console.log(chartSpec);

    document.getElementById('zip').innerHTML = "&nbsp;" + zipCode + "&nbsp;";
    document.getElementById('city').innerHTML = "&nbsp;New York City&nbsp;";





    /*
    Layers:
    0 = ZIP
    1 = City
    2 = Brooklyn
    3 = Manhattan
    4 = Queens
    5 = SI
    6 = Bronx
    */

    if (zipCode <= 10282) {
        parentBoro = "Manhattan";
        console.log('parentBoro: ' + parentBoro);
        chartSpec.layer[2].mark.strokeWidth = 0;
        chartSpec.layer[2].mark.point = false;
        chartSpec.layer[3].mark.strokeWidth = 3;
        chartSpec.layer[3].mark.point = true;
        chartSpec.layer[4].mark.strokeWidth = 0;
        chartSpec.layer[4].mark.point = false;
        chartSpec.layer[5].mark.strokeWidth = 0;
        chartSpec.layer[5].mark.point = false;
        chartSpec.layer[6].mark.strokeWidth = 0;
        chartSpec.layer[6].mark.point = false;

        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";
    }

    else if (zipCode >= 10301 && zipCode <= 10314) {
        parentBoro = "Staten Island";
        console.log('parentBoro: ' + parentBoro);
        chartSpec.layer[2].mark.strokeWidth = 0;
        chartSpec.layer[2].mark.point = false;
        chartSpec.layer[3].mark.strokeWidth = 0;
        chartSpec.layer[3].mark.point = false;
        chartSpec.layer[4].mark.strokeWidth = 0;
        chartSpec.layer[4].mark.point = false;
        chartSpec.layer[5].mark.strokeWidth = 3;
        chartSpec.layer[5].mark.point = true;
        chartSpec.layer[6].mark.strokeWidth = 0;
        chartSpec.layer[6].mark.point = false;

        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";

    } else if (zipCode >= 10451 && zipCode <= 10474) {
        parentBoro = "The Bronx";
        chartSpec.layer[2].mark.strokeWidth = 0;
        chartSpec.layer[2].mark.point = false;

        chartSpec.layer[3].mark.strokeWidth = 0;
        chartSpec.layer[3].mark.point = false;

        chartSpec.layer[4].mark.strokeWidth = 0;
        chartSpec.layer[4].mark.point = false;

        chartSpec.layer[5].mark.strokeWidth = 0;
        chartSpec.layer[5].mark.point = false;

        chartSpec.layer[6].mark.strokeWidth = 3;
        chartSpec.layer[6].mark.point = true;
        console.log('parentBoro: ' + parentBoro);

        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";


    } else if (zipCode >= 11104 && zipCode <= 11109 || zipCode >= 11354 && zipCode <= 11697) {
        parentBoro = "Queens";
        console.log('parentBoro: ' + parentBoro);
        chartSpec.layer[2].mark.strokeWidth = 0;
        chartSpec.layer[2].mark.point = false;

        chartSpec.layer[3].mark.strokeWidth = 0;
        chartSpec.layer[3].mark.point = false;

        chartSpec.layer[4].mark.strokeWidth = 3;
        chartSpec.layer[4].mark.point = true;

        chartSpec.layer[5].mark.strokeWidth = 0;
        chartSpec.layer[5].mark.point = false;

        chartSpec.layer[6].mark.strokeWidth = 0;
        chartSpec.layer[6].mark.point = false;

        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";
    }

    else if (zipCode >= 11201 && zipCode <= 11239) {
        parentBoro = "Brooklyn";
        console.log('parentBoro: ' + parentBoro);
        chartSpec.layer[2].mark.strokeWidth = 3;
        chartSpec.layer[2].mark.point = true;

        chartSpec.layer[3].mark.strokeWidth = 0;
        chartSpec.layer[3].mark.point = false;

        chartSpec.layer[4].mark.strokeWidth = 0;
        chartSpec.layer[4].mark.point = false;

        chartSpec.layer[5].mark.strokeWidth = 0;
        chartSpec.layer[5].mark.point = false;

        chartSpec.layer[6].mark.strokeWidth = 0;
        chartSpec.layer[6].mark.point = false;

        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";
    };




    // redraws chart with zip now in chartSpec
    vegaEmbed("#trchart", chartSpec);

    // console.log(event);
});






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
                    "title": ""
                },
                "y": {
                    "field": "TESTRATE_11226",
                    "type": "quantitative",
                    "title": null
                },
                "color": {
                    "value": "black"
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
                    "type": "temporal",
                    "title": ""
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
                    "field": "TESTRATE_MN",
                    "type": "quantitative"
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "TESTRATE_MN",
                        "title": "Manhattan"
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
                    "field": "TESTRATE_QN",
                    "type": "quantitative"
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "TESTRATE_QN",
                        "title": "Queens"
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
                    "field": "TESTRATE_SI",
                    "type": "quantitative"
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "TESTRATE_SI",
                        "title": "Staten Island"
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
                    "field": "TESTRATE_BX",
                    "type": "quantitative"
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "TESTRATE_BX",
                        "title": "Bronx"
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
}

console.log(chartSpec);

vegaEmbed("#trchart", chartSpec);






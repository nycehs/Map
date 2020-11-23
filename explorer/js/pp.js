"use strict";

// missing forEach on NodeList for IE11
//   thanks panthony: https://github.com/miguelcobain/ember-paper/issues/1058
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}

var geoObj = {};
var covidObj = {};
var viewObj = {};


// set global instace of zipcode

var zipCode;
var zipCodeData;
var zipString;
var fullName;
var parentBoro;

console.log(chartSpec);

var zipCodeForm = document.getElementById('zip-code-form');

// This listens for submission of the zip code form
zipCodeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page re-load
    fullName = event.target[0].value; // assign selected value to fullName variable
    console.log(event.target[0].value);
    zipCode = event.target[0].value.slice(0, 5); // trims it down to just the ZIP
    zipString = zipCode.toString(); // converts the numerical value to a string
    console.log("zipCode: " + zipCode);
    document.getElementById('zip').innerHTML = "&nbsp;" + zipCode + "&nbsp;";
    document.getElementById('city').innerHTML = "&nbsp;New York City&nbsp;";

    console.log(chartSpec.layer[6]);

    //Draw ZIP line
    chartSpec.layer[6].encoding.y.field = zipCode;
    chartSpec.layer[6].encoding.y.title = zipCode;
    chartSpec.layer[6].encoding.color.value = "hotpink";
    chartSpec.layer[6].mark.strokeWidth = 2;

    /*
    Layers: 
    0 = Brooklyn
    1 = Bronx
    2 = Manhattan
    3 = Queens
    4 = Staten Island
    5 = Citywide
    6 = ZIP code holder
    */



    if (zipCode <= 10282) {
        parentBoro = "Manhattan";
        console.log('parentBoro: ' + parentBoro);
        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";

        //remove points from nonParents
        chartSpec.layer[0].mark.point = false;
        chartSpec.layer[1].mark.point = false;
        chartSpec.layer[3].mark.point = false;
        chartSpec.layer[4].mark.point = false;

        //make slim nonParents
        chartSpec.layer[0].mark.strokeWidth = 0.5;
        chartSpec.layer[1].mark.strokeWidth = 0.5;
        chartSpec.layer[3].mark.strokeWidth = 0.5;
        chartSpec.layer[4].mark.strokeWidth = 0.5;

        //style parent borough
        chartSpec.layer[2].mark.strokeWidth = 3;
    }

    else if (zipCode >= 10301 && zipCode <= 10314) {
        parentBoro = "Staten Island";
        console.log('parentBoro: ' + parentBoro);
        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";
        //remove points from nonParents
        chartSpec.layer[0].mark.point = false;
        chartSpec.layer[1].mark.point = false;
        chartSpec.layer[3].mark.point = false;
        chartSpec.layer[2].mark.point = false;

        //make slim nonParents
        chartSpec.layer[0].mark.strokeWidth = 0.5;
        chartSpec.layer[1].mark.strokeWidth = 0.5;
        chartSpec.layer[3].mark.strokeWidth = 0.5;
        chartSpec.layer[2].mark.strokeWidth = 0.5;

        //style parent borough
        chartSpec.layer[4].mark.strokeWidth = 3;

    } else if (zipCode >= 10451 && zipCode <= 10474) {
        parentBoro = "The Bronx";
        console.log('parentBoro: ' + parentBoro);
        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";

        //remove points from nonParents
        chartSpec.layer[0].mark.point = false;
        chartSpec.layer[2].mark.point = false;
        chartSpec.layer[3].mark.point = false;
        chartSpec.layer[4].mark.point = false;

        //make slim nonParents
        chartSpec.layer[0].mark.strokeWidth = 0.5;
        chartSpec.layer[2].mark.strokeWidth = 0.5;
        chartSpec.layer[3].mark.strokeWidth = 0.5;
        chartSpec.layer[4].mark.strokeWidth = 0.5;

        //style parent borough
        chartSpec.layer[1].mark.strokeWidth = 3;


    } else if (zipCode >= 11104 && zipCode <= 11109 || zipCode >= 11354 && zipCode <= 11697) {
        parentBoro = "Queens";
        console.log('parentBoro: ' + parentBoro);
        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";
        //remove points from nonParents
        chartSpec.layer[0].mark.point = false;
        chartSpec.layer[1].mark.point = false;
        chartSpec.layer[2].mark.point = false;
        chartSpec.layer[4].mark.point = false;

        //make slim nonParents
        chartSpec.layer[0].mark.strokeWidth = 0.5;
        chartSpec.layer[1].mark.strokeWidth = 0.5;
        chartSpec.layer[2].mark.strokeWidth = 0.5;
        chartSpec.layer[4].mark.strokeWidth = 0.5;

        //style parent borough
        chartSpec.layer[3].mark.strokeWidth = 3;
    }

    else if (zipCode >= 11201 && zipCode <= 11239) {
        parentBoro = "Brooklyn";
        console.log('parentBoro: ' + parentBoro);
        document.getElementById('boro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";
        //remove points from nonParents
        chartSpec.layer[2].mark.point = false;
        chartSpec.layer[1].mark.point = false;
        chartSpec.layer[3].mark.point = false;
        chartSpec.layer[4].mark.point = false;

        //make slim nonParents
        chartSpec.layer[2].mark.strokeWidth = 0.5;
        chartSpec.layer[1].mark.strokeWidth = 0.5;
        chartSpec.layer[3].mark.strokeWidth = 0.5;
        chartSpec.layer[4].mark.strokeWidth = 0.5;

        //style parent borough
        chartSpec.layer[0].mark.strokeWidth = 3;
    };



    vegaEmbed("#trchart", chartSpec);



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
        "url": "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/latest/pp-by-modzcta.csv"
    },
    "layer": [
        {
            "mark": {
                "type": "line",
                "point": {
                    "filled": false,
                    "fill": "white",
                    "size": 15,
                    "strokeWidth": 1
                },
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "End date",
                    "type": "temporal",
                    "title": ""
                },
                "y": {
                    "field": "Brooklyn",
                    "type": "quantitative",
                    "title": null
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "Brooklyn",
                        "title": "Brooklyn"
                    },
                    {
                        "field": "End date",
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
                    "fill": "white",
                    "size": 15,
                    "strokeWidth": 1
                },
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "End date",
                    "type": "temporal",
                    "title": ""
                },
                "y": {
                    "field": "Bronx",
                    "type": "quantitative",
                    "title": null
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "Bronx",
                        "title": "Bronx"
                    },
                    {
                        "field": "End date",
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
                    "fill": "white",
                    "size": 15,
                    "strokeWidth": 1
                },
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "End date",
                    "type": "temporal",
                    "title": ""
                },
                "y": {
                    "field": "Manhattan",
                    "type": "quantitative",
                    "title": null
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "Manhattan",
                        "title": "Manhattan"
                    },
                    {
                        "field": "End date",
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
                    "fill": "white",
                    "size": 15,
                    "strokeWidth": 1
                },
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "End date",
                    "type": "temporal",
                    "title": ""
                },
                "y": {
                    "field": "Queens",
                    "type": "quantitative",
                    "title": null
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "Queens",
                        "title": "Queens"
                    },
                    {
                        "field": "End date",
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
                    "fill": "white",
                    "size": 15,
                    "strokeWidth": 1
                },
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "End date",
                    "type": "temporal",
                    "title": ""
                },
                "y": {
                    "field": "Staten Island",
                    "type": "quantitative",
                    "title": null
                },
                "color": {
                    "value": "darkgrey"
                },
                "tooltip": [
                    {
                        "field": "Staten Island",
                        "title": "Staten Island"
                    },
                    {
                        "field": "End date",
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
                    "filled": true,
                    "size": 15,
                    "strokeWidth": 1
                },
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "End date",
                    "type": "temporal",
                    "title": ""
                },
                "y": {
                    "field": "Citywide",
                    "type": "quantitative",
                    "title": null
                },
                "color": {
                    "value": "black"
                },
                "tooltip": [
                    {
                        "field": "Citywide",
                        "title": "New York City"
                    },
                    {
                        "field": "End date",
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
                    "filled": true,
                    "size": 15,
                    "strokeWidth": 1
                },
                "tooltip": true,
                "interpolate": "natural",
                "strokeWidth": 1.5
            },
            "encoding": {
                "x": {
                    "field": "End date",
                    "type": "temporal",
                    "title": ""
                },
                "y": {
                    "field": "Citywide",
                    "type": "quantitative",
                    "title": null
                },
                "color": {
                    "value": "black"
                },
                "tooltip": [
                    {
                        "field": "Citywide",
                        "title": "New York City"
                    },
                    {
                        "field": "End date",
                        "type": "temporal",
                        "title": "Week ending"
                    }
                ]
            }
        }

    ]
};

console.log(chartSpec);

vegaEmbed("#trchart", chartSpec);






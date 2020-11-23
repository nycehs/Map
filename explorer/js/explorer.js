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

// set global instace of variables

var zipCode;
var zipCodeData;
var zipString;
var fullName;
var parentBoro;
var boroData;
var fullData;
var cityData;
var cityTableData;
var metric = "TESTRATE";

// This listens for submission of the zip code form
zipCodeForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent page re-load
    fullName = event.target[0].value; // assign selected value to fullName variable
    console.log(event.target[0].value);
    zipCode = event.target[0].value.slice(0, 5); // trims it down to just the ZIP
    zipString = zipCode.toString(); // converts the numerical value to a string
    console.log('zip code is ' + zipCode);
    changeNeighborhood(zipCode); // runs the major display function

    // console.log(event);
});



//you know have values for zipCode, fullName, and zipString


// d3 code to pull in data-by-modzcta - will need to change to remote ref when live
d3.csv("data-by-modzcta.csv").then(function (data) {
    //console.log(data); // [{"Hello": "world"}, â€¦]
    fullData = data;
    /* 
    console.log(fullData);
    */
});

// d3 code to pull in by-boro - will need to change to remote ref when live
d3.csv("by-boro.csv").then(function (data) {
    //console.log(data); // [{"Hello": "world"}, â€¦]
    cityData = data;
    /*
    console.log(cityData);
    */
});

//you now have fullData by modzcta, and citywide/boro data



//This is the big fuction where most of the stuff happens, that runs on zip selection
function changeNeighborhood(zipCode) {
    document.querySelector('.submitted__last-location').innerHTML = zipCode; // shows ZIP
    document.querySelector('.submitted').classList.remove('submitted--hidden'); // reveals Facts panel
    zipCodeData = fullData.filter(neighborhood => neighborhood.MODIFIED_ZCTA == zipString); // Filters data-by-modzcta to just selected neighborhood
    console.log(zipCodeData); // Look Ma, you can see it in the console
    document.getElementById('ziptable').innerHTML = "&nbsp;" + zipString + "&nbsp;";
    document.getElementById('zipcaserate').innerHTML = zipCodeData[0].COVID_CASE_RATE;
    document.getElementById('zipdeathrate').innerHTML = zipCodeData[0].COVID_DEATH_RATE;

    // getting boro data for cumulative table
    parentBoro = zipCodeData[0].BOROUGH_GROUP;
    console.log('the borough is: ' + parentBoro);
    boroData = cityData.filter(boro => boro.BOROUGH_GROUP == parentBoro);
    /*
    console.log(boroData);
    */
    document.getElementById('borocaserate').innerHTML = boroData[0].CASE_RATE;
    document.getElementById('borodeathrate').innerHTML = boroData[0].DEATH_RATE;
    document.getElementById('borotable').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";

    //getting city data for cumulative table
    cityTableData = cityData.filter(boro => boro.BOROUGH_GROUP == 'Citywide');
    /*
    console.log(cityTableData);
    */
    document.getElementById('citycaserate').innerHTML = cityTableData[0].CASE_RATE;
    document.getElementById('citydeathrate').innerHTML = cityTableData[0].DEATH_RATE;

    //Summary paragraph
    document.getElementById('ns1').innerHTML = fullName;
    document.getElementById('case1').innerHTML = "&nbsp;" + zipCodeData[0].COVID_CASE_COUNT + "&nbsp;";
    document.getElementById('death1').innerHTML = "&nbsp;" + zipCodeData[0].COVID_DEATH_COUNT + "&nbsp;";
    document.getElementById('crzip').innerHTML = zipCodeData[0].COVID_CASE_RATE + " per 100,000 people.";
    document.getElementById('drzip').innerHTML = zipCodeData[0].COVID_DEATH_RATE + " per 100,000 people.";

    if (zipCodeData[0].COVID_CASE_RATE > boroData[0].CASE_RATE) {
        document.getElementById('hilo1').innerHTML = "&nbsp;Higher&nbsp;";
        document.getElementById('hilo1').classList.add('higher');
        document.getElementById('hilo1').classList.remove('lower');
    } else {
        document.getElementById('hilo1').innerHTML = "&nbsp;Lower&nbsp;";
        document.getElementById('hilo1').classList.add('lower');
        document.getElementById('hilo1').classList.remove('higher');
    }

    document.getElementById('boro1').innerHTML = parentBoro;
    document.getElementById('boro2').innerHTML = parentBoro;

    if (zipCodeData[0].COVID_DEATH_RATE > boroData[0].DEATH_RATE) {
        document.getElementById('hilo2').innerHTML = "&nbsp;Higher&nbsp;"
        document.getElementById('hilo2').classList.add('higher');
        document.getElementById('hilo2').classList.remove('lower');
    } else {
        document.getElementById('hilo2').innerHTML = "&nbsp;Lower&nbsp;";
        document.getElementById('hilo2').classList.add('lower');
        document.getElementById('hilo2').classList.remove('higher');

    }

    if (zipCodeData[0].COVID_DEATH_RATE > cityTableData[0].DEATH_RATE) {
        document.getElementById('hilo3').innerHTML = "&nbsp;Higher&nbsp;";
        document.getElementById('hilo3').classList.add('higher');
        document.getElementById('hilo3').classList.remove('lower');

    } else {
        document.getElementById('hilo3').innerHTML = "&nbsp;Lower&nbsp;";
        document.getElementById('hilo3').classList.add('lower');
        document.getElementById('hilo3').classList.remove('higher');

    }


    if (zipCodeData[0].COVID_DEATH_RATE > cityTableData[0].DEATH_RATE) {
        document.getElementById('hilo4').innerHTML = "&nbsp;Higher&nbsp;";
        document.getElementById('hilo4').classList.add('higher');
        document.getElementById('hilo4').classList.remove('lower');

    } else {
        document.getElementById('hilo4').innerHTML = "&nbsp;Lower&nbsp;";
        document.getElementById('hilo4').classList.add('lower');
        document.getElementById('hilo4').classList.remove('higher');

    }

    console.log('zipString is ' + zipString + ', and metric is ' + metric);

    // Draws the chart based on the ZIP!
    chartDraw(zipString, metric);
    document.getElementById('chartzip').innerHTML = "&nbsp;" + zipString + "&nbsp;";
    document.getElementById('chartboro').innerHTML = "&nbsp;" + parentBoro + "&nbsp;";

    // Draws the map upon neighborhood selection
    showMap(vegaSpec);

}



// These are the map specs
var vegaSpec =
{
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": "container",
    "height": "container",
    "autosize": {
        "type": "fit",
        "contains": "padding"
    },
    "config": {
        "background": "#FFFFFF",
        "axisX": { "grid": false },
        "axisY": { "domain": false, "ticks": false, "gridDash": [2], "gridWidth": 1 },
        "view": { "stroke": "transparent" }
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
                            "median_daily_test_rate"
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
                    "field": "median_daily_test_rate",
                    "type": "quantitative",
                    "scale": {
                        "scheme": {
                            "name": "goldgreen",
                            "extent": [
                                0.1,
                                1.5
                            ]
                        }
                    },
                    "legend": {
                        "title": "Median daily test rate (per 100,000)",
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
                        "field": "median_daily_test_rate",
                        "type": "quantitative",
                        "title": "Daily tests per 100,000"
                    },
                    {
                        "field": "percentpositivity_7day",
                        "type": "quantitative",
                        "title": "Percent positive"
                    },

                    {
                        "field": "people_positive",
                        "type": "quantitative",
                        "title": "New Cases (reported to date)"
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

var vegaDotSpec = {
    "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
    "width": "container",
    "height": "container",
    "autosize": {
        "type": "fit",
        "contains": "padding"
    },
    "config": {
        "background": "#FFFFFF",
        "axisX": { "grid": false },
        "axisY": { "domain": false, "ticks": false, "gridDash": [2], "gridWidth": 1 },
        "view": { "stroke": "transparent" }
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
                "url": "js/zcta_points.csv"
            },
            "transform": [
                {
                    "lookup": "MODZCTA",
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
                            "median_daily_test_rate"
                        ]
                    },
                    "default": "no data"
                }
            ],
            "mark": {
                "type": "circle",
                "stroke": "#8A2BE2",
                "fill": "red",
                "fillOpacity": 0.5
            },
            "encoding": {
                "latitude": {
                    "field": "lat",
                    "type": "quantitative"
                },
                "longitude": {
                    "field": "lon",
                    "type": "quantitative"
                },
                "size": {
                    "bin": false,
                    "field": "people_positive",
                    "type": "quantitative",
                    "scale": {
                        "range": [
                            0,
                            800
                        ]
                    },
                    "legend": {
                        "title": `New Cases (Reported so far)`,
                        "titleFontSize": 10,
                        "orient": "top-left",
                        "symbolLimit": 5,
                        "symbolOpacity": 0.5,
                        "values": [
                            10,
                            50,
                            100
                        ]
                    }
                },
                "strokeWidth": {
                    "value": 0.5
                },
                "tooltip": [
                    {
                        "field": "modzcta",
                        "type": "nominal",
                        "title": "ZIP code"
                    },
                    {
                        "field": "modzcta_name",
                        "type": "nominal",
                        "title": "Neighborhood"
                    },
                    {
                        "field": "median_daily_test_rate",
                        "type": "quantitative",
                        "title": "Daily tests per 100,000"
                    },
                    {
                        "field": "percentpositivity_7day",
                        "type": "quantitative",
                        "title": "Percent positive"
                    },
                    {
                        "field": "people_positive",
                        "type": "quantitative",
                        "title": "New Cases (reported to date)"
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
}

//Initial Map Render
var opt = {
    "renderer": "svg"
};
var radios = [];


function showMap(spec) {
    vegaEmbed('#map', spec, opt).then(function (result) {
        // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
        viewObj = result.view;
    }).catch(console.error);
}

//Change map on button click
function changeMap(x) {
    let btn = document.getElementById(`mb${x}`);
    //Turns off highlights
    for (let button of document.querySelectorAll('.mapbutton')) button.classList.remove('highlight');
    btn.classList.add('highlight');

    if (x === 1) {
        vegaSpec.layer[1].encoding.color.field = 'median_daily_test_rate';
        vegaSpec.layer[1].encoding.color.legend.title = 'Median daily test rate (per 100,000)';
        vegaSpec.layer[1].encoding.color.scale.scheme.name = "goldgreen";
        document.getElementById('mb1').setAttribute('aria-label', 'Tab selected');
        console.log('One fired');
        vegaEmbed('#map', vegaSpec);
    } else if (x === 2) {
        vegaSpec.layer[1].encoding.color.field = 'percentpositivity_7day';
        vegaSpec.layer[1].encoding.color.legend.title = 'Percent Positive';
        vegaSpec.layer[1].encoding.color.scale.scheme.name = "orangered";
        console.log('two fired');
        vegaEmbed('#map', vegaSpec);
    } else if (x === 3) {
        showMap(vegaDotSpec);
    }

};


//DEFAULT CHART SPEC 
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




// This function runs on button click and changes the variable "label"
function changeMetric(y) {
    var label = '';
    let btn = document.getElementById(`chartbtn${y}`);
    //Turns off highlights
    for (let button of document.querySelectorAll('.chartbutton')) button.classList.remove('highlight');
    btn.classList.add('highlight');

    if (y === 2) {
        metric = "PCTPOS";
        document.getElementById('datalabel').innerHTML = "Percent of people tested who tested positive";
    } else if (y === 3) {
        metric = "CASERATE";
        document.getElementById('datalabel').innerHTML = "Case rate (per 100,000 people)";
    } else {
        metric = "TESTRATE";
        document.getElementById('datalabel').innerHTML = "Test rate (per 100,000 people)";
    };

    chartDraw(zipString, metric);
}



function chartDraw(zs, m) {
    var boroLabel;
    if (parentBoro === "Bronx") { boroLabel = "BX" }
    else if (parentBoro === "Brooklyn") { boroLabel = "BK" }
    else if (parentBoro === "Manhattan") { boroLabel = "MN" }
    else if (parentBoro === "Queens") { boroLabel = "QN" }
    else { boroLabel = "SI" };

    console.log('boroLabel is ' + boroLabel);

    //This updates the chart URL based on the metric
    if (metric === "TESTRATE") {
        chartSpec.data.url = "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/trends/testrate-by-modzcta.csv"
    } else if (metric === "PCTPOS") {
        chartSpec.data.url = "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/trends/percentpositive-by-modzcta.csv"
    } else if (metric === "CASERATE") {
        chartSpec.data.url = "https://raw.githubusercontent.com/nychealth/coronavirus-data/master/trends/caserate-by-modzcta.csv"
    };
    console.log(chartSpec.data.url);

    // These update the encoding based on the metric, ZIP, and parent Boro
    chartSpec.layer[0].encoding.y.field = m + "_CITY";
    chartSpec.layer[0].encoding.tooltip[0].field = m + "_CITY";

    chartSpec.layer[1].encoding.y.field = m + "_" + boroLabel;
    chartSpec.layer[1].encoding.tooltip[0].field = m + "_" + boroLabel;
    chartSpec.layer[1].encoding.tooltip[0].title = parentBoro;

    chartSpec.layer[2].encoding.y.field = m + "_" + zs; // set line TESTRATE_11226
    chartSpec.layer[2].encoding.tooltip[0].field = m + "_" + zs; // set tooltip
    chartSpec.layer[2].encoding.tooltip[0].title = zs; // set tooltip title

    //and then this draws the chart
    vegaEmbed("#trchart", chartSpec);
}
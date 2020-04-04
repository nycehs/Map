let geoDataURL = "zcta.geo.json";
let covidDataURL = "../FakeZCTAData.csv";
let geoRequest = new XMLHttpRequest();
let covidRequest = new XMLHttpRequest();
let geoObj = {};
let covidObj = {};
let viewObj = {};
let spec = "map2.vl.json";
const opt = {"renderer":"svg"};
const el = document.getElementById('map');
let view = {};


//this function uses D3 to load the data with promises
function loadData () {
  console.log("loadData called");
  Promise.all([
    d3.json(geoDataURL),
    d3.csv(covidDataURL)
  ]).then(function(data) {
    geoObj = data[0]
    covidObj = data[1]
    console.log(data[0])  // geojson
    console.log(data[1][0])  // first row of data
    
  }).then(mapCreate());

}

function mapCreate() {
L.geoJSON(geoObj, {
  style: function (feature) {
      return {color: "red"};
  }
}).bindPopup(function (layer) {
  return layer.feature.properties.MODZCTA;
}).addTo(map);
}

loadData();

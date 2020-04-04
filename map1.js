let geoDataURL = "../zcta.topo.json";
let covidDataURL = "../FakeZCTAData.csv";
let geoObj = {};
let covidObj = {};
let viewObj = {};
let spec = "map1.vl.json";
const opt = {"renderer":"svg"};
const el = document.getElementById('map');

//this older version imports the data from URL in the spec
const specOld = "map1.vl.json";
function mapCreate() {
vegaEmbed('#map', spec, opt).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    viewObj = result.view;
  }).catch(console.error);
}

mapCreate();

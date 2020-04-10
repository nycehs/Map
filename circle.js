let geoDataURL = "../zcta.topo.json";
let covidDataURL = "../FakeZCTAData.csv";
let geoObj = {};
let covidObj = {};
let viewObj = {};
let countSpec = "map1variant.vl.json";
let rateSpec = "mapRate.vl.json";
let percentSpec = "mapPercent.vl.json";
let deathSpec = "";
let radios ;


const opt = {"renderer":"svg"};
const el = document.getElementById('map');

// this code listens to the form with map chooser; must run after DOM loads
window.onload =listenRadios;

function listenRadios() {
  radios = document.querySelectorAll('input[type=radio][name="mapRadioGroup"]');
  radios.forEach(radio => radio.addEventListener('change', () => {
    if (radio.value==='Case Count') {countMapCreate()}
    else if (radio.value==='Case Rate') {rateMapCreate()}
    else {percentMapCreate()}  // for if chosenField is Percent Positive
    ;
  }));
}
  
//this function creates the map
function countMapCreate() {
vegaEmbed('#map', countSpec, opt).then(function(result) {
    // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
    viewObj = result.view;
  }).catch(console.error);
}
function rateMapCreate() {
  vegaEmbed('#map', rateSpec, opt).then(function(result) {
      // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
      viewObj = result.view;
    }).catch(console.error);
  }
  function percentMapCreate() {
    vegaEmbed('#map', percentSpec, opt).then(function(result) {
        // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
        viewObj = result.view;
      }).catch(console.error);
    }

countMapCreate();

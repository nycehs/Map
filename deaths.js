let geoDataURL = "../zcta.topo.json";
let covidDataURL = "../FakeZCTAData.csv";
let geoObj = {};
let covidObj = {};
let viewObj = {};
let deathCountSpec = "mapDeathCountCircle.vl.json";
let deathRateSpec = "mapDeathRate.vl.json";
let radios ;


const opt = {"renderer":"svg"};
const el = document.getElementById('map');

// this code listens to the form with map chooser; must run after DOM loads
window.onload =listenRadios;

function listenRadios() {
  radios = document.querySelectorAll('input[type=radio][name="mapRadioGroup"]');
  radios.forEach(radio => radio.addEventListener('change', () => {
     if (radio.value==='Death Count') {deathCountMapCreate()}
    else  {deathRateMapCreate()}
    ;
  }));
}
  
//this function creates the map


    function deathRateMapCreate() {
      vegaEmbed('#map', deathRateSpec, opt).then(function(result) {
          // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
          viewObj = result.view;
        }).catch(console.error);
      }

      function deathCountMapCreate() {
        vegaEmbed('#map', deathCountSpec, opt).then(function(result) {
            // Access the Vega view instance (https://vega.github.io/vega/docs/api/view/) as result.view
            viewObj = result.view;
          }).catch(console.error);
        }

deathRateMapCreate();

let geoDataURL = "../CD_simplified_wPM.geojson";
let geoRequest = new XMLHttpRequest();
let geoObj = {};

geoRequest.open('GET',geoDataURL);
geoRequest.responseType = 'json';
geoRequest.send();

geoRequest.onload = function(){
    geoObj = geoRequest.response;
}


//declaring variables of convenience
var cityCase = document.getElementById("citywideCases");
var cityHosp = document.getElementById('citywideHosps')
var cityDeath = document.getElementById('citywideDeaths')
var boroCase = document.getElementById('boroughsCases');
var boroHosp = document.getElementById('boroughsHosps');
var boroDeath = document.getElementById('boroughsDeaths');
var button = document.getElementById("boroughsButton");


function showBoroughs() {
    // If NYC Cases, to Boroughs Cases
    if (cityCase.style.display === "block") {
        cityCase.style.display = "none";
        boroCase.style.display = "block"
        button.innerHTML = "Show Citywide";
    }
    // If Boro Cases,  to NYC Cases
    else if (boroCase.style.display === "block") {
        cityCase.style.display = "block";
        boroCase.style.display = "none"
        button.innerHTML = "Show Boroughs";
    }

    //if NYC Hosp, to Boro hosp
    else if (cityHosp.style.display === "block") {
        cityHosp.style.display = "none";
        boroHosp.style.display = "block";
        button.innerHTML = "Show Citywide";
    }

    //if Boro Hosp,  to NYC Hosp
    else if (boroHosp.style.display === "block") {
        boroHosp.style.display = "none";
        cityHosp.style.display = "block";
        button.innerHTML = "Show Boroughs";
    }

    //if NYC Death, to Boro Death
    else if (cityDeath.style.display === "block") {
        cityDeath.style.display = "none";
        boroDeath.style.display = "block";
        button.innerHTML = "Show Citywide";
    }

    //if Boro Death,  to NYC Death
    else if (boroDeath.style.display === "block") {
        boroDeath.style.display = "none";
        cityDeath.style.display = "block";
        button.innerHTML = "Show Boroughs";
    }
}


function showCases() {
    document.getElementById('caseButton').classList.add('highlight');
    document.getElementById('hospButton').classList.remove('highlight');
    document.getElementById('deathButton').classList.remove('highlight');


    //if City view, show City cases
    if (cityHosp.style.display === "block" || cityDeath.style.display === "block") {
        cityCase.style.display = "block";
        cityHosp.style.display = "none";
        cityDeath.style.display = "none";
        button.innerHTML = "Show Boroughs";
    }

    //if Boro view, show Boro cases
    else if (boroHosp.style.display === "block" || boroDeath.style.display === "block") {
        boroCase.style.display = "block";
        boroHosp.style.display = "none";
        boroDeath.style.display = "none";
        button.innerHTML = "Show Citywide";
    }
}


function showHosps() {
    document.getElementById('hospButton').classList.add('highlight');
    document.getElementById('caseButton').classList.remove('highlight');
    document.getElementById('deathButton').classList.remove('highlight');



    //if City view, show City Hosps
    if (cityCase.style.display === "block" || cityDeath.style.display === "block") {
        cityHosp.style.display = "block";
        cityCase.style.display = "none";
        cityDeath.style.display = "none";
        button.innerHTML = "Show Boroughs";
    }
    //if Boro view, show Boro hosps
    else if (boroCase.style.display === "block" || boroDeath.style.display === "block") {
        boroHosp.style.display = "block";
        boroCase.style.display = "none";
        boroDeath.style.display = "none";
        button.innerHTML = "Show Citywide";
    }

}


function showDeaths() {
    document.getElementById('deathButton').classList.add('highlight');
    document.getElementById('hospButton').classList.remove('highlight');
    document.getElementById('caseButton').classList.remove('highlight');


    //if City view, show City Deaths
    if (cityCase.style.display === "block" || cityHosp.style.display === "block") {
        cityDeath.style.display = "block";
        cityCase.style.display = "none";
        cityHosp.style.display = "none";
        button.innerHTML = "Show Boroughs";
    }
    //if Boro view, show Boro Deaths
    else if (boroCase.style.display === "block" || boroHosp.style.display === "block") {
        boroDeath.style.display = "block";
        boroCase.style.display = "none";
        boroHosp.style.display = "none";
        button.innerHTML = "Show Citywide";
    }
}

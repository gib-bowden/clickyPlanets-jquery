"use strict";

const planets = require('./planets');

$('#showButton').mouseover(() => {
    console.log(planets.getPlanets()); 
    createDomString(planets.getPlanets()); 
});

const createDomString = (arr) => {
    let planetString= "";
    arr.forEach((planet, index) =>{
    planetString += `<div class="planetBox"  id="planetBox-${index}">
        <div class="planetName hidden">${planet.name}</div>
        <img class="planetImage" src="${planet.url}"> 
    </div>`;
    });
    printToDom(planetString); 
};

const printToDom = (str) => {
    $('#planetHolder').html(str);
};

const showPlanetName = () => {
    $('body').on('click','.planetImage', (e) => {
        $(e.target).prev().toggleClass("hidden"); 
    });
};

$('#clearButton').click(() => {
    $('#planetHolder').empty();
});


$('#searchText').keypress((e) => {
    if (e.key === 'Enter') {
        let txt = $('#searchText').val();
        let results = planets.getPlanets().filter((planet) => {
            return planet.name.indexOf(txt)>-1;
        });
        createDomString(results); 
        $('.planetName').removeClass("hidden");
    }
});

$('#clearButton').click(() => {
    console.log("this is from my event", planets.getBackgroundPlanet());
    let planetInfo = planets.getBackgroundPlanet();
    $('#planetHolder').html(`<h1>${planetInfo.title}</h1>`);
    $('#planetHolder').append(`<p>${planetInfo.explanation}</p>`);
    

    
});

showPlanetName();

module.exports = {}; 
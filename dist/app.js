(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{"./planets":3}],2:[function(require,module,exports){
"use strict"; 

require('./planets'); 
require('./events');
},{"./events":1,"./planets":3}],3:[function(require,module,exports){
"use strict"; 

let planets = []; 
let backgroundPlanet = {}; 

$.get('../db/planets.json').done((data) => {
    planets = data.planets; 
}).fail((error) => {
    console.log(error);
}); 

$.ajax({
    method: 'GET',
    url:'https://api.nasa.gov/planetary/apod?api_key=cML4iFHlbQ0IUTnGJROHnsbAfZ3Dl6TMWimdwSNY'})
    .done((data) => { 
    $('body').css('background-image', `url(${data.url})`);
    backgroundPlanet = data; 
}).fail((error) => {
    console.log(error);
}); 

const getPlanets = () => {
    return planets; 
};

const getBackgroundPlanet = () => {
    return backgroundPlanet; 
};

module.exports = {
    getPlanets,
    getBackgroundPlanet
};


},{}]},{},[2]);

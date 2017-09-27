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


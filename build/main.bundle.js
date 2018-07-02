"use strict";

// 1. max. 140 znaków
// Cytat powinien pobierać się przy pierwszym załadowaniu strony oraz 
// przy kliknięciu w przycisk z napisem 'Random quote'.
// Przycisk "Tweet" powinien rzecz jasna udostępnić tweeta z cytatem.

var prefix = "https://cryptic-headland-94862.herokuapp.com/";

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";

var trigger = document.querySelector('.trigger');
trigger.addEventListener('click', function () {
	getQuote();
});

function getQuote() {
	fetch(prefix + quoteUrl, { cache: "no-store" }).then(function (response) {
		return response.json();
	}).then(function (myJson) {
		console.log(myJson);
		return myJson;
	}).then(createTweet);
}

function createTweet(input) {

	//var data = input[0];
	console.log('data from callback' + input);
}

//-------------------------------------------

var url = 'http://api.icndb.com/jokes/random';

var joke = document.getElementById('joke');
var button = document.getElementById('get-joke');
button.addEventListener('click', function () {
	getRequest();
});

function getRequest() {
	var request = new XMLHttpRequest();
	request.open('GET', 'http://api.icndb.com/jokes/random'); // just like it's been until now
	request.onload = function () {
		if (request.status == 200) {
			console.log(request.response);
			obj = JSON.parse(request.response);
			console.log(obj);
			joke.innerHTML = obj.value.joke;
		}
	};
	request.send();
}

window.onload = function () {
	getRequest();
};

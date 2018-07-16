"use strict";

var prefix = "https://cryptic-headland-94862.herokuapp.com/";

var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
var quoteElement = document.querySelector('.quote');
var authorElement = document.querySelector('.author');

// Create hooks
var fetchQuoteStart = new Event('fetchQuoteStart');
var fetchQuoteEnd = new Event('fetchQuoteEnd');
var fetchJokeStart = new Event('fetchJokeStart');
var fetchJokeEnd = new Event('fetchJokeEnd');

var trigger = document.querySelector('.trigger');
trigger.addEventListener('click', function () {
    getQuote();
});

function getQuote() {
    // Dispatch the event.
    document.dispatchEvent(fetchQuoteStart);
    return fetch(prefix + quoteUrl, { cache: "no-store" }).then(function (response) {
        return response.json();
    }).then(createTweet).catch(function (error) {
        return console.warn(error);
    });
}

function createTweet(responseData) {
    dataElement = document.createElement('div');
    dataElement.innerHTML = responseData[0].content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = responseData[0].title;
    if (!quoteAuthor.length) {
        quoteAuthor = "Author unknown";
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if (tweetText.length > 140) {
        getQuote();
    } else {
        // Dispatch the event.
        document.dispatchEvent(fetchQuoteEnd);
        var tweet = tweetLink + encodeURIComponent(tweetText);
        document.querySelector('.quote').innerText = quoteText;
        document.querySelector('.author').innerText = "Author: " + quoteAuthor;
        document.querySelector('.tweet').setAttribute('href', tweet);
    }
}

var url = 'http://api.icndb.com/jokes/random';

var joke = document.getElementById('joke');
var button = document.getElementById('get-joke');
button.addEventListener('click', function () {
    getRequest();
});

function getRequest() {
    // Dispatch the event.
    document.dispatchEvent(fetchJokeStart);
    var request = new XMLHttpRequest();
    request.open('GET', prefix + url); // just like it's been until now
    request.onload = function () {
        if (request.status == 200) {
            //console.log(request.response);
            obj = JSON.parse(request.response);
            //console.log(obj);
            joke.innerHTML = obj.value.joke;
            // Dispatch the event.
            document.dispatchEvent(fetchJokeEnd);
        }
    };
    request.send();
}

window.onload = function () {
    getRequest();
    getQuote();
};

var loaderQuoteElem = document.getElementById("loader-quote");
var contentQuoteElem = document.getElementById("content-quote");
var loaderJokeElem = document.getElementById("loader-joke");
var jokeElem = document.getElementById("joke");

// Listen for the event.
document.addEventListener('fetchQuoteStart', function (e) {
    loaderQuoteElem.style.display = "block";
    contentQuoteElem.style.display = "none";
}, false);

document.addEventListener('fetchQuoteEnd', function (e) {
    loaderQuoteElem.style.display = "none";
    contentQuoteElem.style.display = "block";
}, false);

document.addEventListener('fetchJokeStart', function (e) {
    loaderJokeElem.style.display = "block";
    jokeElem.style.display = "none";
}, false);

document.addEventListener('fetchJokeEnd', function (e) {
    loaderJokeElem.style.display = "none";
    jokeElem.style.display = "block";
}, false);

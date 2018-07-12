const prefix = "https://cryptic-headland-94862.herokuapp.com/";

const tweetLink = "https://twitter.com/intent/tweet?text=";
const quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');

// Create hooks
var fetchQuoteStart = new Event('fetchQuoteStart');
var fetchQuoteEnd = new Event('fetchQuoteEnd');
var fetchJokeStart = new Event('fetchJokeStart');
var fetchJokeEnd = new Event('fetchJokeEnd');

const trigger = document.querySelector('.trigger');
trigger.addEventListener('click', function() {
    getQuote();
});

function getQuote() {
    // Dispatch the event.
    document.dispatchEvent(fetchQuoteStart);
    return fetch(prefix + quoteUrl, { cache: "no-store" })
        .then((response) => response.json())
        .then(createTweet)
        .catch(error => console.warn(error));
}

function createTweet(responseData) {
    debugger;
    dataElement= document.createElement('div');
    dataElement.innerHTML = responseData[0].content;
    var quoteText = dataElement.innerText.trim();
    var quoteAuthor = responseData[0].title;
    if(!quoteAuthor.length) {
        quoteAuthor = "Author unknown"
    }

    var tweetText = "Quote of the day - " + quoteText + " Author: " + quoteAuthor;

    if(tweetText.length > 140){
        getQuote();
    } else {
        debugger;
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
button.addEventListener('click', function() {
    getRequest();
})

function getRequest() {
    // Dispatch the event.
    document.dispatchEvent(fetchJokeStart);
    var request = new XMLHttpRequest();
    request.open('GET', prefix + url); // just like it's been until now
    request.onload = function() {
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

window.onload = function() {
    getRequest();
    getQuote();
};

// Listen for the event.
document.addEventListener('fetchQuoteStart', function(e) {
    document.getElementById("loader-quote").style.display = "block";
    document.getElementById("content-quote").style.display = "none";
}, false);

document.addEventListener('fetchQuoteEnd', function(e) {
    document.getElementById("loader-quote").style.display = "none";
    document.getElementById("content-quote").style.display = "block";
}, false);

document.addEventListener('fetchJokeStart', function(e) {
    document.getElementById("loader-joke").style.display = "block";
    document.getElementById("joke").style.display = "none";
}, false);

document.addEventListener('fetchJokeEnd', function(e) {
    document.getElementById("loader-joke").style.display = "none";
    document.getElementById("joke").style.display = "block";
}, false);




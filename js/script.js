const prefix = "https://cryptic-headland-94862.herokuapp.com/";

const tweetLink = "https://twitter.com/intent/tweet?text=";
const quoteUrl = "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1";
const quoteElement = document.querySelector('.quote');
const authorElement = document.querySelector('.author');

const trigger = document.querySelector('.trigger');
trigger.addEventListener('click', function() {
    getQuote();

});

function getQuote() {
    return fetch(prefix + quoteUrl, { cache: "no-store" })
        .then((response) => response.json())
        .then(createTweet)
        .catch(error => console.warn(error));
}

function createTweet(responseData) {

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
    var request = new XMLHttpRequest();
    request.open('GET', prefix + url); // just like it's been until now
    request.onload = function() {
        if (request.status == 200) {
            //console.log(request.response);
            obj = JSON.parse(request.response);
            //console.log(obj);
            joke.innerHTML = obj.value.joke;
        }
    };
    request.send();
}

window.onload = function() {
    getRequest();
    getQuote();
};


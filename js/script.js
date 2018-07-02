var url = 'http://api.icndb.com/jokes/random';

var joke = document.getElementById('joke');
var button = document.getElementById('get-joke');
button.addEventListener('click', function() {
	getRequest();
})

function getRequest() {
	var request = new XMLHttpRequest();
	request.open('GET', 'http://api.icndb.com/jokes/random'); // just like it's been until now
	request.onload = function() {
		if (request.status == 200) {
			console.log(request.response);
			obj = JSON.parse(request.response);
			console.log(obj);
			joke.innerHTML = obj.value.joke;

		}
	};
	request.send();
}

window.onload = function() {
  	getRequest();
};

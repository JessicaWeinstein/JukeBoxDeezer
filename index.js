//Jukebox HW_V2... API

//For Spotify API: following these instructions:
//https://developer.spotify.com/documentation/web-api/quick-start/

//OR ____

//For Deezer API follwoiing these instructions:
//https://developers.deezer.com/api



$(document).ready(function (){

		let submit = document.getElementById("click-searchButton");
			submit.addEventListener("click", searchAjaxCall)

		//click enter key instead of submit button:
		let searchInput = document.getElementById("searchInput");
			searchInput.addEventListener("keyup", function(event) {
			  // Number 13 is the "Enter" key on the keyboard
			  if (event.keyCode === 13) {
			  // Cancel the default action, if needed
			    event.preventDefault();
			  // Trigger the button element with a click
				searchAjaxCall();
			  }
			});

		//variables:
		let albumArt = document.getElementById("albumArt")
		let songArtist = document.getElementById("songArtist");
		let songTitle = document.getElementById("songTitle");
		let albumTitle = document.getElementById("albumTitle");
		// added the const lines below to get rid of the error: "No 'Access-Control-Allow-Origin' header is present on the requested resource—when trying to get data from a REST API"
		//https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
		const proxyurl = "https://cors-anywhere.herokuapp.com/"; 
		const url = "https://api.deezer.com/search?q=";

		let playButton = document.getElementById("play");
			playButton.addEventListener("click", playLastSong);
		let pauseButton = document.getElementById("pause");
		let stopButton = document.getElementById("stop");
		let previousButton = document.getElementById("previous");
		let nextButton = document.getElementById("next");
		let musicPlayer = document.getElementById("myAudio")

		//empty array for previous and next buttons 
		var searchResults = []

		//connects the search to the deezer api:
		function searchAjaxCall(){
			// console.log(searchInput.value)
			$.ajax({	
				url: proxyurl + url + searchInput.value,
				success: function(response) {
				displaySearchData(response);
				playSongPreview(response);
				// console.log(response)

				//clear out search results if you do multiple searches
				searchResults = []
				//populate searchResults with the results data
				searchResults = response
				console.log(searchResults)

				}
			})
		}
		//write to screen:
		function displaySearchData(input){
				albumArt.style.backgroundImage = "url('" + input.data[i].album.cover_big + "')"
				songArtist.innerHTML = " ARTIST: " + input.data[i].artist.name
				songTitle.innerHTML = " TITLE: " + input.data[i].title 
				albumTitle.innerHTML = " ALBUM: " + input.data[i].album.title
		}
		//plays song after search is done:
		function playSongPreview(input){
			unClickedButton();
			musicPlayer.src = input.data[0].preview;
			musicPlayer.play();	
			playButton.src = "icons/play_White_Fill.png";
		}
		//plays same song when play is clicked:
		function playLastSong(){
			musicPlayer.play();
			unClickedButton();	
			playButton.src = "icons/play_White_Fill.png";
		}

		var i = 0; //first song is 0 in index

		pauseButton.addEventListener("click", pauseSong);
		stopButton.addEventListener("click", stopSong);
		previousButton.addEventListener("click", previousSong);
		nextButton.addEventListener("click", nextSong);
		

		function unClickedButton(){
			playButton.src = "icons/play_White.png";
			pauseButton.src = "icons/pause_White.png";
			stopButton.src = "icons/stop_White.png";
			previousButton.src = "icons/rewind_White.png";
			nextButton.src = "icons/FF_White.png";
		}


		function pauseSong() {
			unClickedButton();
			musicPlayer.pause();
			pauseButton.src = "icons/pause_White_Fill.png";	
		}

		function stopSong() {
			unClickedButton();
			musicPlayer.pause();
			musicPlayer.currentTime = 0
			stopButton.src = "icons/stop_White_Fill.png";
		}

		function previousSong(){
			unClickedButton();
			previousButton.src = "icons/rewind_White_Fill.png";

			$.ajax({
				url: proxyurl + url + searchInput.value,
				success: function(response){
					displaySearchData(response);

					// clear out searchResults, or else it will keep adding arrays after multiple searches
					searchResults = []
					//populate searchResults array wiith the search results data (an array of key/value pairs)
					searchResults = response
					console.log(searchResults)
				}

			})

			if (i === 0){
				i = searchResults.length -1 //last song in array
			}
			else{
				i--; // if not first song it goes to previous index in array
			}
			musicPlayer.src = searchResults.data[i].preview;
			musicPlayer.play();

			
		}

		function nextSong(){
			unClickedButton();
			nextButton.src = "icons/FF_White_Fill.png";

			$.ajax({
				url: proxyurl + url + searchInput.value,
				success: function(response){
					displaySearchData(response);

					// clear out searchResults, or else it will keep adding arrays after multiple searches
					searchResults = []
					//populate searchResults array wiith the search results data (an array of key/value pairs)
					searchResults = response
					console.log(searchResults)
				}

			})

			if (i === searchResults.length -1){ // sets i to first song if you're on the last song
				i = 0

			}
			else{
				i++; // adds 1 to the index in array
			}
			musicPlayer.src = searchResults.data[i].preview;
			musicPlayer.play();
	
		}

});
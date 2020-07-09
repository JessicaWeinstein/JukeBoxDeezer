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

		//connects the search to the deezer api:
		function searchAjaxCall(){
			// console.log(searchInput.value)
			$.ajax({	
				url: proxyurl + url + searchInput.value,
				success: function(response) {
				displaySearchData(response);
				playSongPreview(response);
				console.log(response)
				}
			})
		}
		//write to screen:
		function displaySearchData(input){
				albumArt.style.backgroundImage = "url('" + input.data[0].album.cover_big + "')"
				songArtist.innerHTML = " ARTIST: " + input.data[0].artist.name
				songTitle.innerHTML = " TITLE: " + input.data[0].title 
				albumTitle.innerHTML = " ALBUM: " + input.data[0].album.title
		}
		//plays song after search is done:
		function playSongPreview(input){
			unClickedButton();
			musicPlayer.src = input.data[0].preview;
			musicPlayer.play();	
			playButton.src = "icons/play_White_Fill.png";
		}
		//plays same song when play is clicked:
		function playLastSong(input){
			musicPlayer.play();
			unClickedButton();	
			playButton.src = "icons/play_White_Fill.png";
		}

		//empty array for previous and next buttons (didn't finish)
		var songs = []
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
			if (i === 0){
				i = songs.length -1 //last song in array
			}
			else{
				i--; // if not first song it goes to previous index in array
			}
			musicPlayer.src = songs[i]; 
			musicPlayer.play();

			previousButton.src = "icons/rewind_White_Fill.png";
			
		}

		function nextSong(input){
			unClickedButton();
			if (i === input.data.length -1){ // sets i to first song if you're on the last song
				i = 0
			}
			else{
				i++; // adds 1 to the inidex in array
			}
			//musicPlayer.src = input.data[i].preview;
			//musicPlayer.src = songs[i];
			musicPlayer.play();

			nextButton.src = "icons/FF_White_Fill.png";
			
			
		}

});
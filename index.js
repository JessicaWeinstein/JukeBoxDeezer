//Jukebox HW_V2... API

//HINT: look at code from image gallery, array of images is similar to array of songs

//For Spotify API: following these instructions:
//https://developer.spotify.com/documentation/web-api/quick-start/

//OR ____

//For Deezer API follwoiing these instructions:
//https://developers.deezer.com/api



$(document).ready(function (){

		let submit = document.getElementById("click-searchButton");
			submit.addEventListener("click", searchAjaxCall)
		let searchInput = document.getElementById("searchInput");
			// Execute a function when the user releases a key on the keyboard
			searchInput.addEventListener("keyup", function(event) {
			  // Number 13 is the "Enter" key on the keyboard
			  if (event.keyCode === 13) {
			  // Cancel the default action, if needed
			    event.preventDefault();
			  // Trigger the button element with a click
				searchAjaxCall();
			  }
			});
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

		function displaySearchData(input){
			// for (let i = 0; i < input.data.length; i++){
			// 	if (input[i].data.title.toLowerCase() == searchInput.value.toLowerCase()){
			// 		$("songTitle").html("Song Title: " + input.data[i].title); // change to data[i].title or response.data[i].title NOT:input[0].title
			// 		console.log(input.data[i].title)
			// 	}
			// }
			// console.log(input)

				albumArt.style.backgroundImage = "url('" + input.data[0].album.cover_big + "')"
				songArtist.innerHTML = " ARTIST: " + input.data[0].artist.name
				songTitle.innerHTML = " TITLE: " + input.data[0].title 
				albumTitle.innerHTML = " ALBUM: " + input.data[0].album.title

		}

		function playSongPreview(input){
			unClickedButton();
			musicPlayer.src = input.data[0].preview;
			musicPlayer.play();	
			playButton.src = "icons/play_White_Fill.png";
		}

		function playLastSong(input){
			musicPlayer.play();
			unClickedButton();	
			playButton.src = "icons/play_White_Fill.png";
		}

		var songs = []


		// var songs = [
		// 	"audio/Porches - Slow Dance in the Cosmos - 10 The Cosmos.mp3",
		// 	"audio/Trace Mountains - Lost in the Country - 01 Rock & Roll.mp3",
		// 	"audio/Angel Olsen - Shut Up Kiss Me.mp3"
		// ];

		

		var i = 0; //first song is 0 in index

		//playButton.addEventListener("click", playSong);
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


		// function playSong(){
		// 	unClickedButton();
		// 	musicPlayer.play();	
		// 	playButton.src = "icons/play_White_Fill.png";
			
		// }

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
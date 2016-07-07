'use strict';
//start the program when the document is ready
$(document).ready(function () {

//Create event handler for when the search button is clicked
$('form').submit(function(evt) {
	evt.preventDefault();
//store omdbapi url location in a variable
var omdb = "http://www.omdbapi.com/?";
var search = $("#search").val();
//create omdb paramaters object
var params = {
	s: search,
	r: "json",
};

//create a function for 0 returned movie results to display no movies were found that match the search variable.
function errorMovies() {
	var errorHTML = '';
	errorHTML += '<li class="no-movies">';
	errorHTML += '<i class="material-icons icon-help">';
	errorHTML += 'help_outline' + '</i>';
	errorHTML += 'No movies found that match:' + '' + search + '.';
	errorHTML += '</li>';
	$('#movies').html(errorHTML);
	return;
}

//create a function to iterate over the array returned from our omdb api, create list items for each item returned.
function displayMovies(data) {
		var movieHTML = '';
	$.each(data.Search, function(i, movie) {
		movieHTML += '<li>';
		movieHTML += '<div class="poster-wrap">';
		//if the movie poster does not return "N/A" show the poster
	if (movie.Poster != "N/A") {
		movieHTML += '<img class="movie-poster" src="' + movie.Poster + '" >';
		//otherwise show a placeholder icon
	} else if (movie.Poster == "N/A") {
		movieHTML += "<i class='material-icons poster-placeholder'>crop_original</i>";
	}
		movieHTML += '</div>';
		movieHTML += '<span class="movie-title">';
		movieHTML += movie.Title;
		movieHTML += '</span>';
		movieHTML += '<span class="movie-year">';
		movieHTML += movie.Year;
		movieHTML += '</span>';
		movieHTML += '</li>';
	});

//if no data response, run errorMovies function
if (data.Response == "False") {
	errorMovies();
} else {
//add the movieHTML to the movies unordered list.
$('#movies').html(movieHTML);
}  //end if conditional for movie errors.

} //end function displayMovies

//create a getJSON request pass it the OMDB api, the params parameters and the displayMovies callback.
$.getJSON(omdb, params, displayMovies);


}); //end form submit event


}); //ready close
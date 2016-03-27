$(document).ready(function() {
  
  //default (upcoming movies)
  ajaxRequest("https://api.themoviedb.org/3/movie/upcoming?api_key=5757af4222f6b6b7a2b1b61e2e67364a");
  
  //popular movies
  $("button#popular").click(function() {
    ajaxRequest("https://api.themoviedb.org/3/movie/popular?api_key=5757af4222f6b6b7a2b1b61e2e67364a");
  });
  
  //upcoming movies
  $("button#upcoming").click(function() {
    ajaxRequest("https://api.themoviedb.org/3/movie/upcoming?api_key=5757af4222f6b6b7a2b1b61e2e67364a");
  });
  
  //top-rated movies
  $("button#top_rated").click(function() {
    ajaxRequest("https://api.themoviedb.org/3/movie/top_rated?api_key=5757af4222f6b6b7a2b1b61e2e67364a"); 
  });
  
  //now playing
  $("button#now_playing").click(function() {
    ajaxRequest("https://api.themoviedb.org/3/movie/now_playing?api_key=5757af4222f6b6b7a2b1b61e2e67364a");
  });
  
  //search movie
  $("#search-input").on("input",function() {
    if($("#search-input").val() !== "") {
      var query = $("#search-input").val();
      var url = "https://api.themoviedb.org/3/search/movie?query=" + query + "&api_key=5757af4222f6b6b7a2b1b61e2e67364a";
      ajaxRequest(url);
    } else {
      $(".movies").html("");
    }
  });
  
  /*
  * the request
  * @param url - the url to send the request to
  */
  function ajaxRequest(url) {
    showLoading();
    
    $.ajax({
      type: "GET",
      dataType: "json",
      url: url,
      success: showResult
    });
  }    
  
  /*
  * show result from query
  * @param data - data from JSON-object
  */
  function showResult(data) {
    var html = "";    
    $.each(data.results, function(i, obj) {
      var imagePath = obj.poster_path ? "http://image.tmdb.org/t/p/w500" + obj.poster_path : "img/movietool.png";    
      
      html += "<div class='movie-container row'>";
      
      html += "<div class='poster-container col-xs-3'>";
      html += "<img class='img-responsive' src='" + imagePath + "' alt='movie-poster'>";
      html += "</div>";
      
      
      html += "<div class='info-container col-xs-9'>";
      html += "<h2>" + obj.title + "</h2>";
      html += "<p><span class='release'>" + obj.release_date + "</span></p>";
      html += "<p><span class='label label-primary vote'>" + obj.vote_average + "</span></p>";
      html += "<p>" + obj.overview + "</p>";
      html += "</div>";
      
      html += "</div>";
    });
    $(".movies").html(html);
  }
  
  /*
  * show loading gif
  */
  function showLoading() {
    var html = "<div class='loading'><img src='img/loading.gif'></div>";
    $(".movies").html(html);
  }

});

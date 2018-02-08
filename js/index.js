//$(document).ready(function() {
function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
          $('a').animate({right:'191px'}).focus();
          $('.tooltip').animate({right:'226px !important'}, 200);
          
            $('.fa-search').on('click', function() {
    var searchText=$('.search-input').val().replace(/ /g,"%20"); 
    var wikiLink = 'https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&exintro&exlimit=max&inprop=url&generator=search&gsroffset=&format=json&formatversion=2&callback=?&gsrsearch=' + searchText + '&continue=';
    $('.search-input').spellcheck=true;
    if(!animationComplete && $('.search-input').val()!=""){     
      //$(".searchBar").animate({top: "2.4%"}, 500);
      
      setTimeout(function() {wikiCall(wikiLink);}, 200);
    }else{wikiCall(wikiLink);}
  }); 
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
		        $('a').animate({right:'0'}).focus();
          $(".displayResults").html(""); //clears all the appended divs
          $(".container").animate({top: "50%"}, 500);
        }
}
 //});
                  
var searchText, animationComplete=false;
  $('.search-input').keypress(function(e) { //keypress (or keydown) is better than keyup since we can suppress form submit on 'enter' key being pressed 
              var searchText=$('.search-input').val().replace(/ /g,"%20"); 
              $(".container").animate({top: "100px"}, 500);
                var remoteUrlWithOrigin='https://en.wikipedia.org/w/api.php?action=query&prop=extracts|info&exintro&exlimit=max&inprop=url&generator=search&gsroffset=&format=json&formatversion=2&callback=?&gsrsearch=' + searchText + '&continue=';
            
    $('.search-input').spellcheck=true;
    //$(".container").animate({top: "2.4%"}, 500);
     animationComplete=true;
      setTimeout(function() {wikiCall(remoteUrlWithOrigin);}, 200);
    
              } );

/********************************************************************/
function wikiCall(link) {
  $(".displayResults").html(""); //clears display for each new call
  $(".displayResults").append("<br>");
  $.getJSON(link, function(searchResults) {

      for (var i = 0; i < searchResults.query.pages.length; i++) {
        $(".displayResults").append("<a href=" + searchResults.query.pages[i].fullurl + "><div class='searchResultsContainer'><span style='font-weight:bold; font-size:150%; margin-bottom:100px;'>" + searchResults.query.pages[i].title + "</span><br></br>" + searchResults.query.pages[i].extract + "</div></a>");
        $(".displayResults").append("<br>");
      }
   
  }).fail(function(jqxhr, textStatus, error) { //if .getJSON call fails
    alert(textStatus + ": " + error);
  });
}
$(function () {
    populateButtons(searchArray, "searchButton", "#buttonsArea");
    console.log("Page Loaded");
})

var searchArray = ["Mouse", "Horse", "Elephant"];

function populateButtons(searchArray, classToAdd, AreaToAddTo) {
    $(AreaToAddTo).empty();
    for (var i = 0; i < searchArray.length; i++) {
        var a = $("<button>");
        a.addClass(classToAdd);
        a.attr("data-type", searchArray[i]);
        a.text(searchArray[i]);
        $(AreaToAddTo).append(a);
    }
}

$(document).on("click", ".searchButton", function () {  //api call 
    var type = $(this).data("type");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=6j59bfFQh1ukbUtOetli3m2wX18atuGV&limit=10"; //only get 10

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var searchDiv = $("<div class='search-item'>");
            var rating = response.data[i].rating;
            var p1 = $("<p>").text("Rating: " + rating);

            //animated and still GIFs
            var animated = response.data[i].images.fixed_height.url;
            var still = response.data[i].images.fixed_height_still.url;
            var image = $("<img>")
            image.attr("src", still);
            image.attr("data-still", still);
            image.attr("data-animated", animated);
            image.attr("data-state", "still");
            image.addClass ("searchImage");
            searchDiv.append(p1);
            searchDiv.append(image);
            $("#searches").append(searchDiv);


        }
    })

})

$(document).on("click", ".searchImage", function(){
    var state = $(this).attr("data-state");
    if(state === "still"){
        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state","animated");
    }else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state","still");
    }
})


$("#addSearch").on("click", function(event){
    event.preventDefault();
    var newSearch = $("input").val();  //gets input from text box
    searchArray.push(newSearch);
    populateButtons(searchArray, "searchButton", "#buttonsArea");
    return false;
    
})
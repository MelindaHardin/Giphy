$(function () {
    populateButtons(searchArray, "searchButtons", "#buttonsArea");
    console.log("Page Loaded");
})

var searchArray = ["Dog", "Cat", "Bird"];

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
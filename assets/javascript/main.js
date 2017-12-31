$(function() {
    var giphyCategory = ["pets", "football", "bootcamp"];

    (function drawGiphyCategoryBtn() {
        $("#div-button").empty();
        for (i = 0; i < giphyCategory.length; i++) {
            var newBtn = $("<button>").addClass("btn btn-primary").attr({
                type: "button",
                id: "btn-giphyBtn"
            });
            newBtn.text(giphyCategory[i]);
            $("#div-button").append(newBtn);
        }
    }());

    $(document).on("click", "#input-addButton", function(event) {
        event.preventDefault();
        if ($("#inputtext-newGiphyCategory").val().length === 0) {
            return;
        } else {

            giphyCategory.push($("#inputtext-newGiphyCategory").val());
            var newBtn = $("<button>").addClass("btn btn-primary").attr({
                type: "button",
                id: "btn-giphyBtn"
            });
            newBtn.text($("#inputtext-newGiphyCategory").val());
            $("#div-button").append(newBtn);
        }
        $("#inputtext-newGiphyCategory").val("");
    });

    $(document).on("click", "#btn-giphyBtn", function(event) {
        var giphyUrl = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + $(this).text();

        $.ajax({
            url: giphyUrl,
            method: 'GET'
        }).done(function(response) {
            $("#div-giphyImages").empty();
            for (i = 0; i < response.data.length; i++) {
                var newImage = $("<img>").addClass("card-img-bottom").attr({
                    src: response.data[i].images.original_still.url,
                    stillImgSrc: response.data[i].images.original_still.url,
                    animateImgScr: response.data[i].images.original.url,
                    status: "still"
                });
                var newImageRating = $("<div>").addClass("card-body").append("<p class='card-text'>Rating: " + response.data[i].rating + "</p>");
                var newImageCard = $("<div>").addClass("card");
                newImageCard.append(newImageRating);
                newImageCard.append(newImage);
                $("#div-giphyImages").append(newImageCard);
            }
        });
    });

    $(document).on("click", ".card-img-bottom", function(event) {
        if ($(this).attr("status") === "still") {
            $(this).attr({
                src: $(this).attr("animateImgScr"),
                status: "animate"
            });
        } else if ($(this).attr("status") === "animate") {
            $(this).attr({
                src: $(this).attr("stillImgSrc"),
                status: "still"
            });
        }
    });
});
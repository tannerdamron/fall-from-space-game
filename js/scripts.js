var score = 0;
var color = "blue";

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// function setBG() {
//     if (Math.round(Math.random())) {
//         return "https://www.clipartmax.com/png/middle/254-2548665_big-image-cartoon-grey-cloud-png.png";
//     } else {
//         return "https://www.clipartmax.com/png/middle/254-2548665_big-image-cartoon-grey-cloud-png.png";
//     }
// }



function dropBox() {
    var length = random(100, ($(".game").width() - 100));
    var velocity = (10000);
    var size = random();
    var thisBox = $("<div/>", {
        class: "box",
        style: "width:" + size + "px; height:" + size + "px; left:" + length + "px; transition: transform " + velocity + "ms linear;"
    });

    //set data and bg based on data
    thisBox.data("test", Math.round(Math.random()));
    if (thisBox.data("test")) {
        thisBox.css({ "background": "url('https://purepng.com/public/uploads/large/purepng.com-cloudcloudskycloudyclearskynature-221519326518lfbqg.png')", "background-size": "cover" });
    } else {
        thisBox.css({ "background": "url('https://purepng.com/public/uploads/large/purepng.com-cloudcloudskycloudyclearskynature-221519326518lfbqg.png')", "background-size": "cover" });
    }


    //insert gift element
    $(".game").append(thisBox);

    //random start for animation
    setTimeout(function () {
        thisBox.addClass("move");
    }, random(0, 10000));

    //remove this object when animation is over
    thisBox.one("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend",
        function (event) {
            $(this).remove();
        });
}

// for (i = 0; i < 10; i++) {
//     dropBox();
// }

var runGame = setInterval(function () {
    for (i = 0; i < 5; i++) {
        dropBox();
    }
}, 10000);

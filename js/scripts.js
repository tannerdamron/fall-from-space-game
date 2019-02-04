var color = "blue";

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

// function setBG() {
//     if (Math.round(Math.random())) {
//         return "https://purepng.com/public/uploads/large/purepng.com-cloudcloudskycloudyclearskynature-221519326518lfbqg.png";
//     } else {
//         return "https://purepng.com/public/uploads/large/purepng.com-cloudcloudskycloudyclearskynature-221519326518lfbqg.png";
//     }
// }



function dropBox() {
    var length = random(100, ($(".game").width() - 100));
    var velocity = 10000;
    var size = 100;
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


    //insert png element
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

// How far apart the pngs are
var runGame = setInterval(function () {
    for (i = 0; i < 3; i++) {
        dropBox();
    }
}, 5000);
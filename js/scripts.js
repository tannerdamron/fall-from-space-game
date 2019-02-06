
var myGamePiece;
var obstacleOne;
var myScore;
var myObstacles = [];


// start game function

function startGame() {
    myGameArea.start();
    myGamePiece = new component(50, 50, "../img/astronaut.svg", 500, 150, "image");
    myScore = new component("25px", "Consolas", "red", 100, 30, "text");
}

// add canvas onto page when start button is pressed

var myGameArea = {
    canvas: document.createElement('canvas'),
    start: function () {
        this.canvas.width = 1614;
        this.canvas.height = 750;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
          })
          window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false; 
          })
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop : function() {
        clearInterval(this.interval);
      } 
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
  }
  
// Player and obstacles objects and constructor

function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.update = function () {
        ctx = myGameArea.context;
        if (type == "image") {
            ctx.drawImage(this.image,
                this.x,
                this.y,
                this.width, this.height);
        } else if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y); 
        } else {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        } 
    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) ||
        (mytop > otherbottom) ||
        (myright < otherleft) ||
        (myleft > otherright)) {
          crash = false;
        }
        return crash;
      }
}

// constant refreshing of game area to add player movement and objects spawning

function updateGameArea() {
    myGamePiece.speedX = 0;
    myGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {myGamePiece.speedX = -6; }
    if (myGameArea.keys && myGameArea.keys[39]) {myGamePiece.speedX = +6; }
    if (myGameArea.keys && myGameArea.keys[38]) {myGamePiece.speedY = -6; }
    if (myGameArea.keys && myGameArea.keys[40]) {myGamePiece.speedY = +6; }

    var y, x;
    for (i = 0; i < myObstacles.length; i += 1) {
      if (myGamePiece.crashWith(myObstacles[i])) {
        myGameArea.stop();
        alert("GAME OVER!")
        return;
      } 
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    if (myGameArea.frameNo == 1 || everyinterval(300)) {
        y = myGameArea.canvas.height;
        minHeight = 0;
        maxHeight = 0;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        randomSpawn = Math.floor(Math.random()*(1100-0+1)+0);
        randomHeight = Math.floor(Math.random()*(100-40+1)+60);
        randomWidth = Math.floor(Math.random()*(100-40+1)+60);
        minGap = 100;
        maxGap = 600;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);
        myObstacles.push(new component(125, 63, "../img/moon.svg", Math.floor(Math.random()*(1100-0+1)+0), 750, "image"));
        myObstacles.push(new component(150, 150, "../img/jupiter.png", Math.floor(Math.random()*(1100-0+1)+0), 750, "image"));
        myObstacles.push(new component(60, 217, "../img/rocket-01.svg", Math.floor(Math.random()*(1100-0+1)+0), 750, "image"));
      } else
    for (i = 0; i < myObstacles.length; i += 1) {
    myObstacles[i].y += -1;
    myObstacles[i].update();
    }
    myScore.text = "SCORE: " + myGameArea.frameNo;
    myScore.update();
    myGamePiece.newPos(); 
    myGamePiece.update();
}
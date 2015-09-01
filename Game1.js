//Create the GameCan
var GameCan = document.getElementById("GameCan");
//Define canDraw
var canDraw = GameCan.getContext("2d");
//Give dimensions of the GameCan
GameCan.width = 805;
GameCan.height = 675;
//Background canvas
var BackGround = document.getElementById("background");
var BackDraw = BackGround.getContext("2d");
BackGround.width = 805;
BackGround.height = 675;
//Make the character
//Handle keyboard controls
var keysDown = {}; 
addEventListener("keydown", function (e) { 
	keysDown[e.keyCode] = true; 
}, false); 
addEventListener("keyup", function (e) { 
	delete keysDown[e.keyCode]; 
}, false); 

//create character and controls
var reset = function () { 
	Block.x = 350; 
	Block.y = 350;
	Block.width = 35;
	Block.height = 35;
};

var Block = {
	speed: 400
};
var Ball = {
	speed: 275
};
var dx = 10;
var dy = 10;
var x = 500;
var y = 50;
var score =10;
var rng;
var addScore = 0;
var hit = new Audio("Sounds/hit.wav");
var bump = new Audio("Sounds/bump.wav");

var plus = function(amount) {
	addScore = addScore + amount
};

var movement = function (modifier) {
	if (65 in keysDown) { //Player holding A
		Block.x -= Block.speed * modifier;
	};
	if (68 in keysDown) { //Player holding D
		Block.x += Block.speed * modifier;
	};
	if (87 in keysDown) { //Player holding W
		Block.y -= Block.speed * modifier;	
	};
	if (83 in keysDown) { //Player holding S
		Block.y += Block.speed * modifier;
	};


	//Making the borders
	if (Block.x > GameCan.width - 30) { //right border
		Block.x -= Block.speed * modifier
	};
	if (Block.x < 0) {
		Block.x += Block.speed * modifier
	};
	if (Block.y > GameCan.height - 30) {
		Block.y -= Block.speed * modifier
	};
	if (Block.y < 0) {
		Block.y += Block.speed * modifier
	};
	//Ball collisions with border
	if (x + dx > GameCan.width-20 || x + dx < 20) {
		dx = -dx;
		plus(100);
  		rng = Math.floor(Math.random() * 10);
  		bump.play();
	};
	if (y + dy > GameCan.height-20 || y + dy < 20) {
 		dy = -dy;
 		plus(100);
  		rng = Math.floor(Math.random() * 10);
  		bump.play();
 	};
  	//Ball collisions with Block
  	if (x <= Block.x + Block.width &&
  		x + 20 >= Block.x &&
  		y <= Block.y + Block.height &&
  		20 + y >= Block.y) {

  		if (x < Block.x + Block.width ||
  			x + 20 > Block.x)
  			dy = -(15 * ((y-(Block.y+Block.height/2))/Block.height));
  			dx = -dx;
  		if (y < Block.y + Block.height ||
  			20 + y > Block.y)
  			dx = 15 * ((x-(Block.x+Block.width/2))/Block.width);
  			dy = -dy;

  		score --;

  		rng = Math.floor(Math.random() * 10);
  		hit.play();

  	};


 	//bounce
	x += dx;
	y += dy;
};

var colorArray = ["#00FF00", "blue", "#A3FF85", "#E8B48E", "#FFFF66", "#00FFFF", "#B2B2DC", "#D199D1", "#F6D5CA", "#FF1493"]

//This allows the block to start off not black
var rng = Math.floor(Math.random() * 10);

var render = function() {
	canDraw.clearRect(0, 0, GameCan.width, GameCan.height);
	canDraw.beginPath;
  	canDraw.fillStyle = colorArray[rng];
	canDraw.rect(Block.x, Block.y, Block.width, Block.height);
	canDraw.fill();
	ballmove();
	scoreBoard();
};

var DrawBackground = function() {
	BackDraw.beginPath;
	BackDraw.fillStyle = "#4D4D4D";
	BackDraw.rect(0,0, BackGround.width, BackGround.height);
	BackDraw.fill();
};
DrawBackground();

var	ballmove = function() {
	//render the ball
	canDraw.beginPath();
	canDraw.fillStyle=colorArray[rng];
	canDraw.arc(x,y,15,0,2*Math.PI);
	canDraw.fill();
};

var scoreBoard = function() {
	canDraw.beginPath();
	canDraw.font="50px Georgia";
	if (score >= 1) {
		canDraw.fillText("There are " + score + " hits left", 20, 60);	
	}
	else {
		canDraw.beginPath();
		canDraw.font="50px Georgia";
		canDraw.fillText("You loose!", 300, GameCan.height-150);

		canDraw.beginPath();
		canDraw.font="50px Georgia";
	//	canDraw.fillText("Your score is " + addScore, 200, GameCan.height-75);
	};
	var points = function() {
		canDraw.fillText("Score: " + addScore, 75, GameCan.height-50)
	};
	points();
};

var main = function () { 
	var now = Date.now(); 
	var delta = now - then; 

	movement(delta / 1000);
	render();

	then = now; 

	// Request to do this again ASAP 
	requestAnimationFrame(main); 
}; 

var w = window; 

requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();
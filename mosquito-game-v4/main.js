var game = document.querySelector("#game")
var ctx = game.getContext("2d")
var mosquito = {}, target;
var kill_count = 0;
var time_start = 0, time_limit = 60*1000;
var promises = [], entities = [];
var target, background_screen = new Image();
const font = new FontFace("AngstRidden", "url(../src/fonts/Angstridden-nrVM.ttf)")
var states_screens = [true, true];
var xf_screen, yf_screen, wtg, htg;

var cronometer_tag = document.getElementById("cronometer")
var scores_tag = document.getElementById("scores")

function gerarMosquito(x, y, rad, color){			
	var target = new Object()
	target.x = x;
	target.y = y;
	target.rad = rad;
	return target;
}

mosquito = gerarMosquito(30, 30, 30, "red")
const mosquitoImg = new Image(60, 45);
mosquitoImg.src = "../src/img/mosquito.png";
mosquitoImg.onload = drawImageActualSize;

const backgroundImg = new Image(400, 400);
backgroundImg.src = "../src/img/map.png";

function drawImageActualSize(){
	backgroundImg.onload = function(){
		
	}
}

var game = document.querySelector("#game")
var ctx = game.getContext("2d")
var mosquito = {}, target;
var kill_count = 0;
var time_start = 0, time_limit = 60*1000;

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
		ctx.drawImage(backgroundImg, 0,0,400,400);
		ctx.drawImage(mosquitoImg, mosquito.x-mosquito.rad, mosquito.y-mosquito.rad, mosquito.rad*2, mosquito.rad*2);
		game.addEventListener('click', function(event) {
			// console.log("X: " + event.clientX + ", Y: " + event.clientY)
			//ctx.fillStyle = colorBackground
			if( Math.pow( Math.pow(event.offsetX-mosquito.x, 2) + Math.pow(event.offsetY-mosquito.y, 2), 0.5) <= mosquito.rad ){
				if(time_start == 0)
					time_start = new Date().getTime()
				
				kill_count += 1
				scores_tag.textContent = kill_count
				
				// ctx.fillRect(0, 0, game.width, game.height)
				ctx.drawImage(backgroundImg, 0,0,400,400);
				
				mosquito = gerarMosquito(Math.random()*game.width, Math.random()*game.height, Math.random()*100+10, "red")
				
				ctx.fillStyle = "#000";
				ctx.beginPath();
				ctx.arc(mosquito.x, mosquito.y, 
						mosquito.rad, 0, 2 * Math.PI);
				ctx.stroke();	
				ctx.drawImage(mosquitoImg, mosquito.x-mosquito.rad, mosquito.y-mosquito.rad, mosquito.rad*2, mosquito.rad*2);
			}
		})
	}
}

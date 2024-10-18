var game = document.querySelector("#game")
var ctx = game.getContext("2d")
var mosquito = {}
var target

function gerarMosquito(x, y, rad, color){			
	var target = new Object()
	target.x = x;
	target.y = y;
	target.rad = rad;
	return target;
}

mosquito = gerarMosquito(30, 30, 30, "red")
const image = new Image(60, 45);
image.onload = drawImageActualSize;

image.src = "../src/img/mosquito.png";

function drawImageActualSize(){
	ctx.drawImage(image, mosquito.x-mosquito.rad, mosquito.y-mosquito.rad, mosquito.rad*2, mosquito.rad*2);
	//ctx.drawImage(this, mosquito.x, mosquito.y, mosquito.rad, mosquito.rad);

	game.addEventListener('click', function(event) {
		//ctx.fillStyle = colorBackground
		if( Math.pow( Math.pow(event.clientX-mosquito.x, 2) + Math.pow(event.clientY-mosquito.y, 2), 0.5) <= mosquito.rad ){
			ctx.fillRect(0, 0, game.width, game.height)
			mosquito = gerarMosquito(Math.random()*game.width, Math.random()*game.height, Math.random()*100+10, "red")
			
			ctx.fillStyle = "#000";
			ctx.beginPath();
			ctx.arc(mosquito.x, mosquito.y, 
					mosquito.rad, 0, 2 * Math.PI);
			ctx.stroke();	
			ctx.drawImage(image, mosquito.x-mosquito.rad, mosquito.y-mosquito.rad, mosquito.rad*2, mosquito.rad*2);
		}
	})
}

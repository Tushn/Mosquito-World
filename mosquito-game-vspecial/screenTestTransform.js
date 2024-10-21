var game = document.querySelector("#game")
var ctx = game.getContext("2d")
var promises = [], entities = [];
var target, background_screen = new Image();
const font = new FontFace("AngstRidden", "url(../src/fonts/Angstridden-nrVM.ttf)")
var states_screens = [true, true];
var xf_screen, yf_screen, wtg, htg;



// const elemento = document.getElementById('elemento');
var a=1, b=0, c=0, d=1, e=0, f=0;
const sliders = document.querySelectorAll('input');
const translateXInput = document.getElementById('translateX');
const translateYInput = document.getElementById('translateY');
const scaleXInput = document.getElementById('scaleX');
const scaleYInput = document.getElementById('scaleY');
const skewXInput = document.getElementById('skewX');
const skewYInput = document.getElementById('skewY');


function aplicarTransformacao() {
	var text = `translateX(${translateXInput.value}px) 
							  translateY(${translateYInput.value}px) 
							  scale(${scaleXInput.value}) 
							  rotate(${scaleYInput.value}deg) 
							  skewX(${skewXInput.value}deg) 
							  skewY(${skewYInput.value}deg)`;
	console.log( text )
	let base_skew = 500
	let base_scale = 500
	a = parseInt(scaleXInput.value)/base_scale
	d = parseInt(scaleYInput.value)/base_scale
	b = parseInt(skewXInput.value)/base_skew
	c = parseInt(skewYInput.value)/base_skew
	e = parseInt(translateXInput.value)
	f = parseInt(translateYInput.value)
}

// Adicionar event listeners a todos os sliders
for(var slider of sliders)
	slider.addEventListener('input', aplicarTransformacao);


font.load().then((font) => {
  document.fonts.add(font);
  console.log('Font loaded');
});

var camera = {
	'fov': 75,
	'sin': 0.9659,
	'cos': 0.2588
}
camera['tan'] = camera['sin']/camera['cos']

class Entity{
	constructor(src, scale=1, x=0, y=0, z=0, w=20, h=20){
		this.x = x;
		this.y = y;
		this.z = z;
		this.scale = scale;
		this.width = w;
		this.height = h;
		
		this.img = new Image()
		var _img = this.img
		promises.push(new Promise(function(resolve, reject) {
			// var img = new Image();
			_img.onload = function() {
				resolve(_img);
			};
			_img.onerror = function() {
				reject(new Error('Erro ao carregar a imagem: ' + src));
			};
			_img.src = src;
			})
		);
	}
}
class Mosquito extends Entity{
	constructor(src, scale=1, x=0, y=0, z=0, w=20, h=20){
		super(src, scale, x, y, z, w, h);
	}
	draw(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
	}
}

class Road extends Entity{
	constructor(src, scale=1, x=0, y=0, z=0, w=20, h=20){
		super(src, scale, x, y, z, w, h);
	}
	draw(){
		ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
	}
}

/* Tela inicial */
class Screen{
	constructor(src){
		this.background_screen = new Image()
		this.background_screen.src = src
		var bcgScreen = this.background_screen
		
		this.effects_enabled = false
		this.text_enabled = false
		
		promises.push(new Promise(function(resolve, reject) {
			// var img = new Image();
			bcgScreen.onload = function() {
				resolve(bcgScreen);
			};
			bcgScreen.onerror = function() {
				reject(new Error('Erro ao carregar a imagem: ' + src));
			};
			bcgScreen.src = src;
			})
		);
	}
	draw(){
		ctx.drawImage(this.background_screen,
					0,0,
					game.width,game.height)
		if(this.effects_enabled)
			this.drawEffects()
		if(this.text_enabled)
			this.drawText()
	}
	drawEffects(){			
		const gradient = ctx.createLinearGradient(0, 0, 0, 300);

		let red = Math.abs(Number.parseInt(200*gradientNumber))
		// console.log(red)
		gradient.addColorStop(0, "rgba("+red+", 0, 0, 0.2)");
		gradient.addColorStop(0.2, "rgba("+red+", 200, 0, 0.5)");
		gradient.addColorStop(0.6, "rgba("+red+", 0, 200, 0.8)");
		gradient.addColorStop(0, "rgba("+red+", 0, 0, 0.5)");
		gradient.addColorStop(1, "rgba(200, 200, 0, 0.2)");
		// gradient.addColorStop(1, "green");

		ctx.fillStyle = gradient;
		ctx.fillRect(0, 0, game.width, game.height);
		
		gradientNumber = Math.sin(Math.PI*(rot/360))
		rot += step
		if(rot > 360){
			rot = 0
		}
	}
	drawText(){
		//Angstridden-nrVM.ttf
		// ctx.font = "76px AngstRidden";
		ctx.font = "76px AngstRidden";
		ctx.fillStyle = 'black';
		ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; // Cor da sombra (RGBA)
		ctx.shadowBlur = 4;
		ctx.shadowOffsetX = 2;
		ctx.shadowOffsetY = 2;
		ctx.fillText("Mosquito World", 40+10, 120+10);
		
		ctx.font = "76px AngstRidden";
		ctx.fillStyle = 'white';
		ctx.fillText("Mosquito World", 40, 120);
		
		ctx.font = "36px Arial";
		ctx.fillStyle = 'yellow';
		ctx.fillText("Matar mosquito", 75, 280);
	}
}
/*
background_screen.src = '../src/img/title.png'
background_screen.onload = function(){
	ctx.drawImage(background_screen,
					0,0,
					game.width,game.height)
					
	const gradient = ctx.createLinearGradient(0, 0, 0, 300);

	gradient.addColorStop(0, "rgba(200, 0, 0, 0.5)");
	gradient.addColorStop(0.8, "rgba(200, 200, 0, 0)");
	//gradient.addColorStop(1, "green");

	ctx.fillStyle = gradient;
	ctx.fillRect(0, 0, game.width, game.height);
}*/

var screen = new Screen('../src/img/title.png')
var road = new Screen('../src/img/water-texture.png')
entities.push(new Mosquito('../src/img/mosquito.png'))
var gradientNumber = 0, rot = 0, step = 1

function gameLoop(timelapse){
	ctx.fillRect(0,0,400,400)
	screen.draw();
	for(let entity of entities){
		entity.draw()
	}
		
	ctx.strokeStyle = "#f0f"
	ctx.lineWidth = 10;
	var x0=0, y0=0.5, z0=0;
	var xf=1, yf=0.5, zf=2;
	const xv = 3, yv = 3
	
	wtg = (2*camera['tan'])/game.width
	htg = (2*camera['tan'])/game.height
	yf_screen = game.height/2 + (yf - yv)*zf*htg;
	// xf_screen = game.width/2 + (xf - xv)*zf*wtg;
	yf_screen = (game.height/2) * (1-(yf - yv)/(camera['tan']*zf));
	xf_screen = (game.width/2) * (1+(xf - xv)/(camera['tan']*zf));
	//yf_screen = xf + yf + zf;
	
	ctx.beginPath();
	ctx.moveTo(0, game.height);	
    // ctx.lineTo(0, game.height);
    ctx.lineTo(xf_screen, yf_screen);
	ctx.stroke();


	// ctx.transform(0.29, 0, -0.36, -0.21, 143, 201);
	// ctx.setTransform(a, b, c, d, e, f);
	ctx.transform(a, b, c, d, e, f);
	ctx.fillRect(0, 0, 400, 400);
	ctx.drawImage(road.background_screen, 0, 0, 400, 400)
	ctx.setTransform(1,0,0,1,0,0);	
	
	requestAnimationFrame(gameLoop);
}

Promise.all(promises).then(function(images) {
	images.forEach(function(img) {
		console.log('Imagem carregada:', img);
	});
	requestAnimationFrame(gameLoop);
}).catch(function(error) {
	console.error('Erro ao carregar imagens:', error);
});

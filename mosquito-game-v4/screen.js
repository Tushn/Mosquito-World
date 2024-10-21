font.load().then((font) => {
  document.fonts.add(font);
  console.log('Font loaded');
});

var camera = {
	'fov': 75,
	'sin': 0.9659,
	'cos': 0.2588,
	'x': 3,
	'y': 3
}

wtg = (2*camera['tan'])/game.width;
htg = (2*camera['tan'])/game.height;

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
class Vector3{
	constructor(x=0,y=0,z=0){
		this.x = x;	this.y = y;	this.z = z;
	}
	add(x,y,z){
		this.x += x; this.y += y; this.z += z;
	}
	sub(x,y,z){
		this.x -= x; this.y -= y; this.z -= z;
	}
	scalar(alpha){
		this.x *= alpha; this.y *= alpha; this.z *= alpha;
	}
	norm(){
		return Math.pow(this.x*this.x + this.y*this.y + this.z*this.z, 0.5);
	}
	
	addv(vec){
		this.x += vec.x; this.y += vec.y; this.z += vec.z;
	}
	subv(vec){
		this.x -= vec.x; this.y -= vec.y; this.z -= vec.z;
	}
}
class Mosquito extends Entity{
	constructor(src, scale=1, x=0, y=0, z=2, w=20, h=20){
		super(src, scale, x, y, z, w, h);
		this.direction = new Vector3();
		this.velocity = new Vector3();		
		this.speed = 0.4;
	}
	draw(){
		yf_screen = (game.height/2) * (1-(this.y - camera['y'])/(camera['tan']*(this.z+0.1)));
		xf_screen = (game.width/2) * (1+(this.x - camera['x'])/(camera['tan']*(this.z+0.1)));
		
		ctx.drawImage(this.img, xf_screen, yf_screen, this.width*(6/this.z), this.height*(6/this.z))
		// ctx.drawImage(this.img, this.x, this.y, this.width, this.height)
	}
	movement(){
		this.velocity.add(  )
	}
}

/* Tela inicial */
class Screen{
	constructor(src){
		this.background_screen = new Image()
		this.background_screen.src = src
		var bcgScreen = this.background_screen
		
		this.effects_enabled = true
		this.text_enabled = true
		
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

var screen = new Screen('../src/img/title.png')
var road = new Screen('../src/img/water-texture.png')
entities.push(new Mosquito('../src/img/mosquito.png'))
var gradientNumber = 0, rot = 0, step = 1

function loopStartScreen(){
	ctx.fillRect(0,0,400,400)
	screen.draw();
	for(let entity of entities){
		entity.draw()
	}
	//var xf=1, yf=0.5, zf=2;
	// yf_screen = (game.height/2) * (1-(yf - camera['y'])/(camera['tan']*zf));
	// xf_screen = (game.width/2) * (1+(xf - camera['x'])/(camera['tan']*zf));
	
	requestAnimationFrame(gameLoop);
}

function running(){
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
				
				/*ctx.fillStyle = "#000";
				ctx.beginPath();
				ctx.arc(mosquito.x, mosquito.y, 
						mosquito.rad, 0, 2 * Math.PI);
				ctx.stroke();*/
				ctx.drawImage(mosquitoImg, mosquito.x-mosquito.rad, mosquito.y-mosquito.rad, mosquito.rad*2, mosquito.rad*2);
			}
		})
}
function gameLoop(func, timelapse){
	func()
}


game.addEventListener('mousemove', function(event){
	if(event.offsetX>75 && event.offsetX<320 &&
		event.offsetY>250 && event.offsetY<290 ){
		game.style.cursor = "pointer";
	}else{
		game.style.cursor = "default";	
	}
})
game.addEventListener('click', function(event){
	if(event.offsetX>75 && event.offsetX<320 &&
		event.offsetY>250 && event.offsetY<290 ){
		gameLoop(running)
	}
})

gameLoop(loopStartScreen)

Promise.all(promises).then(function(images) {
	images.forEach(function(img) {
		console.log('Imagem carregada:', img);
	});
	requestAnimationFrame(gameLoop);
}).catch(function(error) {
	console.error('Erro ao carregar imagens:', error);
});

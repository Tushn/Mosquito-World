var time_start = 0, time_limit = 60*1000, time_now = 0;
var cronometerTag = document.getElementById("cronometer");
var idCronometer = -1;

function cronometerStart(){
	time_start = new Date().getTime()
	updateTimer()
}

function cronometerStop(){
	time_now = new Date().getTime()
	cancelAnimationFrame(idCronometer)
}

function cronometerRunning(){
	time_now = new Date().getTime()
	let seconds = parseInt((time_now-time_start)/1000)
	if(seconds >= 10)
		cronometer.textContent = "00:"+seconds
	else
		cronometer.textContent = "00:0"+seconds
}

function updateTimer(){
	cronometerRunning()
	idCronometer = requestAnimationFrame(updateTimer)
}
function setup(){
	createCanvas(400, 400)
}

function draw(){

	let secondi = second()

	let ora = hour() + ":" + minute() + ":" + (secondi < 10 ? "0" + secondi : secondi)

	//if (secondi < 10) secondi = ("0" + secondi)
 
	background(200)
	
    textSize(80)
	textFont("times")
	textAlign(CENTER,CENTER)
	fill(255,0,0)
	text(ora, width/2, height/2)

}
function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){
	background (0,0,0)

	for(let i=0; i<50; i=i+1) {
	let spessore = random(1,3)
	let lunghezza = random(20,100)
	let posX = random (0,width)
	let posY = random (-lunghezza,height)

	stroke(255)
	strokeWeight(spessore)
	line(posX, posY, posX, posY + lunghezza)
	}
}
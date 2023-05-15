let posizioneX 
let posizioneY 
let velX 
let velY 

function setup(){
	createCanvas(800, 400)
	posizioneX = width/2
	posizioneY = height/2
	velX = random(4,8)
	velY = random(5,7)
	background(225, 60, 0)
	

}

function draw(){
	background(0, 0, 0)

	ellipse(posizioneX, posizioneY, 100, 100)

	posizioneX = posizioneX + velX

	posizioneY = posizioneY - velY

	if(posizioneX >= width || posizioneX <= 0) velX = -velX

	if(posizioneY >= height || posizioneY <= 0) velY = -velY
	
	noStroke()

	if(posizioneX >= width || posizioneX <= 0) fill(random(255), random(255), random(255))
	if(posizioneY >= height || posizioneY <= 0) fill(random(255), random(255), random(255))
}

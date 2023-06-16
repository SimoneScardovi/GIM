let posizioneX 
let posizioneY 
let velX 
let velY 

function setup(){
	createCanvas(windowWidth, windowHeight)
	posizioneX = width/2
	posizioneY = height/2
	velX = random(4,8)
	velY = random(5,7)
	background(225, 60, 0)
	

	background(0, 0, 0)
}

function draw(){
    for(let i=0; i<2; i=i+1) {
		if(posizioneX >= width || posizioneX <= 0) ellipse(posizioneX, posizioneY, 100, 100)=ellipse(posizioneX, posizioneY, 100, 100)*2
    

	ellipse(posizioneX, posizioneY, 100, 100)

	posizioneX = posizioneX + velX

	posizioneY = posizioneY - velY

	if(posizioneX >= width || posizioneX <= 0) velX = -velX

	if(posizioneY >= height || posizioneY <= 0) velY = -velY
	
	noStroke()

	if(posizioneX >= width || posizioneX <= 0) fill(random(255), random(255), random(255))
	if(posizioneY >= height || posizioneY <= 0) fill(random(255), random(255), random(255))

	//if(posizioneY >= height || posizioneY <= 0) ellipse()=ellipse()*2
	}
}

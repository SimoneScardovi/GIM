function setup(){
	createCanvas(windowWidth, windowHeight)
}

function draw(){
	

	let h= hour()
	let m= minute()
	let s= second()
	let ms= new Date().getMilliseconds()
	
	let angolo_h = TWO_PI / 12 * h + TWO_PI / 12 / 60 * m
	let angolo_m = TWO_PI / 60 * m
	let angolo_s = TWO_PI / 60 * s + TWO_PI / 60 * ms / 1000
	
	background(180)
	
	translate(width/2,height/2)
	
	fill(255)
	
	ellipse(0,0,400,400)
	fill(0)
	
	push()
for(let i=0; i<60; i++) {

	if(i % 5 == 0)rect(-5, -190, 10, 40)
	
	
	rect(-1.5, -190, 3, 20)
	rotate(PI/30)
}
	pop()

	

	
		push()
		rotate(angolo_h)
		fill(0)
		rect(-5,20, 10,-100)
		pop()
		
		push()
		rotate(angolo_m)
		fill(0)
		rect(-5 ,12, 10,-135)
		pop()
		
		push()
		rotate(angolo_s)
		fill(255,0,0)
		noStroke()
		rect(-2,7, 4,-160)
		ellipse(0,-140,30,30)
		pop()
		ellipse(0,0, 5,5)
		
	
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
	
}
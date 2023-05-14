// G L O B A L
var c,ctx,Rain;

// R A I N

class Rain{
    //coordinate + lunghezza + velocità
    constructor(x,y,l,v){
        this.x=x;
        this.y=y;
        this.vy=v;
        this.l=l;
    }



 show(){ //DISEGNA

    ctx.beginPath();
    ctx.strokeStyle="white";
    ctx.moveTo(this.x,this.y);  //inizio goccia
    ctx.liteTo(this.x,this.y+this.l); //fine goccia
    ctx.stroke();

 }

 //gravità
 fall(){
    this.y+=this.vy;

 }
}


// L O O P
function loop(){

    rain.show();
    rain.fall();

}

// S E T U P
function setup(){

    c = document.getElementById("canvas");
    ctx = c.getContext("2d");

    rain = new Rain(10,10,10,6);

    setInterval(loop,10);
}
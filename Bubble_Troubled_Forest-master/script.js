let canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.getElementById("centerMenu").style.top = canvas.height/2 - 30 + "px";

let ctx = canvas.getContext("2d");
ctx.font = "14px Arial";

let ballRadius = 30;
let x = canvas.width / 2+300;
let y = canvas.height/5;

let timer = 100;
let startgame=0;
let level = 1;


let background=document.getElementById("background");
let a=0;

document.getElementById("background").addEventListener("load",loadon,false);

function loadon()
{
    a=1;
}

let ball=document.getElementById("ball");
let c=0;

document.getElementById("ball").addEventListener("load",loadon3,false);

function loadon3()
{
    c=1;
}



let jezLeft=document.getElementById("jezLeft");
let jezRight=document.getElementById("jezRight");
let b=0;

document.getElementById("jezLeft").addEventListener("load",loadon1,false);
document.getElementById("jezRight").addEventListener("load",loadon2,false);

function loadon1()
{
    b=-1;
}
function loadon2()
{
    b=1;
}


// U ovom dijelu kreiramo paddle !
var paddleHeight = 130;
var paddleWidth = 100;
var paddleX = (canvas.width - paddleWidth) / 2;

// ball speed
let dx = [150];
let dy = [0];

// Two variables for storing information on whether the left or right control
// button is pressed.

let leftPressed = false;
let rightPressed = false;

let spacePressed = false;

let ballsX=[x];
let ballsY=[y];
let ballsRadius=[ballRadius];
let balls = 1;

// Draw score 
let score = 0

let bulletY=0;

const g = 9.81;
let paused=1;
let music = 2;

let audio = new Audio("melody_1.mp3");

function playMusic(){

   music=1;
   audio.play(); 
    
}

function play(){
    playMusic();
    paused=0;
    startgame = 1;
    document.getElementById("paused").style.display = "none";
    document.getElementById("start").style.display = "none";
    document.getElementById("resume").style.display = "block";
    draw();
}

document.addEventListener("visibilitychange", pause2);
audio.addEventListener("ended",musicEnded,false);

function musicEnded()
{
    if(music===1)
    {
        audio.currentTime=0;
        audio.play();
    }
}

function pause2(){
    if(startgame===1){
    document.getElementById("paused").style.display = "block"; 
    document.getElementById("play").src = "images/buttons/play.png";
    paused=1;
    }
}

function drawBall() {
  for(let i = 0; i<balls; i++){  
    /*ctx.beginPath();
    ctx.arc(ballsX[i], ballsY[i], ballsRadius[i], 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();*/
    ctx.drawImage(ball,ballsX[i]-ballsRadius[i],ballsY[i]-ballsRadius[i],2*ballsRadius[i],2*ballsRadius[i]);
  }
}

function drawBackground()
{
    //if(a===1)
    //{
        ctx.drawImage(background,0,0,canvas.width,canvas.height);
    //}
}

function drawGround()
{   ctx.beginPath();
    ctx.rect(0,canvas.height-51,canvas.width,51);
    ctx.fillStyle = "#001522";
    ctx.fill();
    ctx.closePath();
}

// Pozvati ovu funkciju u draw()
function drawPaddle() {
    /*ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();*/
    if(b===1)
    {
        ctx.drawImage(jezRight,paddleX,canvas.height - paddleHeight,paddleWidth,paddleWidth);
    }if(b===-1)
    {
        ctx.drawImage(jezLeft,paddleX,canvas.height - paddleHeight,paddleWidth,paddleWidth);
    }
        
}

function pause(){
    if(document.getElementById("paused").style.display == "block" && startgame===1){
        document.getElementById("paused").style.display = "none";
        document.getElementById("play").src = "images/buttons/pause.png";
        paused=0;
        draw();
        }else{
        pause2();
        }
}

function mute(){
    if(music===1){
    audio.pause();
    music=0;
    document.getElementById("sound").src = "images/buttons/muted.png";
    }else if(music===0){
    audio.play();   
    music=1;    
    document.getElementById("sound").src = "images/buttons/mute.png";    
    }
}

setInterval(function(){ if(paused===0){timer--; }}, 1000);

function drawTimer(){
    ctx.fillStyle = "white";
    ctx.fillText("Time: " + timer + "    Level: " + level, 10, 20);
    
    if(timer<=0){
        alert("GAME OVER");
        location.reload();
    }
    
}

function win(){
    if(level===1){
    leftPressed = false;
    rightPressed = false;

    spacePressed = false;

    ballsX=[canvas.width / 6-150,canvas.width / 3,canvas.width / 2+150];
    ballsY=[canvas.height/7,canvas.height/5,canvas.height/3];
    ballsRadius=[50,40,30];
    balls = 3;
    dx = [150,150,150];
    dy = [0,0,0];
    timer=100;
    level++;
    paddleX = (canvas.width - paddleWidth) / 2;
    }else{
        alert("you win!");
        location.reload();
    }
}

function draw(animationTime) {
    let deltaTime = (Date.now() - (animationTime || Date.now())) / 1000;
    let lastAnimationTime = Date.now();
    
    if(paused===0){
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    drawTimer();
    drawPaddle();
    drawBall();
    drawGround();
    
    
  
    for(let i = 0; i<balls; i++){
    if(ballsX[i] > canvas.width - ballsRadius[i]) {
        dx[i] = -Math.abs(dx[i]);
    }else if(ballsX[i] < ballsRadius[i]){
        dx[i] = Math.abs(dx[i]);
    }

    if(ballsY[i]+50 > canvas.height - ballsRadius[i]) {
        dy[i] = -Math.abs(dy[i]);
    }else if(ballsY[i] < ballsRadius[i]){
        dy[i] = Math.abs(dy[i]); 
    }
    // dio kojim se provjerava da li je loptica udarila paddle
    else if(ballsY[i] + ballsRadius[i] -22> canvas.height - paddleHeight + dy[i]/20 * deltaTime) {
        if (ballsX[i] > paddleX-5 && ballsX[i] < paddleX-5 + paddleWidth) {
            alert("GAME OVER");
            location.reload();
            //dy[i] = -dy[i];
        }     
    }
    
    
    dy[i] = dy[i] + 2*Math.sqrt(Math.abs(2*g*(canvas.height-ballsY[i])));
        
    ballsX[i] += (dx[i] * deltaTime);
    ballsY[i] += (dy[i]/20 * deltaTime);
           
    }

    // Ako je kliknuo desnu strelicu
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
        b=1;
    }
    // Ako je kliknuo lijevu strelicu
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
        b=-1;
    }
        if(spacePressed === true){
        
 bulletY+=10;
        ctx.beginPath();
        ctx.rect(bulletX, canvas.height - paddleHeight - bulletY, 1, canvas.height);
        ctx.strokeStyle = "yellow";
        ctx.stroke();
        ctx.closePath();
        
    for(let i = 0; i<balls; i++){
        if(Math.abs(bulletX-ballsX[i])<ballsRadius[i]-Math.abs(dx[i]*deltaTime)){
            if(ballsY[i]-ballsRadius[i]>canvas.height - paddleHeight - bulletY){
            //alert("you win");
                if(ballsRadius[i]>8){
                ballsY.push(ballsY[i]);
                ballsX.push(ballsX[i]-ballsRadius[i]/2);
                dx.push(-150);
                dy.push(dy[i]);
                ballsY.push(ballsY[i]);
                ballsX.push(ballsX[i]+ballsRadius[i]/2);
                dx.push(150);
                dy.push(dy[i]);
                ballsRadius.push(ballsRadius[i]/2);
                ballsRadius.push(ballsRadius[i]/2);
                balls+=2;
                }else{
                    if(balls===1){
            win();
            
                    }
                }
                ballsY.splice(i,1);
                ballsX.splice(i,1);
                dy.splice(i,1);
                dx.splice(i,1);
                ballsRadius.splice(i,1);
                balls--;
                spacePressed=false;
                bulletY=0;
                break;
            }else{
                if(Math.sqrt(Math.pow(bulletX - ballsX[i], 2)+Math.pow(canvas.height - paddleHeight - bulletY - ballsY[i], 2))<ballsRadius[i]-5){
                   //alert("you win");
               if(ballsRadius[i]>8){
                ballsY.push(ballsY[i]);
                ballsX.push(ballsX[i]-ballsRadius[i]/2);
                dx.push(-150);
                dy.push(dy[i]);
                ballsY.push(ballsY[i]);
                ballsX.push(ballsX[i]+ballsRadius[i]/2);
                dx.push(150);
                dy.push(dy[i]);
                ballsRadius.push(ballsRadius[i]/2);
                ballsRadius.push(ballsRadius[i]/2);
                balls+=2;
                }else{
                    if(balls===1){
            win();
                    }
                }
                ballsY.splice(i,1);
                ballsX.splice(i,1);
                dy.splice(i,1);
                dx.splice(i,1);
                ballsRadius.splice(i,1);
                balls--;
                spacePressed=false;
                bulletY=0;
                break;
                   }
            }
        }
    }   
    
        //if(spacePressed === true){
        
        if(bulletY>canvas.height-paddleHeight){
           spacePressed=false;
            bulletY = 0;
           }
       }

            drawGround();
    requestAnimationFrame(() => draw(lastAnimationTime))
}
}
// Two event listeners for keydown and keyup events. We want to run some code
// to handle the paddle movement when the buttons are pressed.
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// Two functions handling the keydown and keyup events  the code that 
// will be run when the buttons are pressed.


function keyDownHandler(e) {
    
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
    if(e.key === ' ' || e.key === 'Spacebar'){           
        if(spacePressed===false){
            spacePressed=true;
            bulletX = paddleX + paddleWidth/2;
        }
             }
    
    if(e.key == "P" || e.key == "KeyP" || e.key == "p") {
        pause();
    }
    
    if(e.key == "M" || e.key == "KeyM" || e.key == "m") {
        mute();
    }
    
}
function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }

}

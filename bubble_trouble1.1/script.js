let canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext("2d");
ctx.font = "14px Arial";

let ballRadius = 30;
let x = canvas.width / 2+300;
let y = canvas.height - 800;

let timer = 100;

// U ovom dijelu kreiramo paddle !
var paddleHeight = 100;
var paddleWidth = 80;
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




function drawBall() {
  for(let i = 0; i<balls; i++){  
    ctx.beginPath();
    ctx.arc(ballsX[i], ballsY[i], ballsRadius[i], 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
  }
}

// Pozvati ovu funkciju u draw()
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
        
}

setInterval(function(){ timer--; }, 1000);

function drawTimer(){
    ctx.fillStyle = "black";
    ctx.fillText(timer, 10, 20);
    
    if(timer<=0){
        alert("GAME OVER");
        location.reload();
    }
    
}

function draw(animationTime) {
    let deltaTime = (Date.now() - (animationTime || Date.now())) / 1000;
    let lastAnimationTime = Date.now();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawTimer();
  
    for(let i = 0; i<balls; i++){
    if(ballsX[i] > canvas.width - ballsRadius[i]) {
        dx[i] = -Math.abs(dx[i]);
    }else if(ballsX[i] < ballsRadius[i]){
        dx[i] = Math.abs(dx[i]);
    }

    if(ballsY[i]  > canvas.height - ballsRadius[i]) {
        dy[i] = -Math.abs(dy[i]);
    }else if(ballsY[i] < ballsRadius[i]){
        dy[i] = Math.abs(dy[i]); 
    }
    // dio kojim se provjerava da li je loptica udarila paddle
    else if(ballsY[i] + ballsRadius[i]  > canvas.height - paddleHeight) {
        if (ballsX[i] > paddleX && ballsX[i] < paddleX + paddleWidth) {
            alert("GAME OVER");
            location.reload();
            dy[i] = -dy[i];
        }     
    }
    
    
    dy[i] = dy[i] + Math.sqrt(Math.abs(2*g*(canvas.height-ballsY[i])));
        
    ballsX[i] += (dx[i] * deltaTime);
    ballsY[i] += (dy[i]/20 * deltaTime);
           
    }

    // Ako je kliknuo desnu strelicu
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    // Ako je kliknuo lijevu strelicu
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }
    
    if(spacePressed === true){
        bulletY+=10;
        ctx.fillRect(bulletX, canvas.height - paddleHeight - bulletY, 1, canvas.height);
        
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
            console.log(ballsY.length);
            console.log("you win");
            alert("You win");
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
            console.log(ballsY.length);
            console.log("you win");
            alert("You win");
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
        
        if(bulletY>canvas.height-paddleHeight){
           spacePressed=false;
            bulletY = 0;
           }
       }

    requestAnimationFrame(() => draw(lastAnimationTime))
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
}
function keyUpHandler(e) {
    if(e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
    }

}
draw();
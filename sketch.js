var bananas,obstacles;
var monkey,runningImage,size;
var gameState;
var survivalTimeTotal;
var survivalTime;
var survivalTimeText;
var ground;
var speed;
var score;
var jungle,jungleImage;
var bananaImage,stoneImage;

function preload(){
  runningImage = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  jungleImage = loadImage("jungle.jpg");
  bananaImage = loadImage("banana.png");
  stoneImage = loadImage("stone.png");
}  

function setup(){
  createCanvas(600,200);
  score = 0;
  speed = -4;
  survivalTime = 0;
  survivalTimeTotal = 0;
  gameState = "PLAY";
  obstacles = new Group();
  bananas = new Group();
  jungle = createSprite(600,-80);
  jungle.addImage("jungleMoving",jungleImage);
  jungle.scale = 1.5;
  ground = createSprite(300,190,600,10);
  ground.visible = false;
  monkey = createSprite(25,180);
  monkey.addAnimation("running",runningImage);
  monkey.scale = 0.07;
  }

function draw() {
  background(255);
  speed -= 0.003;
  monkey.velocityY += 0.8;
  jungle.velocityX = speed;
  bananas.setVelocityXEach(speed);
  obstacles.setVelocityXEach(speed);
  if (jungle.x <0){
    jungle.x = jungle.width/2;
  }
  
  if (gameState === "PLAY"){
    survivalTime = frameCount/getFrameRate();
    survivalTimeText = ceil(survivalTime - survivalTimeTotal);
    createBananas();
    createObstacles();
    
    switch(score){
      case 10: monkey.scale = 0.08;
        break;
        case 20: monkey.scale = 0.09;
        break;
        case 30: monkey.scale = 0.1;
        break;
      case 40: monkey.scale = 0.11;
        break;
        default: break;
    }    
    
    if (keyDown("space") && monkey.collide(ground)){
      monkey.velocityY=-13;
    }
    if (monkey.isTouching(bananas)){
      bananas.destroyEach();
      score ++;
    }
    if (monkey.isTouching(obstacles)){
      gameState = "END";
    }
  } else if(gameState === "END"){
    monkey.frameDelay = 0;
    speed = 0;
    bananas.setLifetimeEach(-1);
    obstacles.setLifetimeEach(-1);
    textSize(40);
    fill("red");
    stroke("red");
    text("Game Over",mouseX,mouseY)
    if (keyDown("r")){
      reset();
    }
  }
  
  monkey.collide(ground);
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Survival time: " + survivalTimeText, 200, 50);
  text("Score: " + score, 500, 50);
  if(gameState === "END"){
    textSize(40);
    fill("red");
    stroke("red");
    text("Game Over",mouseX - 110,mouseY);
  }  
}

function createBananas(){
  if (frameCount % 140 === 0){
    var banana = createSprite(600,random(50,170));
    banana.addImage("banana",bananaImage);
    banana.scale = 0.05;
    banana.setLifetime = 100;
    bananas.add(banana);
  }
}

function createObstacles(){
  if (frameCount % 300 === 0){
    var obstacle = createSprite(600,random(160,180));
    obstacle.addImage("stone",stoneImage);
    obstacle.setCollider("circle");
    obstacle.scale = random(0.1,0.17);
    obstacle.lifetime = 120;
    obstacles.add(obstacle);
  }
}

function reset(){
  survivalTimeTotal = frameCount/getFrameRate();
  score = 0;
  survivalTime = 0;
  obstacles.destroyEach();
  bananas.destroyEach();
  ground.x = ground.width/2;
  gameState = "PLAY";
  speed = -4;
  monkey.frameDelay = 4;
  size = 0.07;
}
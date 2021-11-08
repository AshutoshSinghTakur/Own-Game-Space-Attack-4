var space, ship;

var PLAY = 1;
var END  = 0;
var gameState = PLAY;

var distance = 0;
var score = 0;
var count = 20;
var ship

function preload(){
  //Ship stand and changing animation
	spaceI = loadImage("img/space.png");
	shuttleB = loadAnimation("img/spB1.png","img/spB2.png","img/spB3.png");
	shuttleG = loadAnimation("img/spG1.png","img/spG2.png","img/spG3.png");
	shuttleO = loadAnimation("img/spO1.png","img/spO2.png","img/spO3.png");
	shuttleP = loadAnimation("img/spP1.png","img/spP2.png","img/spP3.png");
	shuttleR = loadAnimation("img/spR1.png","img/spR2.png","img/spR3.png")
  //Stone imagess
  stone1 = loadImage("img/stone1.png");
  stone2 = loadImage("img/stone2.png");
  stone3 = loadImage("img/stone3.png");
  //Astronid Animation
  asteroidA = loadAnimation("img/as1.png","img/as2.png","img/as3.png")
  //Alien space Ship
  alienS = loadAnimation("img/f1.png","img/f2.png","img/f3.png",)
  //Bullet Chnging Animaion
  bullet1 = loadImage("img/bullet1.png");
  bullet2 = loadAnimation("img/bullet2.png");
  bullet3 = loadAnimation("img/bullet3.png");
  bullet4 = loadAnimation("img/bullet4.png");
  bullet5 = loadAnimation("img/bullet5.png");
  //restart Image
  restartI = loadAnimation("img/reset.png");
  restartIl = loadAnimation("img/reset2.png")
  //End Image and comment
  end = loadImage("img/gameOver.png");
  commentI = loadImage("img/comment.png");
  // life Image
  lifeH = loadImage("img/life.png");
  //Sound 
  spaceSound = loadSound("spaceS2.mp3");
  sound1 = loadSound("l1.mp3");
  sound2 = loadSound("l2.mp3");
  sound3 = loadSound("l3.mp3");
  sound4 = loadSound("l4.mp3");
  //Score Image
  scoreS1 = loadImage("img/score+10.png");
  scoreS2 = loadImage("img/score+20.png");
}

function setup(){
  createCanvas(windowWidth, windowHeight)

  space = createSprite(windowWidth/2-6800, windowHeight/2, 50,  50);
  space.addImage(spaceI);
  space.scale = 0.5
  //space.velocityX = +4
  
  restart = createSprite(windowWidth/2, windowHeight/2+200, 50, 50);
  restart.addAnimation("one",restartI);
  restart.addAnimation("two", restartIl)
  restart.scale = 0.4;
  restart.visible = false;
  //restart.lifetime = 200;

  gameOver = createSprite(windowWidth/2, windowHeight/2-150, 50, 50);
  gameOver.addImage(end);
  gameOver.scale = 0.5
  gameOver.visible = false;

  comment = createSprite(windowWidth/2, windowHeight/2, 50, 50);
  comment.addImage(commentI);
  comment.scale = 0.5
  comment.visible = false;

  shuttle = createSprite(windowWidth-200, windowHeight/2, 50, 50);
  shuttle.addAnimation("orange", shuttleO);
  shuttle.addAnimation("red", shuttleR);
  shuttle.addAnimation("green", shuttleG);
  shuttle.addAnimation("pink", shuttleP);
  shuttle.addAnimation("black", shuttleB);
  shuttle.debug = false;
  shuttle.setCollider("rectangle", 0,0, 1000,1000)
  shuttle.scale = 0.15

 //score10 = createSprite(windowWidth/2, windowHeight/2, 40, 40);
 //score10.addImage(scoreS1);
 //score10.visible = false;

 //score20 = createSprite(windowWidth/2, windowHeight/2, 40, 40);
 //score20.addImage(scoreS2);
 //score20.visible = false;

 bulletG = new Group();
 obstacle1Group = new Group();
 obstacle2Group = new Group();
 obstacle3Group = new Group();

}

function draw() {
  background("black");
  //ship.collide(topWall);
  //ship.collide(bottomWall);
  shuttle.changeAnimation("orange", shuttleO);

  

  if(gameState === PLAY){
    //spaceSound.play();

  //shuttle moving with mouse
  shuttle.y = World.mouseY;

  distance = distance + Math.round(getFrameRate()/50);

  space.velocityX = +(5 + distance/200);

  if(distance > 1000){
    shuttle.changeAnimation("red", shuttleR);
    bullet.changeAnimation("oran",bullet2);
    //frameCount %20  === 0;
    //sound1.play();
  }

  if(distance > 2000){
    shuttle.changeAnimation("green", shuttleG);
    bullet.changeAnimation("gree",bullet3);
    //frameCount %70 === 0;
    //sound2.play();
  }

  if(distance > 3500){
    shuttle.changeAnimation("pink", shuttleP);
    bullet.changeAnimation("pin",bullet4);
    //frameCount %60 === 0;
    //sound3.play();
  }

  if(distance > 5000){
    shuttle.changeAnimation("black", shuttleB);
    bullet.changeAnimation("blue",bullet5);
    //frameCount %40 === 0;
    //sound4.play();
  }

  //visiblety
  shuttle.visible  = true;
  //restart.visible  = false;
  gameOver.visible = false;
  comment.visible  = false;

  if(space.x > 5000){
    space.x = windowWidth/2
  }

  if(keyWentDown ("SPACE")){
    spwanBullets();
  }

  //if(distance > 1000){
  //  frameCount %50 === 0
  //}

var obstacleS = Math.round(random(1,5))

 if(frameCount %80 === 0){
   if(obstacleS == 1){
     spwanObstacle1();
   }
    else if(obstacleS == 2){
      spwanObstacle2();
    }
     else if(obstacleS == 3){
       spwanObstacle3();
     }else if(obstacleS == 4){
       spwanObstacle4();
     }else {
       spwanObstacle5();
     }
 }

 if(obstacle1Group.isTouching(bulletG)){
   obstacle1Group.destroyEach();
   bulletG.destroyEach();
   score = score +10
   //score10.visible = true;
 } 

 if(obstacle2Group.isTouching(bulletG)){
    obstacle2Group.destroyEach();
    bulletG.destroyEach();
    score = score +20
    //score20.visible = true;
 }

 if(obstacle3Group.isTouching(bulletG)){
   obstacle3Group.destroyEach();
   bulletG.destroyEach();
   score = score +30
 }

 if(obstacle1Group.isTouching(shuttle)||
    obstacle2Group.isTouching(shuttle)||
    obstacle3Group.isTouching(shuttle)){
      gameState = END;
    }
  

    

 //if(frameCount %10 === 0){
 //// spwanBullets();
 //}

}
else if(gameState === END){
  restart.changeAnimation("one", restartI);

  restart.x = windowWidth/2;
  restart.y = windowHeight/2+200;

  space.velocityX = 0;

  shuttle.visible = false;

  comment.visible = true;
  gameOver.visible = true;
  restart.visible = true;

  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  obstacle3Group.destroyEach();
  bulletG.destroyEach();

  if(mousePressedOver(restart)){
    reset();
  }

}

  //spwanObstacle5();
  drawSprites();

  fill("white");
  textSize(20);
  text("Score: " + score, windowWidth/2+350, windowHeight/2-300);

  fill("white");
 textSize(20);
 text("Distance: " + distance, windowWidth/2-350, windowHeight/2-300);
 
}

function reset(){

  restart.velocityY = -30

  gameState = PLAY;

  restart.changeAnimation("two", restartIl)

  obstacle1Group.destroyEach();
  obstacle2Group.destroyEach();
  obstacke3Group.destoryEach();

  distance = 0;
  score = 0;
}

function spwanBullets(){
  bullet = createSprite(windowWidth-200, windowHeight/2, 50, 50);
  bullet.addImage(bullet1);
  bullet.addAnimation("oran",bullet2);
  bullet.addAnimation("gree",bullet3);
  bullet.addAnimation("pin",bullet4);
  bullet.addAnimation("blue",bullet5);
  bullet.y = shuttle.y;
  bullet.velocityX = -15
  bullet.scale = 0.1

  bulletG.add(bullet);
}

function spwanObstacle1(){
  obstacle1 = createSprite(windowWidth/2-700, random(50, 500), 40, 50);
  obstacle1.addImage(stone1);
  obstacle1.velocityX = +(6 + distance/200);
  obstacle1.scale = 0.15;
  //obstacle1.debug = true;
  obstacle1.setCollider("rectangle", 0,0, 400,450)

  obstacle1.lifetime = 320;

  obstacle1Group.add(obstacle1)
}

function spwanObstacle2(){
  obstacle2 = createSprite(windowWidth/2-700, random(50, 500), 40, 50);
  obstacle2.addImage(stone2);
  obstacle2.velocityX = +(6 + distance/200)
  obstacle2.scale = 0.15;
  //obstacle2.debug = true;
  obstacle2.setCollider("rectangle", 0,0, 400,450)

  obstacle2.lifetime = 320;

  obstacle1Group.add(obstacle2);
}

function spwanObstacle3(){
  obstacle3 = createSprite(windowWidth/2-700, random(50, 500), 40, 50);
  obstacle3.addImage(stone3);
  obstacle3.velocityX = +(6 + distance/200)
  obstacle3.scale = 0.15;
  //obstacle3.debug = true;
  obstacle3.setCollider("rectangle", 0,0, 400,450)

  obstacle3.lifetime = 320;

  obstacle1Group.add(obstacle3)
}

function spwanObstacle4(){
  obstacle4 = createSprite(windowWidth/2-700, random(50, 500), 40, 50);
  obstacle4.addAnimation("alien", alienS);
  obstacle4.velocityX = +(8 + distance/200);
  obstacle4.scale = 0.5
  //obstacle4.debug = true;

  obstacle4.lifetime = 320;

  obstacle2Group.add(obstacle4);
}

function spwanObstacle5(){
  obstacle5 = createSprite(windowWidth/2-700, random(50, 500), 40, 40);
  obstacle5.addAnimation("astero", asteroidA);
  obstacle5.scale = 0.3
  obstacle5.velocityX = +(10 + distance/200);
  obstacle5.debug = false;
  obstacle5.setCollider("rectangle", 0,10, 800, 300)

  obstacle5.lifetime = 320;

  obstacle3Group.add(obstacle5);
}
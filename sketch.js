var space, ship;

var PLAY = 1;
var END  = 0;
var gameState = PLAY;

var distance = 0;
var score = 0;
var ship

function preload(){
	spaceI = loadImage("img/space.png");
	shuttleB = loadAnimation("img/spB1.png","img/spB2.png","img/spB3.png");
	shuttleG = loadAnimation("img/spG1.png","img/spG2.png","img/spG3.png");
	shuttleO = loadAnimation("img/spO1.png","img/spO2.png","img/spO3.png");
	shuttleP = loadAnimation("img/spP1.png","img/spP2.png","img/spP3.png");
	shuttleR = loadAnimation("img/spR1.png","img/spR2.png","img/spR3.png")
  stone1 = loadImage("img/stone1.png");
  stone2 = loadImage("img/stone2.png");
  stone3 = loadImage("img/stone3.png");
  alienS = loadAnimation("img/f1.png","img/f2.png","img/f3.png",)
  bullet1 = loadImage("img/bullet1.png");
  bullet2 = loadAnimation("img/bullet2.png");
  bullet3 = loadAnimation("img/bullet3.png");
  bullet4 = loadAnimation("img/bullet4.png");
  bullet5 = loadAnimation("img/bullet5.png");
  restartI = loadAnimation("img/reset.png");
  restartIl = loadAnimation("img/reset2.png")
  end = loadImage("img/gameOver.png");
  commentI = loadImage("img/comment.png");
  lifeH = loadImage("img/life.png");
  spaceSound = loadSound("spaceS2.mp3");
  sound1 = loadSound("l1.mp3");
  sound2 = loadSound("l2.mp3");
  sound3 = loadSound("l3.mp3");
  sound4 = loadSound("l4.mp3");
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

 life1 = createSprite(windowWidth/2, windowHeight/2-300, 40, 50);
 life1.addImage(lifeH);
 life1.scale = 0.1;

 life2 = createSprite(windowWidth/2+50, windowHeight/2-300, 40,50);
 life2.addImage(lifeH);
 life2.scale = 0.1;

 life3 = createSprite(windowWidth/2+100, windowHeight/2-300, 40, 50);
 life3.addImage(lifeH);
 life3.scale = 0.1;

 bulletG = new Group();
 obstacle1G = new Group();
 obstacle2G = new Group();
 obstacle3G = new Group();
 obstacle4G = new Group();

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

  if(distance > 100){
    //if(){
    //  sound1.play();
    //}
    shuttle.changeAnimation("red", shuttleR);
    bullet.changeAnimation("oran",bullet2);
    //frameCount %20  ===0;
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

  if(space.x > 7000){
    space.x = windowWidth/2
  }

  if(keyWentDown ("SPACE")){
    spwanBullets();
  }

  //if(distance > 1000){
  //  frameCount %50 === 0
  //}

 var obstacleS =  Math.round(random(1,4));

 if(frameCount %80 === 0){
   if(obstacleS == 1){
     spwanObstacle1();
   }
    else if(obstacleS == 2){
      spwanObstacle2();
    }
     else if(obstacleS == 3){
       spwanObstacle3();
     }else {
       spwanObstacle4();
     }
 }

 if(obstacle1G.isTouching(bulletG)){
   obstacle1G.destroyEach();
   bulletG.destroyEach();
   score = score +10
   //score10.visible = true;
 } 

 if(obstacle2G.isTouching(bulletG)){
   obstacle2G.destroyEach();
   bulletG.destroyEach();
   score = score +10
   //score10.visible = true;
 }

 if(obstacle3G.isTouching(bulletG)){
   obstacle3G.destroyEach();
   bulletG.destroyEach();
   score = score +10
   //score10.visible = true;
 }

 if(obstacle4G.isTouching(bulletG)){
    obstacle4G.destroyEach();
    bulletG.destroyEach();
    score = score +20
    //score20.visible = true;
 }

 if(obstacle1G.isTouching(shuttle)||
    obstacle2G.isTouching(shuttle)||
    obstacle3G.isTouching(shuttle)){
      //life1.visible = false;
    }

    if(obstacle1G.isTouching(shuttle)||
    obstacle2G.isTouching(shuttle)||
    obstacle3G.isTouching(shuttle)){
      //life2.visible = false;
    }

    if(obstacle1G.isTouching(shuttle)||
    obstacle2G.isTouching(shuttle)||
    obstacle3G.isTouching(shuttle)){
      //life3.visible = false;
    }

 //if(obstacle1G > windowWidth/2||
 //   obstacle2G > windowWidth/2||
 //   obstacle3G > windowWidth/2){
 //  score = score -10;
 //}

 if(obstacle1G.isTouching(shuttle)||
    obstacle2G.isTouching(shuttle)||
    obstacle3G.isTouching(shuttle)||
    obstacle4G.isTouching(shuttle)){
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

  obstacle1G.destroyEach();
  obstacle2G.destroyEach();
  obstacle3G.destroyEach();
  obstacle4G.destroyEach();
  bulletG.destroyEach();

  if(mousePressedOver(restart)){
    reset();
  }

}

  
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

  obstacle1G.destroyEach();
  obstacle2G.destroyEach();
  obstacle3G.destroyEach();
  obstacle4G.destroyEach();

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

  obstacle1G.add(obstacle1)
}

function spwanObstacle2(){
  obstacle2 = createSprite(windowWidth/2-700, random(50, 500), 40, 50);
  obstacle2.addImage(stone2);
  obstacle2.velocityX = +(6 + distance/200)
  obstacle2.scale = 0.15;
  //obstacle2.debug = true;
  obstacle2.setCollider("rectangle", 0,0, 400,450)

  obstacle2.lifetime = 320;

  obstacle2G.add(obstacle2);
}

function spwanObstacle3(){
  obstacle3 = createSprite(windowWidth/2-700, random(50, 500), 40, 50);
  obstacle3.addImage(stone3);
  obstacle3.velocityX = +(6 + distance/200)
  obstacle3.scale = 0.15;
  //obstacle3.debug = true;
  obstacle3.setCollider("rectangle", 0,0, 400,450)

  obstacle3.lifetime = 320;

  obstacle3G.add(obstacle3)
}

function spwanObstacle4(){
  obstacle4 = createSprite(windowWidth/2-700, random(50, 500), 40, 50);
  obstacle4.addAnimation("alien", alienS);
  obstacle4.velocityX = +(10 + distance/200);
  obstacle4.scale = 0.5
  //obstacle4.debug = true;

  obstacle4.lifetime = 320;

  obstacle4G.add(obstacle4);
}
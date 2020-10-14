var running, collided,groundImage,trex,ground,invisibleGround,cloudImage,cloud,CloudsGroup,ObstaclesGroup,obstacle,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,gameOver,restart,gameOverImg,restartImg;
    var count = 0; 
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jump
function preload(){
  running = loadAnimation("trex1.png","trex3.png","trex4.png");  
  collided =loadImage("trex_collided.png");
  groundImage  = loadImage("ground2.png");
  cloudImage = loadImage("cloud.png")
  obstacle1 = loadImage("obstacle1.png")
  obstacle2 = loadImage("obstacle2.png")
  obstacle3 = loadImage("obstacle3.png")
  obstacle4 = loadImage("obstacle4.png")
  obstacle5 = loadImage("obstacle5.png")
  obstacle6 = loadImage("obstacle6.png")
  gameOverImg = loadImage("gameOver.png")
  restartImg = loadImage("restart.png")
  jump = loadSound("jump.mp3")
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50)
  trex.addAnimation ("run",running)
  trex.addAnimation("coll",collided)
  trex.scale = 0.5;
  
  
  ground = createSprite(200,180,600,20)
  ground.addImage("ground",groundImage)
  ground.x = ground.width/2
  ground.velocityX = -(6+3*count/100)
  
  
  invisibleGround = createSprite(300,190,600,5)
  invisibleGround.visible = false
  
  gameOver = createSprite(300,100,1,1)
  gameOver.addImage(gameOverImg)
  gameOver.scale = 0.5
  gameOver.visible = false
  
   
  restart = createSprite(300,140,1,1)
 restart.addImage(restartImg)
  restart.scale = 0.5
  restart.visible = false
  
 // cloud = createSprite(400,320,40,10)
  
  //cloud.velocityX = -2
CloudsGroup = new Group()
  ObstaclesGroup = new Group()
  
}

function draw() {
    //set background to white
  background(180);
  //display score
  text("Score: "+ count, 220,20);
 // console.log(gameState);
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -(6 + 3 * count/100);
    //scoring
    count = Math.round(frameCount/4);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
     //jump when the space key is pressed
    if(keyDown("space") && trex.y >= 159){
      trex.velocityY = -12 ;
      jump.play()
      
    }
  
    //add gravity
    trex.velocityY = trex.velocityY + 0.8;
    
    //spawn the clouds
    spawnClouds();
  
    //spawn obstacles
    spawnObstacles();
    
    //End the game when trex is touching the obstacle
    if(ObstaclesGroup.isTouching(trex)){
      gameState = END;
    // trex.velocityY = -12
     //playSound("jump.mp3")
    }
  }
  
  else if(gameState === END) {
    //set velcity of each game object to 0
    gameOver.visible = true
    restart.visible = true
    ground.velocityX = 0;
    trex.velocityY = 0;
    ObstaclesGroup.setVelocityXEach(0);
    CloudsGroup.setVelocityXEach(0);
    //playSound("die.mp3");
    
    //change the trex animation
    trex.changeAnimation("coll",collided);
    
    //set lifetime of the game objects so that they are never destroyed
    ObstaclesGroup.setLifetimeEach(-1);
    CloudsGroup.setLifetimeEach(-1);
    
    //place gameOver and restart icon on the screen
  
    if(mousePressedOver(restart)){
      reset()
    }
    
    
  }
  
  if (count% 100 === 0 && count > 0) {
    //playSound("checkPoint.mp3")
  }
  
  //console.log(trex.y);
  
  //stop trex from falling down
  trex.collide(invisibleGround);
  
  drawSprites();
  
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    
   cloud.addImage("cloud",cloudImage)
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200  ;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  
    
    //add each cloud to the group
    CloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
     obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -(6 + 3 * count/100);
    
    //generate random obstacles
    
     var rand = Math.round (random(1,6))
     switch (rand) {
  case 1:
    obstacle.addImage(obstacle1);
    break;
  case 2:
    obstacle.addImage(obstacle2);
    break;
    
    case 3:
    obstacle.addImage(obstacle3);
    break;
    case 4:
    obstacle.addImage(obstacle4);
    break;
    case 5:
    obstacle.addImage(obstacle5);
    break;
    case 6:
    obstacle.addImage(obstacle6);
    break;
    
 
  default:break
  
}
    
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    ObstaclesGroup.add(obstacle);
    

  }
}
  
function reset(){
  gameState = PLAY;
  
  gameOver.visible = false;
  restart.visible = false;
  
  ObstaclesGroup.destroyEach();
  CloudsGroup.destroyEach();
  
  trex.changeAnimation("run",running);
  
  count = 0;
  
   ground.velocityX = -(6 + 3 * count/100);
}


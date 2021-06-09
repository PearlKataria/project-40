    var PLAY = 1;
    var END = 0 ;
    var gameState = PLAY;

    var trex,treximage;
    var ground,invisibleground,groundimage;

    var cloudgroup,cloud1,cloud2,cloud3,cloud4,cloud5;
    var obstaclesgroup,obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6,obstacle7,obstacle8,obstacle9;

    var score;
    var gameoverimage,restartimage;

    function preload(){
    treximage=loadImage("trex.jpeg")
    groundimage=loadImage("5361.png")
      cloud1=loadImage("cloud1.jpg")
      cloud2=loadImage("cloud2.jpg")
      cloud3=loadImage("cloud3.jpg")
      cloud4=loadImage("cloud4.jpg")
      cloud5=loadImage("cloud5.jpg")
      cactus1=loadImage("cactus1.png")
      cactus2=loadImage("cactus2.png")
      cactus3=loadImage("cactus3.png")
      

      restartimage=loadImage("restartimage.jpg")
      gameoverimage=loadImage("gameover.jpg")
      jumpSound = loadSound("jump.mp3")
  dieSound = loadSound("die.mp3")
  checkPointSound = loadSound("checkPoint.mp3")
    }
      function setup(){ 
      createCanvas(600,200);

        trex = createSprite(50,163,20,50);
        trex.addImage(treximage)
        trex.scale=0.1;

        ground=createSprite(200,215,400,20);
        ground.addImage(groundimage)
        ground.x=ground.width/2;


        gameover=createSprite(260,70);
        gameover.addImage(gameoverimage)
        gameover.scale=0.6

        restart=createSprite(250,150);
        restart.addImage(restartimage)
        restart.scale=0.15;

        invisibleground=createSprite(200,185,400,10)
        invisibleground.visible=false;

        obstaclesgroup=createGroup();
        cloudgroup=createGroup();
        
         trex.setCollider("rectangle",0,0,trex.width,trex.height);
  trex.debug = true
  score=0;
      }

    function draw(){
      background("white")
      text("Score: "+score,500,50 )
      
      if(gameState === PLAY){
        gameover.visible=false;
        restart.visible=false;
        
        ground.velocityX=-(4 + 3* score/100)
        score=score+Math.round(getFrameRate()/60)
        if(score>0 && score%100 === 0){
       checkPointSound.play() 
    }
        if (ground.x<0){
            ground.x=ground.width/2;}
        if(keyDown("space")&& trex.y>=100){
          trex.velocityY=-12;
        jumpSound.play();}
        
        trex.velocityY=trex.velocityY+0.8
    
      spawnobstacles();
      spawnclouds();
      
      
    if(obstaclesgroup.isTouching(trex)){
        trex.velocityY = -12;
        jumpSound.play();
        gameState = END;
        dieSound.play()
      
    }
  }
      else if (gameState ===END){
        gameover.visible=true;
        restart.visible=true;
        
        ground.velocityX=0;
        trex.velociyY=0;
        
        obstaclesgroup.setLifetimeEach(-1);
        cloudgroup.setLifetimeEach(-1);
        
        obstaclesgroup.setVelocityXEach(0);
        cloudgroup.setVelocityXEach(0);
        
      }
      trex.collide(invisibleground);
  
  if(mousePressedOver(restart)) {
      reset();
    }

  drawSprites();
    }
function reset(){
  gameState=PLAY;
  score=0
  gameover.visible=false;
  restart.visible=false;
  obstaclesgroup.destroyEach();
  cloudgroup.destroyEach();
}

function spawnobstacles(){
  if(frameCount % 60 ===0){
    var obstacle=createSprite(600,156,10,40);
    obstacle.velocityX= -(6+score/100);
    
    var rand=Math.round(random(1,3));
    switch(rand){
      case 1:obstacle.addImage(cactus1);
       break;
        case 2:obstacle.addImage(cactus2);
        break;
        case 3:obstacle.addImage(cactus3);
        break;
        
        default:break;}
    obstacle.scale=0.2;
    obstacle.lifetime=300;
    obstaclesgroup.add(obstacle);
  }
}

function spawnclouds(){
  if(frameCount % 60 === 0){
    var cloud=createSprite(600,120,40,10);
    cloud.y=Math.round(random(80,120))
    var rand1=Math.round(random(1,5))
    switch(rand1){
      case 1:cloud.addImage(cloud1);
        break;
        case 2:cloud.addImage(cloud2);
        break;
        case 3:cloud.addImage(cloud3);
        break;
        case 4:cloud.addImage(cloud4);
        break;
        case 5:cloud.addImage(cloud5);
        break;
        default:break; }
 cloud.scale=0.4;
    cloud.velocityX=-3;
    cloud.lifetime=200;
    cloud.depth=trex.depth;
    trex.depth=trex.depth+1;
    cloudgroup.add(cloud);
    
  }
}

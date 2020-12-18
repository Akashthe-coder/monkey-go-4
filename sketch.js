var bananaImage,obstacleImage,jungleImage;
var monkey1;
var obstacleGroup, foodGroup;
var score;
var invisibleGround,food,obstacle;
var deaths;
var PLAY,END,gameState;

function preload()
{
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("stone.png");
  foodImage = loadImage("banana.png");
  jungleImage = loadImage("jungle.jpg");
  monkey1 = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  monkey2 = loadAnimation("Monkey_01.png");
}

function setup() 
{
  createCanvas(500, 400);
  
  jungle = createSprite(200,200,400,400);
  jungle.addImage(jungleImage);
  jungle.x = jungle.width/2;
  jungle.velocityX = -6;
  
  monkey = createSprite(40,360,10,10);
  monkey.addAnimation("monkey_running",monkey1);
  monkey.addAnimation("monkey_dead",monkey2);
monkey.scale = 0.10;
  
  InvisibleGround = createSprite(200,370,400,5);
  InvisibleGround.visible = false;
  
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  score = 0;
  PLAY = 1;
  END = 0;
  deaths=0;
  gameState = PLAY;
}

function draw() 
{
  background(220);
  monkey.collide(InvisibleGround);
  
  if(jungle.x<0)
  {
    jungle.x = jungle.width/2;
  }
  
  if(gameState == PLAY)
  {
 
  if(keyDown("space") && monkey.y >= 330) {
      monkey.velocityY = -17;
    }
  
    monkey.velocityY = monkey.velocityY + 0.8
  
  //console.log(monkey.y);
  if(frameCount % 80 === 0)
  {
    spawnFood();
  }
  if(frameCount % 300 === 0)
  {
    spawnObstacles();
  }
  
  if(foodGroup.isTouching(monkey))
  {
    score = score + 2;
    foodGroup.destroyEach();
    switch(score)
    {
        case 10: monkey.scale = 0.12;
        break;
        case 20: monkey.scale = 0.14;
        break;
        case 30: monkey.scale = 0.16;
        break;
        case 40: monkey.scale = 0.18;
        break;
        default: break;
    }
  }
  if(obstacleGroup.isTouching(monkey))
  {
    monkey.scale = 0.10;
    obstacleGroup.destroyEach();
    deaths = deaths+1;

    score = score - 5;
  }
    if(monkey===2 && gameState === PLAY)
    {
      gameState = END;
    }
  }
  if(gameState === END)
  {
    monkey.velocityX=0;
 monkey.changeAnimation("monkey_dead",playerAnimation2);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
  }
  drawSprites();
  stroke("white");
  textSize(20);
  fill("white");
  text("SCORE :" + score,400,30);
}

function spawnFood()
{
  var food = createSprite(600,160,10,10);
  food.addImage(foodImage);
  food.y = random(120,200);
  food.velocityX = -(6 + Math.round(score/10));
  food.lifetime = 150;
  foodGroup.add(food);
  food.scale = 0.05;
}

function spawnObstacles()
{
  obstacle = createSprite(600,350,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -(6 + Math.round(score/10));
  obstacle.lifetime = 150;
  obstacle.scale = 0.2;
  obstacleGroup.add(obstacle);
}

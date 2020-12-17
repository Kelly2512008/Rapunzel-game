var rapunzel,rapunzelimg;
var invisibleGround;
var warriorsGroup,lanternsGroup;
var life = 3;
var gameState="start";
var  startButton;
var restartButton;
function preload(){
  rapunzelimg=loadImage("images/rapunzel.png");

}
function setup() {
  createCanvas(displayWidth,displayHeight);
  rapunzel=createSprite(displayWidth/10, displayHeight-50, 50, 50);
  rapunzel.addImage(rapunzelimg);
  rapunzel.scale=0.2;
  invisibleGround=createSprite(displayWidth/2,displayHeight-20,displayWidth,20);
  invisibleGround.visible=false;
  warriorsGroup=new Group();

  lanternsGroup=new Group();
  
  startButton=createSprite(displayWidth/2,displayHeight/2);
  restartButton=createSprite(displayWidth/2,displayHeight/2+30)
  restartButton.visible=false;
}

function draw() {
  background(0,0,0);
  console.log(displayHeight)

  if(gameState==="start" && mousePressedOver(startButton)){
    startButton.visible=false;
    gameState="play";
  
  }  
  if(gameState==="play"){
  if(keyDown("space")&&rapunzel.y>=displayHeight-135){
    rapunzel.velocityY=-10;

  }
  rapunzel.velocityY=rapunzel.velocityY+0.5
  
  spawnWarriors();
  spawnLanterns();
  if(rapunzel.isTouching(warriorsGroup)){
    if(life>0){
      life=life-1;
      gameState="start"
    }
    else if(life===0){
      gameState="end";
    }
  }
}
if(gameState==="end"){
  warriorsGroup.setVelocityXEach(0);
  lanternsGroup.setVelocityXEach(0);
  restartButton.visible=true;
  if(mousePressedOver(restartButton)){
    reset();
  }
}
rapunzel.collide(invisibleGround);
  drawSprites();
  
}
function spawnWarriors(){
  if(frameCount%100===0){
    var warrior=createSprite(displayWidth,displayHeight-50);
    warrior.velocityX=-6
  warriorsGroup.add(warrior)
  }
}
function spawnLanterns(){
  if(frameCount%1000===0){
    var lantern=createSprite(displayWidth,displayHeight-200);
    lantern.velocityX=-6
  lanternsGroup.add(lantern)
  }
}
function reset(){
  gameState="start";
  restartButton.visible=false;
  startButton.visible=true;
}

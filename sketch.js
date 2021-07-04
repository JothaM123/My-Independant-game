var road,rImg , car, cImg, obst, obst2, obst3, obst4, obstG, sand, grass, tree, treeO, horn, gameState, rocks, end, gOver, mouse, mImg, axe, aImg, score, inv, tG, aG, oG, l1, l2, l3, l4, l;


function preload(){
  rImg = loadImage("Road.png");
  cImg = loadImage("car.png");
  horn  = loadSound("horn.wav");
  rocks = loadImage("rocks.png");
  end = loadImage("over.png");
  bar = loadImage("obstacle1.png");
  sand = loadImage("sand.png");
  grass = loadImage("grass.jpg");
  mImg = loadImage("mouse.png");
  tree = loadImage("tree.png");
  aImg = loadImage("axe.png");
  l1 = loadImage("l1.png");
  l2 = loadImage("l2.png");
  l3 = loadImage("l3.png");
  l4 = loadImage("l4.png");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  
  road = createSprite(windowWidth/2, windowHeight/2);
  road.velocityX = -(15+(frameCount/2));
  
  car = createSprite(width/5, height-100);
  car.addImage(cImg);
  car.scale = 0.5;
  car.setCollider("rectangle", 10, 155, 365, 150);
  
  gOver = createSprite(width/2, height/2);
  gOver.addImage(end);
  gOver.visible = false;
  
  obstG  = new Group();
  tG = new Group();
  aG = new Group();
  oG = new Group();
  gameState = "play";
  
  mouse = createSprite(0, 0, 15, 15);

 l = createSprite(width-50, height-370);

}

function draw() {
 
  background(0);
  l.visible = true;
  
  l.addImage(l1);
  road.addImage(rImg);
  road.scale = 0.5;
  
  mouse.addImage(mImg);
  mouse.scale = 0.3;
  
  mouse.x = mouseX;
  mouse.y = mouseY;
  
  var score = 0;
  
  edges = createEdgeSprites();
  
  if(road.x < 0){
    road.x = width/2;
  }
  
  inv = createSprite(width/2, 10, width, 200);
  inv.visible = false;
  
  if(gameState === "play"){

    document.getElementById("lorem").textContent = "Level 1";
    
    if(frameCount > 1555){
      road.addImage(sand);
      road.scale = 5;
      document.getElementById("lorem").textContent = "Level 2";
      l.addImage(l2);
    }

    
    if(frameCount > 2110){
      road.addImage(grass);
      road.scale = 9;
      document.getElementById("lorem").textContent = "Level 3";
      l.addImage(l3);
    }
    
    
    if(frameCount > 2665){
      road.addImage(rImg);
      road.scale = 0.5;
      document.getElementById("lorem").textContent = "Level 4";
      l.addImage(l4);
    }
    
    document.getElementById("label").textContent ="Score: " + frameCount + " Click on the canvas and use 'w' and 's' to move the car" ;
    
  if(keyDown("w")){
   car.y = car.y - 6;
  }
    
  if(keyDown("s")){
    car.y = car.y + 6;
  }
    
  car.collide(edges);
  car.collide(inv);
  
    if(keyDown("space")){
      horn.play();
    }
    
      spawnObst();
  
    if(car.isTouching(obstG) || car.isTouching(tG) || car.isTouching(aG) || car.isTouching(oG)){
       gameState = "end";
       obstG.destroyEach();
       tG.destroyEach();
       aG.destroyEach();
       oG.destroyEach();
       car.visible = false;
       var speech = new SpeechSynthesisUtterance();
       speech.text = "Game Over! Press r to restart. Press s to see the source code.";
       window.speechSynthesis.speak(speech);
       gOver.visible = true;
      alert("PRESS 'R' TO RESTART, PRESS 'S' TO SEE THE SOURCE CODE");
  }
    
   
  
  }
  
  if(gameState === "end"){
    road.velocityX = 0;
    obstG.setVelocityXEach(0);
    obstG.lifetime = -1;
    aG.lifetime = -1;
    oG.lifetime = -1;
    l.visible = false;
    l.addImage(l1);
    World.seconds = 1;
     if(keyDown("r")){
       reset();
       frameCount = 0;
    }
    
     if(keyDown("s")){
        window.location.href = "https://editor.p5js.org/francisrizanth/sketches/tcLE49D-_";
      }
  }
    
   
    
  mouse.depth = car.depth+1;

  drawSprites();
  
}


function spawnObst(){
  
  var rand = Math.round(random(1, 4));
  
  
  if(frameCount%15 === 0){
  
    if(rand === 1){
      obst = createSprite(width, random(height/2, width-150));
      obst.velocityX = -15;
      obst.lifetime = width;
      obst.addImage(rocks);
      obst.scale = 0.2;
      obst.depth = car.depth;
      car.depth = obst.depth+1;
      obstG.add(obst);
  
      
      treeO = createSprite(width, random( height/4-4*3, width/3*2));
      treeO.velocityX = -15;
      treeO.lifetime = width;
      treeO.addImage(tree);
      treeO.depth = car.depth;
      car.depth = treeO.depth+1;
      tG.add(treeO);
      
    
     
    }
  
    if(rand === 2){
      obst2 = createSprite(width, random(height/3, width/3));
      obst2.velocityX = -15;
      obst2.lifetime = width;
      obst2.addImage(rocks);
      obst2.scale = 0.2;
      obst2.depth = car.depth;
      car.depth = obst2.depth+1;
      obstG.add(obst2);
 

    }
  
    if(rand === 3){
      obst3 = createSprite(width, random(height/2, width));
     obst3.velocityX = -15;
     obst3.lifetime = width;
     obst3.addImage(rocks);
     obst3.scale = 0.2;
     obst3.depth = car.depth;
     car.depth = obst3.depth+1;
     obstG.add(obst3);
    }
    
    if(rand === 4){
      obst4 = createSprite(width, random(height/5, width-3));
      obst4.lifetime = width;
      obst4.addImage(bar);
      obst4.scale = 0.2;
      obst4.velocityX = -15;
      obst4.depth = car.depth;
      car.depth = obst4.depth+1;
      oG.add(obst4);
      
      axe = createSprite(width, random(height/2+5, width/2+20));
      axe.liftime = width;
      axe.addImage(aImg);
      axe.velocityX = -15;
      axe.depth = car.depth;
      car.depth = axe.depth + 1;
      axe.scale = 0.5;
      axe.setCollider("rectangle", 0, 0, 150, 150);
      aG.add(axe);      
    }
    
      tG.setColliderEach("rectangle", 0, 0, 50, 20);
      obstG.setColliderEach("rectangle", 0, 0, 250, 200);
      oG.setColliderEach("circle", 0, 0, 50);
 
}

}

function reset(){
  gOver.visible = false;
  gameState = "play";
  car.visible = true;
  road.velocityX = -5;
}
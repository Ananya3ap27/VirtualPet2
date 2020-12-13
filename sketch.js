var dog,dogImg,happyDog, database;
var foodS=20,foodStock;
var fedTime,lastFed;
var feed,add;
var foodObj;

function preload(){
dogImg=loadImage("Dog.png");
happyDog=loadImage("happydog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

  dog=createSprite(700,170,150,150);
  dog.addImage(dogImg);
  dog.scale=0.15;

  feed=createButton("Feed");
  feed.position(950,65);
  feed.mousePressed(feedDog);

  add=createButton("Buy");
  add.position(900,65);
  add.mousePressed(addFoods);

  database.ref('/').update({
    Food:20,
    FeedTime:0

  })

}

function draw() {
  background(rgb(46,139,117));
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  fill(255,255,254);
  textSize(15);
  if(lastFed>=12){
    text("Last Feed : "+ lastFed%12 + " PM", 350,30);
   }else if(lastFed==0){
     text("Last Feed : 12 AM",350,30);
   }else{
     text("Last Feed : "+ lastFed + " AM", 350,30);
   }

  drawSprites();
  text("Milk - "+foodS,20,20);
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}
function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS=foodS+1;
  database.ref('/').update({
    Food:foodS
  })
  dog.addImage(dogImg);
}

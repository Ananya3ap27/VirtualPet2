//Create variables here
var  dog, dogImg, dogHImg;
var database;
var foodS = 20, foodStock;
var milkImg , milk=[],i;
function preload()
{
  //load images here
  dogImg=loadImage("Dog.png");
  dogHImg=loadImage("happydog.png");
  milkImg=loadImage("Milk.png");
}

function setup() {
	database=firebase.database();
  canvas=createCanvas(1000,800);

  dog=createSprite(800,400,10,10);
  dog.addImage(dogImg);
  dog.scale=0.2;

  getCount();
  update(20);
}


function draw() { 
  background(rgb(200,170,140));

  for(i=0;i>=foodS;i++){
    milk[i]=new Food((20*i)+20,200);
    milk[i].display();
  }
  addMilk();
}

function addMilk(){
  if(keyWentDown(UP_ARROW)){
    milk.push(new Food(milk[milk.length]*100,200));
  }
}


function getCount(){
  var foodStock=database.ref('food');
  foodStock.on("value",function(data){
      foodS=data.val();
  });
}
function update(count){
  database.ref('/').update({
      food:count
  })
}



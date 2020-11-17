var dog;
var happyDog;
var foodS;
var foodStock;
var button1,button2;
var fedTime,lastFed;
var foodObj;

function preload()
  {
  loadImage("image/dogImg.png");
  loadImage("image/dogImg1.png");
}

function setup() {

  createCanvas(1000, 500);
  
  dog = createSprite(250,250);
  food = createSprite(100,200);
  database=firebase.database();
    game=new Game();
    game.getState();
    game.start();
    feed=createButton("Feed the Dog");
    feed.position(700,95);
    feed.mousePressed(feedDog);

    addFood=createButton("Feed the Dog");
    addFood.position(800,95);
    addFood.mousePressed(addFood);
}


function draw() {  

  drawSprites();
  display();

  fill(255,255,254);
  textSize(15);
  if (lastFed>=12){
    text("Last Feed : "+lastFed%12+"PM",350,30);
  }else if (lastFeed===0){
    text("Last Feed : 12 AM",350,30);
  }else{
    text("Last Feed"+lastFed+" AM",350,30);
  }
  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })
}
function feedDog()
{
    dog.addImage(happyDog);
    foodObj.updateFoodStock(foodObj.getFoodStock()-1);
    database.ref('/').update({
      food:foodObj.getFoodStock(),
      feedTime:hour()
    })
}
function addFoods(){
    foodS++;
    database.ref('/').update({
      food:foodS
    })
}
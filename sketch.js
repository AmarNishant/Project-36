var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;

//create feed and lastFed variable here
var feed, lastFed;
var feedDogButton;

var time = 0;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
getTime();
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feedDogButton = createButton("Feed The Dog");
  feedDogButton.position(700, 95);
  feedDogButton.mousePressed(feedDog);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  var lastFedRef = database.ref('lastFed');
  lastFedRef.on("value", function(data){
    lastFed = data.val();
  })
 
  //write code to display text lastFed time here

  noStroke();
  textSize(35);
  fill('black');
  if(lastFed === 0){
    text("Time : 12 PM", 100, 50);
}
if(lastFed === 1){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 2){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 3){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 4){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 5){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 6){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 7){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 8){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 9){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 10){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 11){
    text("Time : " + lastFed + " PM", 100, 50);
}
if(lastFed === 12){
    text("Time : " + lastFed + " AM", 100, 50);
}
if(lastFed === -1){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -2){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -3){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -4){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -5){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -6){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -7){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -8){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -9){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -10){
    text("Time : " + -lastFed + " AM", 100, 50);
}
if(lastFed === -11){
    text("Time : " + -lastFed + " AM", 100, 50);
}

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_val = foodObj.getFoodStock();
  if(food_stock_val <= 0) {
    foodObj.updateFoodStock(food_stock_val*0)
  }
  else {
    foodObj.updateFoodStock(food_stock_val - 1);
  }

  database.ref('/').update({
    Food : food_stock_val
  })
  
  database.ref('/').update({
    lastFed : time
  })
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

async function getTime(){
  var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
  var responseJSON = await response.json();

  var datetime = responseJSON.datetime;
  var hour = datetime.slice(11,13);
  // console.log(datetime);
  time = hour - 12;
}


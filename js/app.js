'use strict';

//--------------------GLOBAL VARIABLES/IMPORTS
let voteCount = 10;
let allProducts = [];

//--------------------DOM REF
let imgContainer = document.getElementById('img-container');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');

let showResultsBtn = document.getElementById('resultsButton');
let resultsList = document.getElementById ('resultsList');
//--------------------CONSTRUCTORS
function Products(name, fileExtension = 'jpeg'){
  this.name = name;
  this.views = 0;
  this.votes = 0;
  this.photo = `img/${name}.${fileExtension}`;

  allProducts.push(this);
}

new Products('sweep', 'png');
new Products('bag');
new Products('banana');
new Products('bathroom');
new Products('boots');
new Products('breakfast');
new Products('bubblegum');
new Products('chair');
new Products('cthulhu');
new Products('dog-duck');
new Products('dragon');
new Products('pen');
new Products('pet-sweep');
new Products('scissors');
new Products('shark');
new Products('tauntaun');
new Products('unicorn');
new Products('water-can');
new Products('wine-glass');

//--------------------HELPR FUNCTIONS
//got from w3resources--[math.floor(math.random()*allProducts.length)]
function getRandomIndex(){
  return Math.floor(Math.random()*allProducts.length);
}

function renderImgs(){

  let productOneIndex = getRandomIndex();
  let productTwoIndex= getRandomIndex();
  let productThreeIndex= getRandomIndex();

  //validation to make sure nums are unique; try splice

  while(productOneIndex === productTwoIndex){
    productTwoIndex = getRandomIndex();


  }

  while(productTwoIndex === productThreeIndex || productOneIndex === productThreeIndex){
    productThreeIndex = getRandomIndex();
  }

  img1.src = allProducts[productOneIndex].photo;
  img1.alt = allProducts[productOneIndex].name;
  allProducts[productOneIndex].views++;

  img2.src = allProducts[productTwoIndex].photo;
  img2.alt = allProducts[productTwoIndex].name;
  allProducts[productTwoIndex].views++;

  img3.src = allProducts[productThreeIndex].photo;
  img3.alt = allProducts[productThreeIndex].name;
  allProducts[productThreeIndex].views++;
}

renderImgs();

//--------------------CONSTRUCTOR METHODS
//--------------------FUNCTIONS
//--------------------EVENT LISTENERS
imgContainer.addEventListener('click', handleClick);
showResultsBtn.addEventListener('click', handleShowResults);
//--------------------EVENT HANDLERS
function handleClick(event){
  voteCount--;
  let imgClicked = event.target.alt;

  for(let i = 0; i<allProducts.length; i++){
    if(imgClicked === allProducts[i].name){
      allProducts[i].votes++;
    }
  }

  renderImgs();

  if(voteCount === 0){
    imgContainer.removeEventListener('click', handleClick);
    showResultsBtn.hidden= false;
    showResultsBtn.addEventListener('click', handleShowResults);
  }

  console.log(allProducts);
}

function handleShowResults(){

  for(let i =0; i< allProducts.length; i++){
    let liElem = document.createElement('li');
    liElem.textContent = `${allProducts[i].name} was seen ${allProducts[i].views} times and chosen ${allProducts[i].votes} times.`;
    resultsList.appendChild(liElem);
  }

  showResultsBtn.removeEventListener('click', handleShowResults);
  showResultsBtn.hidden=true;

}

//--------------------FUNCTION CALLS

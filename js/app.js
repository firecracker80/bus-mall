'use strict';

//--------------------GLOBAL VARIABLES/IMPORTS
let voteCount = 5;
let allProducts = [];

//--------------------DOM REF
let imgContainer = document.getElementById('img-container');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');

let ctx = document.getElementById('myChart').getContext('2d');

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


// LS part 2 retrieve
//parse data

//easy way 

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

//hard way ------running back through constructor

// if(retreivedProducts){
//   for(let i = 0; i < parsedProducts.length; i++){
//     if(parsedProducts[i].name === 'sweep')
//     let reconstructedSweep = new Products('sweep', 'png');
//     reconstructedSweep.views = parsedProducts[i].views;
//     reconstructedSweep.votes = parsedProducts[i].votes;
//   } else{

//   };
// } else{
//   new Products('sweep', 'png');
//   new Products('bag');
//   new Products('banana');
//   new Products('bathroom');
//   new Products('boots');
//   new Products('breakfast');
//   new Products('bubblegum');
//   new Products('chair');
//   new Products('cthulhu');
//   new Products('dog-duck');
//   new Products('dragon');
//   new Products('pen');
//   new Products('pet-sweep');
//   new Products('scissors');
//   new Products('shark');
//   new Products('tauntaun');
//   new Products('unicorn');
//   new Products('water-can');
//   new Products('wine-glass');
// }




//--------------------HELPR FUNCTIONS
//got from w3resources--[math.floor(math.random()*allProducts.length)]
function getRandomIndex(){
  return Math.floor(Math.random()*allProducts.length);
}

let productIndex = [];

function renderImgs(){

  while(productIndex.length < 6){
    let randomIndex = getRandomIndex();
    if(!productIndex.includes(randomIndex)){
      productIndex.push(randomIndex);
    }
  }

  let productOneIndex = productIndex.shift();
  let productTwoIndex= productIndex.shift();
  let productThreeIndex= productIndex.shift();

  // //validation to make sure nums are unique; try splice

  // while(productOneIndex === productTwoIndex){
  //   productTwoIndex = getRandomIndex();
  // }

  // while(productTwoIndex === productThreeIndex || productOneIndex === productThreeIndex){
  //   productThreeIndex = getRandomIndex();
  // }

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

function renderChart(){

  let productsType = [];
  let productVotes = [];
  let productViews = [];

  for (let i=0; i < allProducts.length; i++){
    productsType.push(allProducts[i].name);
    productVotes.push(allProducts[i].votes);
    productViews.push(allProducts[i].views);
  }
  let myProductChart = {
    type: 'bar',
    data: {
      labels: productsType,
      datasets: [{
        label: '# of Votes',
        data: productVotes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      },
      {
        label: '# of Views',
        data: productViews,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 4
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  };

  const myChart = new Chart(ctx, myProductChart);
}
//--------------------EVENT HANDLERS
function handleClick(event){
  voteCount--;
  let imgClicked = event.target.alt;

  for(let i = 0; i < allProducts.length; i++){
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

  renderChart();

  // for(let i =0; i< allProducts.length; i++){
  //   let liElem = document.createElement('li');
  //   liElem.textContent = `${allProducts[i].name} was seen ${allProducts[i].views} times and chosen ${allProducts[i].votes} times.`;
  //   resultsList.appendChild(liElem);
  // }

  showResultsBtn.removeEventListener('click', handleShowResults);
  showResultsBtn.hidden=true;

}

//--------------------FUNCTION CALLS

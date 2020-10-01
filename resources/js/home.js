import utils from './utils.js';

var fromMenuObj
var indexContentObj
var paraHeight


// Home page content loading
const para = document.querySelector('#blog-paragraph')
const imageArea = document.querySelector('.image-area')

utils.jsonCaller('get','resources/json/homepage.json',function(contentObj){
  para.textContent = contentObj.content

  const image = document.createElement('img')
  image.src = contentObj.image
  image.className += 'content-img';
  imageArea.appendChild(image)

  paraResize()
})


const readMoreBtn = document.querySelector('.read-more')
const readLessBtn = document.querySelector('.read-less')

// Main resize function
function paraResize(){
  paraHeight = para.offsetHeight
  if (paraHeight > 200) {
    readLess();
  } else {
    para.style.height = 'auto'
    readMoreBtn.style.display = 'none'
    readLessBtn.style.display = 'none'
  }
}

// Read less__
readLessBtn.addEventListener('click',function(){
  para.style.height = '200px'
  readMoreBtn.style.display = 'block'
  readLessBtn.style.display = 'none'
})

function readLess(){
  para.style.height = '200px'
  readMoreBtn.style.display = 'block'
  readLessBtn.style.display = 'none'
}


// Read more__
readMoreBtn.addEventListener('click',function(){
  para.style.height = 'auto'
  readMoreBtn.style.display = 'none'
  readLessBtn.style.display = 'block'
})


  














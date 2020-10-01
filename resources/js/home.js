import utils from "./utils.js";

var fromMenuObj
var indexContentObj
var paraHeight

// Welcome text



// Heading of page from menu elements
// const header = document.querySelector("#page-heading");

// utils.jsonCaller('get','resources/json/menu.json',function(object){
//   header.textContent = object[0].label
// })

// const headRequest = new XMLHttpRequest()

// headRequest.onload = function(){
//   if(this.status === 200){
//     try{
//       fromMenuObj = JSON.parse(this.responseText)
//       // header.textContent = fromMenuObj[0].label
//     }
//     catch{
//       console.warn("JSON not parsed")
//     }
//   }
//   else{
//     console.warn("File not found")
//   }
// }

// headRequest.open("get", "resources/json/menu.json")
// headRequest.send()


// Loading Contents for Homepage
const contentRequest = new XMLHttpRequest()
const para = document.querySelector("#blog-paragraph")
const imageArea = document.querySelector(".image-area")

contentRequest.onload = function () {
  if (this.status === 200) {
    try {
      indexContentObj = JSON.parse(this.responseText)
      para.textContent = indexContentObj.Content

      const image = document.createElement('img')
      image.src = indexContentObj.image
      image.className += "content-img";
      imageArea.appendChild(image)

      paraResize()
      
    } catch {
      console.warn("JSON not parsed")
    }
  } else {
    console.warn("File not found")
  }
}

contentRequest.open("get", "resources/json/homepage.json")
contentRequest.send()



// Read more functionality based on paragraph height

const readMoreBtn = document.querySelector(".read-more")
const readLessBtn = document.querySelector(".read-less")

// Main resize function
function paraResize(){
  paraHeight = para.offsetHeight
  if (paraHeight > 200) {
    readLess();
  } else {
    para.style.height = "auto"
    readMoreBtn.style.display = "none"
    readLessBtn.style.display = "none"
  }
}

// Read less
function readLess(){
  para.style.height = "200px"
  readMoreBtn.style.display = "block"
  readLessBtn.style.display = "none"
}

// Read more
function readMore(){
  para.style.height = "auto"
  readMoreBtn.style.display = "none"
  readLessBtn.style.display = "block"
}

  














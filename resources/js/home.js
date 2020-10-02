import utils from './utils.js';

var paraHeight

// Home page content loading
const para = document.querySelector('#blog-paragraph')
const imageArea = document.querySelector('.image-area')

utils.jsonCaller('get','resources/json/homepage.json',function(object){
  para.textContent = object.content
  let headerObj = object.table
  
  const image = document.createElement('img')
  image.src = object.image
  image.className += 'content-img';
  imageArea.appendChild(image)

  paraResize()
  loadTable(headerObj)
})


// Table content loading
function loadTable(headerObj){
  const tableHeader = document.querySelector('#table-head')
  const tableBody = document.querySelector('#table-body')
  loadTableHead()

  // Load table body
  utils.jsonCaller('get', 'resources/json/vacancies.json', function (contentObj) {

    for(let contentValue of contentObj){
      let rowElement = document.createElement('tr')
      for(let headerValue of headerObj){
        let columnElement = document.createElement('td') 
        let key = headerValue.id
        let cellValue = contentValue[key] 
        if(headerValue.type == 'link'){
          let link = document.createElement('a')
          link.href = cellValue
          link.textContent = "Link"
          columnElement.appendChild(link)
        }
        else if(headerValue.type == 'button'){
          if(contentValue.status == 'open'){
            let btn = document.createElement("button");
            btn.textContent = "Apply Now";
            columnElement.appendChild(btn);
          }
          else{
            columnElement.textContent = " - "
          }
          
        }
        else{
          columnElement.textContent = cellValue;
        }
        
        rowElement.appendChild(columnElement)
      }
      tableBody.appendChild(rowElement)
    }
  })

  // Load table headers
  function loadTableHead() {
    let headRow = document.createElement('tr')
    for(let headValue of headerObj){
      let headElement = document.createElement('th')
      headElement.textContent = headValue.tittle
      headElement.setAttribute("data-type",headValue.type)
      headElement.setAttribute("data-sortable", headValue.sortable)
      headElement.id = headValue.id
      headRow.appendChild(headElement)
    }
    tableHeader.appendChild(headRow)
  }

}


// Table sorting
const tableHeader = document.querySelector("#table-head")
tableHeader.addEventListener('click',function(e){
  let header = e.target
  if (header.dataset["sortable"] == 'true'){
    console.log("sortable")
    console.log(header.dataset['type'])
  }
  else{
    console.log("Not sortable")
  }
})





// Main resize function
const readMoreBtn = document.querySelector('.read-more')
const readLessBtn = document.querySelector('.read-less')


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


  














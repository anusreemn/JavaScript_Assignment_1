import utils from './utils.js';

var paraHeight
let headerObj, contentObj

/*--------------- Home page content loading section ---------------*/
const para = document.querySelector('#blog-paragraph')
const imageArea = document.querySelector('.image-area')

utils.jsonCaller('get','resources/json/homepage.json',function(object){
  para.textContent = object.content
  // let headerObj = object.table
  headerObj = object.table;
  
  const image = document.createElement('img')
  image.src = object.image
  image.className += 'content-img';
  imageArea.appendChild(image)

  paraResize()
  loadTable(headerObj)
})



/*--------------- Table loading section ---------------*/
function loadTable(headerObj){
  // Load table body
  utils.jsonCaller('get', 'resources/json/vacancies.json', function (object) {
    contentObj = object
    tableLoader(headerObj,contentObj)
  })
}

// Actual function to load table (Takes in two objects)
function tableLoader(headerObj, contentObj) {
  
  const tableHeader = document.querySelector("#table-head")   
  const tableBody = document.querySelector("#table-body")
  loadTableHead(tableHeader,headerObj);
 
  for (let contentValue of contentObj) {
    
    let rowElement = document.createElement("tr");
    for (let headerValue of headerObj) {
      let columnElement = document.createElement("td");
      let key = headerValue.id;
      let cellValue = contentValue[key];
      if (headerValue.type == "link") {
        let link = document.createElement("a");
        link.href = cellValue;
        link.textContent = "Link";
        columnElement.appendChild(link);
      } else if (headerValue.type == "button") {
        if (contentValue.status == "open") {
          let btn = document.createElement("button");
          btn.textContent = "Apply Now";
          columnElement.appendChild(btn);
        } else {
          columnElement.textContent = " - ";
        }
      } else {
        columnElement.textContent = cellValue;
        columnElement.className = key
      }
      rowElement.appendChild(columnElement);
    }
    tableBody.appendChild(rowElement);
  }
}


// Load table headers
function loadTableHead(tableHeader, headerObj) {
  let headRow = document.createElement("tr");
  for (let headValue of headerObj) {
    let headElement = document.createElement("th");
    headElement.textContent = headValue.tittle;
    headElement.setAttribute("data-type", headValue.type);
    headElement.setAttribute("data-sortable", headValue.sortable);
    headElement.id = headValue.id;
    headRow.appendChild(headElement);
  }
  tableHeader.appendChild(headRow);
}

// Table sorting Area  -------------//
const tableHeader = document.querySelector("#table-head")
tableHeader.addEventListener('click',function(e){
  
  let header = e.target
  if (header.dataset["sortable"] == 'true' && header.dataset['type'] == 'number'){ 
    let element = document.querySelectorAll(`.${header.id}`)
    let valueList = []
    
    for (let each of element){
      valueList.push(parseInt(each.textContent))
    }
    valueList.sort((a, b) => a - b)
    newContentCreator(valueList, header.id)
  }
  else if(header.dataset["sortable"] == 'true' && header.dataset['type'] == 'string'){
    let element = document.querySelectorAll(`.${header.id}`)
    let valueList = []
    
    for(let each of element){
      valueList.push(each.textContent)
    }
    valueList.sort()
    newContentCreator(valueList, header.id)
  }
  else if(header.dataset["sortable"] == 'true' && header.dataset['type'] == 'date'){
    let element = document.querySelectorAll(`.${header.id}`)
    let valueList = []

    for (let each of element) {
      valueList.push(each.textContent)
    }

    valueList.sort()
    console.log(valueList)
    newContentCreator(valueList, header.id);

  }
  else{
    console.log("Not sortable")
  }
})

function newContentCreator(valueList,key){
  let tableBody = document.querySelector('#table-body')
  let tableHeader = document.querySelector('#table-head')
  let newContentObj = []

  for(let values of valueList){
    for(let content of contentObj){
      if(values == content[key]){
        newContentObj.push(content)
      }
    }
  }
  removeChildNode(tableBody)
  removeChildNode(tableHeader)
  tableLoader(headerObj,newContentObj)
}

// Remove table content
function removeChildNode(parent){
  while(parent.firstChild){
    parent.removeChild(parent.firstChild)
  }
}


/*--------------- Paragraph resize and read more section ---------------*/
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


  














import utils from "./utils.js"

// Global variables
let contentObj, headerObj

/*--------------- Services page content loading section ---------------*/
utils.jsonCaller("get", "resources/json/services.json",function(object){
  headerObj = object.table
  loadTable(headerObj)
})


/*--------------- Table loading section ---------------*/
function loadTable(headerObj){
  utils.jsonCaller("get", "resources/json/offices.json",function(object){
    contentObj = object
    tableLoader(headerObj,contentObj)
  })
}

function tableLoader(headerObj,contentObj){
  const tableHeader = document.querySelector("#table-head")
  const tableBody = document.querySelector("#table-body")

  loadTableHead(tableHeader, headerObj)

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
       } else if (headerValue.type == "number" || headerValue.type == "date") {
         columnElement.style.textAlign = "right";
         columnElement.textContent = cellValue;
         columnElement.className = key;
       } else {
         columnElement.textContent = cellValue;
         columnElement.className = key;
       }
       rowElement.appendChild(columnElement);
     }
     tableBody.appendChild(rowElement);
   }

}


// Header loading function
function loadTableHead(tableHeader, headerObj){
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

  if(header.dataset["sortable"] == 'true' && header.dataset['type'] == 'string'){
    let element = document.querySelectorAll(`.${header.id}`)
    let valueList = []

    for (let each of element) {
      valueList.push(each.textContent)
    }
    valueList.sort()
    console.log(valueList)
    newContentCreator(valueList,header.id)
  }
})


function newContentCreator(valueList, key) {
  let tableBody = document.querySelector("#table-body");
  let tableHeader = document.querySelector("#table-head");
  let newContentObj = [];

  for (let values of valueList) {
    for (let content of contentObj) {
      if (values == content[key]) {
        newContentObj.push(content);
      }
    }
  }
  removeChildNode(tableBody);
  removeChildNode(tableHeader);
  tableLoader(headerObj, newContentObj);
}

// Remove table content
function removeChildNode(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
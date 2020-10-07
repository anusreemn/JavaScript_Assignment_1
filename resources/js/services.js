import utils from "./utils.js"
import tableFn from "./table.js";

// Global variables
let contentObj, headerObj

/*--------------- Services page content loading section ---------------*/
utils.jsonCaller("get", "resources/json/services.json",function(object){
  headerObj = object.table
  loadTable(headerObj)
})


/*--------------- Table loading section ---------------*/
let tableHeader = document.querySelector("thead");
let tableBody = document.querySelector("tbody");
function loadTable(headerObj) {
  if (headerObj) {
    // Checks whether a tale exist

    // Table header loading
    tableFn.tableHeadLoader(headerObj, "asc", function (headRow) {
      tableHeader.appendChild(headRow);
    });

    // Table content loading
    utils.jsonCaller("get", "resources/json/offices.json", function (object) {
      contentObj = object;
      console.log(contentObj)
      tableFn.tableBodyLoader(tableBody, headerObj, contentObj);
    });
  }
}


// Event listener for sorting
tableHeader.addEventListener("click", function (e) {
  let header = e.target;
  let clickedId = header.id
  tableFn.tableSort(header, contentObj, function (newContentList, nextOrder) {
    // Table header (re)loading
    tableFn.tableHeadLoader(headerObj, nextOrder, function (headRow) {
      tableHeader.appendChild(headRow);

      // Hide icons based on sort order
      let upArrow = document.querySelector(`.${clickedId}UpArrow`)
      let downArrow = document.querySelector(`.${clickedId}DownArrow`);
      if(nextOrder == 'asc'){
        upArrow.style.visibility = 'hidden'
        downArrow.style.visibility = "visible";
      }
      else{
        upArrow.style.visibility = "visible";
        downArrow.style.visibility = "hidden";
      }
    });

    // Table body (re)loading
    tableFn.tableBodyLoader(tableBody,headerObj, newContentList);
  });
});


// function tableLoader(headerObj,contentObj,order){
//   const tableHeader = document.querySelector("#table-head")
//   const tableBody = document.querySelector("#table-body")

//   loadTableHead(tableHeader, headerObj,order)

//    for (let contentValue of contentObj) {
//      let rowElement = document.createElement("tr");
//      for (let headerValue of headerObj) {
//        let columnElement = document.createElement("td");
//        let key = headerValue.id;
//        let cellValue = contentValue[key];
//        if (headerValue.type == "link") {
//          let link = document.createElement("a");
//          link.href = cellValue;
//          link.textContent = "Link";
//          columnElement.appendChild(link);
//        } else if (headerValue.type == "button") {
//          if (contentValue.status == "open") {
//            let btn = document.createElement("button");
//            btn.textContent = "Apply Now";
//            columnElement.appendChild(btn);
//          } else {
//            columnElement.textContent = " - ";
//          }
//        } else if (headerValue.type == "number" || headerValue.type == "date") {
//          columnElement.style.textAlign = "right";
//          columnElement.textContent = cellValue;
//          columnElement.className = key;
//        } else {
//          columnElement.textContent = cellValue;
//          columnElement.className = key;
//        }
//        rowElement.appendChild(columnElement);
//      }
//      tableBody.appendChild(rowElement);
//    }

// }


// Header loading function
// function loadTableHead(tableHeader, headerObj,order){
//   let headRow = document.createElement("tr");
//   for (let headValue of headerObj) {
//     let headElement = document.createElement("th");
//     headElement.textContent = headValue.tittle;
//     headElement.setAttribute("data-type", headValue.type);
//     headElement.setAttribute("data-sortable", headValue.sortable);
//     headElement.id = headValue.id;

//     if (order == "asc") {
//       headElement.className += "asc";
//     } else {
//       headElement.className += "des";
//     }

//     if (headValue.sortable == true) {
//       let iconHolder = document.createElement("div"); // Creates a div to hold the icons
//       iconHolder.className = "icon-holder";
//       let upArrow = document.createElement("ion-icon");
//       upArrow.name = "chevron-up-outline";
//       upArrow.className = `${headValue.id}-up-arrow`; // Maps the icon and header column using class name
//       iconHolder.appendChild(upArrow);
//       let downArrow = document.createElement("ion-icon");
//       downArrow.name = "chevron-down-outline";
//       downArrow.className = `${headValue.id}-down-arrow`; // Maps the icon and header column using class name

//       if (order == "asc") {
//         upArrow.style.visibility = "visible";
//         downArrow.style.visibility = "hidden";
//       } else {
//         upArrow.style.visibility = "hidden";
//         downArrow.style.visibility = "visible";
//       }

//       iconHolder.appendChild(downArrow);
//       headElement.appendChild(iconHolder);
//     }
    
//     headRow.appendChild(headElement);
//   }
//   tableHeader.appendChild(headRow);
// }

// Table sorting Area  -------------//
// const tableHeader = document.querySelector("#table-head")
// tableHeader.addEventListener('click',function(e){
//   let header = e.target

//   if(header.dataset["sortable"] == 'true' && header.dataset['type'] == 'string'){
//     let element = document.querySelectorAll(`.${header.id}`)
//     let valueList = []

//     for (let each of element) {
//       valueList.push(each.textContent)
//     }

//     if (header.className == "asc") {
//       console.log("asc");
//       var nextOrder = "des";
//       valueList.sort();
//       newContentCreator(valueList, header.id, nextOrder);
//     } else {
//       console.log("des");
//       var nextOrder = "asc";
//       valueList.reverse();
//       newContentCreator(valueList, header.id, nextOrder);
//     }
//   }
// })


// function newContentCreator(valueList, key,newOrder) {
//   let tableBody = document.querySelector("#table-body");
//   let tableHeader = document.querySelector("#table-head");
//   let newContentObj = [];

//   for (let values of valueList) {
//     for (let content of contentObj) {
//       if (values == content[key]) {
//         newContentObj.push(content);
//       }
//     }
//   }
//   removeChildNode(tableBody);
//   removeChildNode(tableHeader);
//   tableLoader(headerObj, newContentObj,newOrder);
// }

// // Remove table content
// function removeChildNode(parent) {
//   while (parent.firstChild) {
//     parent.removeChild(parent.firstChild);
//   }
// }
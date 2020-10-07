import utils from "./utils.js"
import tableFn from "./table.js";

// Global variables
let contentObj, headerObj

/*--------------- Services page content loading section ---------------*/
utils.jsonCaller("get", "resources/json/services.json", function (object) {
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
      if (nextOrder == 'asc') {
        upArrow.style.visibility = 'hidden'
        downArrow.style.visibility = "visible";
      }
      else {
        upArrow.style.visibility = "visible";
        downArrow.style.visibility = "hidden";
      }
    });

    // Table body (re)loading
    tableFn.tableBodyLoader(tableBody, headerObj, newContentList);
  });
});


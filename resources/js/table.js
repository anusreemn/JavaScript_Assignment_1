let tableHeaders = [];
let tableContent = [];
/*------------------- Table Header loading fn -------------------*/

let tableHeadLoader = function (headerList, order, callback) {
  if (headerList) {  // Checks whether a table exists.
    tableHeaders = headerList;
    let headRow = document.createElement("tr") 

    for (let headValue of headerList) {
      let headElement = document.createElement("th")

      // Check the table sorting direction and add class name accordingly.
      if (order == "asc") {
        headElement.className = "asc"
      } else if (order == "desc") {
        headElement.className = "desc"
      }

      // Adding text content and data attribute to 'th' element
      headElement.textContent = headValue.tittle 
      headElement.setAttribute("data-type", headValue.type) 
      headElement.setAttribute("data-sortable", headValue.sortable) 
      headElement.id = headValue.id 

      // Adding up and down arrows
      if (headValue.sortable == true) {

        let upArrow = document.createElement('i')
        upArrow.className = `up Arrow` 

        let downArrow = document.createElement('i')
        downArrow.className = `down Arrow` 

        headElement.appendChild(upArrow)
        headElement.appendChild(downArrow) 
      }

      headRow.appendChild(headElement) 
    }

    //insert headRow into thead
    const thead = document.querySelector('thead');
    thead.appendChild(headRow); 

    bindSortToThead(thead);

  }
}

/*------------------- Table content loading fn -------------------*/

let bindSortToThead = function (tableHeader) {

  // Event listener for sorting
  tableHeader.addEventListener("click", function (e) {
    let header = e.target 
    let clickedId = header.id
    
    tableSort(header, function (newContentList) {
      // determine current clicked header sort classname
      let nextOrder = "asc";
      if (!header.className || header.className == "asc") {
        nextOrder = "desc" 
      }
      // reset all header sort classnames
      resetSortClassNames();
      header.className = nextOrder;

      // Table body (re)loading
      redraw(newContentList) 
    }) 
  }) 

}


/*------------------- Table content loading fn -------------------*/
let insertEmptyTableRow = function() {
  const body = document.querySelector('tbody');
  const row = body.insertRow();
  const td = row.insertCell();
  td.setAttribute('colspan', tableHeaders.length);
  td.setAttribute('class', 'empty-row');
  td.innerHTML = 'No Data Available.';
}

let redraw = function(content) {
  document.querySelector('tbody').remove();
  document.querySelector('table').appendChild(document.createElement('tbody'));
  tableBodyLoader(content)
}

let tableBodyLoader = function (contentList) {
  let headerList = tableHeaders;
  if (contentList) {  // Checks if any content present

    tableContent = contentList;
    const tableBody = document.querySelector('tbody')

    for (let contentValue of contentList) {
      let rowElement = document.createElement("tr")

      for (let headerValue of headerList) {
        let columnElement = document.createElement("td") 
        let key = headerValue.id 
        let cellValue = contentValue[key] 

        if (headerValue.type == "link") {
          let link = document.createElement("a") 
          link.href = cellValue 
          link.textContent = "Link" 
          columnElement.appendChild(link) 
        } else if (headerValue.type == "button") {
          if (contentValue.status == "open") {
            let btn = document.createElement("button") 
            btn.textContent = "Apply Now" 
            btn.onclick = function (e) {
              alert("Applies Successfully") 
            } 
            columnElement.appendChild(btn) 
          } else {
            columnElement.textContent = " - " 
          }
        } else if (headerValue.type == "number" || headerValue.type == "date") {
          columnElement.style.textAlign = "right" 
          columnElement.textContent = cellValue 
          columnElement.className = key 
        } else {
          columnElement.textContent = cellValue 
          columnElement.className = key 
        }

        rowElement.appendChild(columnElement) 
      }
      tableBody.appendChild(rowElement) 
    }
  }
  else {
    // Fallback fn here.......................................
    insertEmptyTableRow()
  }
}



/*------------------- Table sorting fn ------------------------*/


let sortData = function(data, sortKey, isNumber) {
  const sortNumber = function(a, b) {
    return a[sortKey] - b[sortKey]
  }
  const sortString = function(a, b) {
    if (a[sortKey] > b[sortKey]) return 1;
    else if (a[sortKey] < b[sortKey]) return -1;
    else return 0;
  }
  const newData = data.sort(isNumber ? sortNumber : sortString)
  return newData;
}

let reverseData = function(data, sortKey, isNumber) {
  const sortNumber = function(a, b) {
    return a[sortKey] - b[sortKey]
  }
  const sortString = function(a, b) {
    if (a[sortKey] > b[sortKey]) return 1;
    else if (a[sortKey] < b[sortKey]) return -1;
    else return 0;
  }
  const newData = data.reverse(isNumber ? sortNumber : sortString)
  return newData;
}

let tableSort = function(header, callback) {
  if (header.dataset.sortable) {
    // See if the data is sortable and do below
    let newContentList = [];
    const isNumber = header.dataset.type == "number";
    if (!header.className || header.className == 'asc') {
      newContentList = sortData(tableContent, header.id, isNumber);
    } else if (header.className == 'desc') {
      newContentList = reverseData(tableContent, header.id, isNumber);
    }
    callback(newContentList);
  } else {
    console.log("Not sortable") 
    return 
  }
}

let resetSortClassNames = function() {
  const thElms = document.querySelectorAll('th')
  for (let th of thElms) {
    th.className = '';
  }
}

let tableFn = { tableHeadLoader, tableBodyLoader, tableSort } 
export default tableFn
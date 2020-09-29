import jsonCaller from './jsonCall.js'
window.onload = (event) => {
  
  var obj;
  var index;

  
  // Menu handler
  const menuList = document.querySelector("#nav-menus")
  jsonCaller('get','resources/json/menu.json',function(menuObj){
  
    obj = menuObj
    for (let each_option of menuObj) {
      let menuElements = createMenu(each_option.label, each_option.link, each_option.status)
      menuList.appendChild(menuElements)
    }
  })

  // Event handling of menu
  menuList.addEventListener('click',function(evt){
    let status = evt.target.getAttribute("data-status")
   
    if (status == "true"){
      window.location.assign(evt.target.getAttribute("data-link"))
    }
    else{
      window.location.assign("/404.html")
    }
  })


  // Function for creating menu elements
  function createMenu(content, link, status) {
    const menuElement = document.createElement("li");
    const menuLink = document.createElement("a");
    menuLink.href = "#";
    menuLink.setAttribute("data-link",link)
    menuLink.setAttribute("data-status", status)
    menuLink.className += "menu-link";
    menuLink.textContent = content;
    menuElement.appendChild(menuLink);
    return menuElement;
  }


  // Blog post section
  let postLists = document.querySelector(".posts")
  jsonCaller('get',"resources/json/blogpost.json", function(blogObj){
     for(let each_option of blogObj){
       let blogPost = createPost(each_option.tittle, each_option.image)
       postLists.appendChild(blogPost)
     }
  })


  function createPost(tittle, imglink) {
    const postElement = document.createElement("li");
    const postLink = document.createElement("a");

    const postLinkDiv = document.createElement("div");
    postLinkDiv.className += "post-image-div";

    const postText = document.createElement("p");
    postText.className += "post-info";
    postText.textContent = tittle;

    const postImg = document.createElement("img");
    postImg.src = imglink;

    postLinkDiv.appendChild(postText);
    postLinkDiv.appendChild(postImg);
    postLink.appendChild(postLinkDiv);
    postElement.appendChild(postLink);

    return postElement;
  }


  //Table headings

  const tableRequest = new XMLHttpRequest();

  tableRequest.onload = function () {
    if (this.status === 200) {
      try {
        const tableObj = JSON.parse(this.responseText);

        // Add table headings
        const tableHead = document.querySelector("#table-head");
        const tableRow = document.createElement("tr");

        for (i = 0; i < tableObj.heading.length; i++) {
          const tableElement = document.createElement("th");
          tableElement.textContent = tableObj.heading[i];

          tableRow.appendChild(tableElement);

          if (i == tableObj.heading.length - 1) {
            tableHead.appendChild(tableRow);
          }
        }
      } catch {
        console.warn("JSON not parsed");
      }
    } else {
      console.warn("File not found");
    }
  };

  tableRequest.open("get", "resources/json/table.json");
  tableRequest.send();

  //Debugging fn
  function check() {
    console.log("foo");
  }

  // Dropdown button
  // function dropDown() {
  //   console.log("clicked");
  // }

  const dropDownButton = document.querySelector(".drop-down-button");
  dropDownButton.addEventListener("click", function () {
    const navigation = document.querySelector(".navigation");
    if (navigation.style.display === "none") {
      navigation.style.display = "block";
    } else {
      navigation.style.display = "none";
    }
  });
}

  


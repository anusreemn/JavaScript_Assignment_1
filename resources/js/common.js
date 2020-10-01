import utils from './utils.js'
// import testCall from "./jsonCall.js"
window.onload = (event) => {
  
  var obj;
  var index;

  var welcomeTextBox = document.querySelector(".welcome-text")
  var logoutBtn = document.querySelector('.logout')

  welcomeTextBox.textContent = `Hi ${localStorage.getItem("loggedin")}`;
  logoutBtn.addEventListener('click', function () {
    localStorage.removeItem("loggedin")
    location.href = "/login.html"
  })

  // Menu handler
  const menuList = document.querySelector('#nav-menus')
  const header = document.querySelector('#page-heading')

  utils.jsonCaller('get','resources/json/menu.json',function(menuObj){
  
    obj = menuObj
    for (let menu of menuObj) {
      let menuElements = createMenu(menu.label, menu.link, menu.status)
      menuList.appendChild(menuElements)
      createHeading(menu)
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

  // Function for setting heading
  function createHeading(input){
    let currentPath = location.pathname
    if (currentPath == input.link){
      header.textContent = input.label
    }
  }

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
  utils.jsonCaller('get',"resources/json/blogpost.json", function(blogObj){
     for(let blog of blogObj){
       let blogPost = createPost(blog.tittle, blog.image)
       postLists.appendChild(blogPost)
     }
  })


  function createPost(tittle, imgLink) {
    const postElement = document.createElement("li");
    const postLink = document.createElement("a");

    const postLinkDiv = document.createElement("div");
    postLinkDiv.className += "post-image-div";

    const postText = document.createElement("p");
    postText.className += "post-info";
    postText.textContent = tittle;

    const postImg = document.createElement("img");
    postImg.src = imgLink;

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

  


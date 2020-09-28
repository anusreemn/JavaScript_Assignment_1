window.onload = (event) => {
  var obj;
  var index;
  

  // Fetching menu objects form menu.json
  const menuRequest = new XMLHttpRequest();

  menuRequest.onload = function () {
    if (this.status === 200) {
      try {
        const menuObj = JSON.parse(this.responseText);
        // Add menu objects to html file
        const menuList = document.querySelector("#nav-menues");

        for (i = 0; i < menuObj.length; i++) {
          menuList.appendChild(createMenu(menuObj[i].label, menuObj[i].link));

          if (i == menuObj.length - 1) {
            menuEventHandler(menuObj);
          }
        }
      } catch {
        console.warn("JSON not parsed");
      }
    } else {
      console.warn("File not found");
    }
  };
  menuRequest.open("get", "resources/json/menu.json");
  menuRequest.send();

  // Function for creating menu elements
  function createMenu(content, link) {
    const menuElement = document.createElement("li");
    const menuLink = document.createElement("a");
    menuLink.href = "#";
    menuLink.className += "menu-link";
    menuLink.textContent = content;
    menuElement.appendChild(menuLink);
    return menuElement;
  }

  // Event handler function for menu
  function menuEventHandler(menuObj) {
    const menuLinks = document.querySelectorAll(".menu-link");
    obj = menuObj;

    for (i = 0; i < menuLinks.length; i++) {
      menuLinks[i].addEventListener("click", function (event) {
        var linktext = event.target.textContent;
        console.log(linktext);
        for (j = 0; j < menuLinks.length; j++) {
          if (linktext == obj[j].label) {
            var state = obj[j].status;
            if (state) {
              window.open(obj[j].link, "_self");
            } else {
              window.open("../404.html", "_self");
            }
          }
        }
      });
    }
  }

  // Blog post section
  const blogRequest = new XMLHttpRequest();

  blogRequest.onload = function () {
    if (this.status === 200) {
      try {
        const blogObj = JSON.parse(this.responseText);

        // Add blog post to html
        const postLists = document.querySelector(".posts");

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

        for (i = 0; i <= blogObj.length-1; i++) {
          postLists.appendChild(
            createPost(blogObj[i].tittle, blogObj[i].image)
          );
        }
      } catch {
        console.warn("JSON not parsed");
      }
    } else {
      console.warn("File not found");
    }
  };

  blogRequest.open("get", "resources/json/blogpost.json");
  blogRequest.send();

  //Table headings

  const tableRequest = new XMLHttpRequest();

  tableRequest.onload = function () {
    if (this.status === 200) {
      try {
        const tableObj = JSON.parse(this.responseText);

        // Add table headings
        const tableHead = document.querySelector("#table-head");
        const tableRow = document.createElement("tr");

        for(i=0; i<(tableObj.heading.length); i++){
          const tableElement = document.createElement('th')
          tableElement.textContent = tableObj.heading[i]
          
          tableRow.appendChild(tableElement)

          if (i == tableObj.heading.length-1) {
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
  function check(){
    console.log("foo")
  }


}

  


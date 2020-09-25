window.onload = (event) => {

  var obj
  var index

  // Fetching menu objects form menu.json
  const menuRequest = new XMLHttpRequest()
  const menuObj = ""

  menuRequest.onload = function(){
    if(this.status === 200){
      try{
        const menuObj = JSON.parse(this.responseText)
        // Add menu objects to html file
        const menuList = document.querySelector('#nav-menues')

        for(i=0; i< menuObj.length; i++){
          menuList.appendChild(createMenu(menuObj[i].label, menuObj[i].link))

          if(i == (menuObj.length)-1){
            menuEventHandler(menuObj)
          }
        }


      }
      catch{
        console.warn('JSON not parsed')
      }
    }
    else{
      console.warn('File not found')
    }
  }
  menuRequest.open('get','resources/json/menu.json')
  menuRequest.send()

  // Function for creating menu elements
  function createMenu(content,link) {
    const menuElement = document.createElement('li')
    const menuLink = document.createElement('a')
    menuLink.href = "#"
    menuLink.className += "menu-link"
    menuLink.textContent = content
    menuElement.appendChild(menuLink)
    return menuElement
  }

  // Event handler function for menu
  function menuEventHandler(menuObj){
    const menuLinks = document.querySelectorAll(".menu-link")
    obj = menuObj

    for( i=0; i < menuLinks.length; i++){
      menuLinks[i].addEventListener('click',function(event){
        var linktext = event.target.textContent
        console.log(linktext)
        for(j=0; j<menuLinks.length; j++){
          if(linktext == obj[j].label){
            var state = obj[j].status
            if(state){
              window.open(obj[j].link, "_self")
            }
            else{
              window.open("../404.html", "_self")
            }
          }
        }

      })
    }

      
  }

    
}

  


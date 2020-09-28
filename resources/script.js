window.onload = (event) => {

  // Fetching menu objects form menu.json
  const menuRequest = new XMLHttpRequest()

  menuRequest.onload = function(){
    if(this.status === 200){
      try{
        const menuObj = JSON.parse(this.responseText)
        console.log(menuObj[1].label)

        // Add menu objects to html file
        const menuList = document.querySelector('#navMenues')

        function createMenu(content) {
          const menuElement = document.createElement('li')
          const menuLink = document.createElement('a')
          menuLink.textContent = content
          menuElement.appendChild(menuLink)
          return menuElement
        }

        for(i=0; i<= menuObj.length; i++){
          menuList.appendChild(createMenu(menuObj[i].label))
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


  //Blog post section
  const blogRequest = new XMLHttpRequest()

  blogRequest.onload = function(){
    if(this.status === 200){
      try{
        const blogObj = JSON.parse(this.responseText)
        console.log(blogObj[1].image)

        // Add blog post to html
        const postLists = document.querySelector('.posts')
        
        function createPost(tittle, link){
          const postElement = document.createElement('li')
          const postLink = document.createElement('a')

          const postLinkDiv = document.createElement('div')
          postLinkDiv.className += "postImageDiv"

          const postText = document.createElement('p')
          postText.className += "postInfo"
          postText.textContent = tittle

          const postImg = document.createElement('img')
          postImg.src = link

          postLinkDiv.appendChild(postText)
          postLinkDiv.appendChild(postImg)
          postLink.appendChild(postLinkDiv)
          postElement.appendChild(postLink)

          return postElement
        }


        for(i=0; i<= blogObj.length; i++){
          postLists.appendChild(createPost(blogObj[i].tittle, blogObj[i].image))
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

  blogRequest.open('get','resources/json/blogpost.json')
  blogRequest.send()


  //Table headings

  const tableRequest = XMLHttpRequest()

  tableRequest.onload = function(){
    if(this.status === 200){
      try{
        const tableObj = JSON.parse(this.responseText)

        // Add table headings
        const tableHead = document.querySelector('#tableHead')
        const tableRow = document.createElement('tr')
        tableHead.appendChild(tableRow)

      }
      catch{
        console.warn('JSON not parsed')
      }

    }
    else{
      console.warn('File not found')
    }
  }

  tableRequest.open('get','resources/json/table.json')
  tableRequest.send()










}
window.onload = (event) => {

  const xhr = new XMLHttpRequest()

  xhr.onload = function(){
    if(this.status === 200){
      try{
        const menuObj = JSON.parse(this.responseText)
        console.log(menuObj[1])
      }
      catch(e){
        console.warn('JSON not parsed')
      }
    }
    else{
      console.warn('File not found')
    }
    
  }

  xhr.open('get','resources/json/menu.json')
  xhr.send()








}
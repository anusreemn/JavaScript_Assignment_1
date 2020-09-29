var jsonCaller = function (meathod, url,callback) {
  let xhr = new XMLHttpRequest()

  xhr.onload = function () {
    if (this.status === 200) {
      try{
        let responsObj = JSON.parse(this.responseText)
        callback(responsObj)
      }
      catch{
        console.warn("JSON not parsed")
      }
    }
    else{
      console.warn("JSON not found")
    }
  }

  xhr.open(meathod, url)
  xhr.send()
}

export default jsonCaller
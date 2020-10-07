let jsonCaller = function (meathod, url, callbackFn) {
  let xhr = new XMLHttpRequest()

  xhr.onload = function () {
    if (xhr.status !== 200) {
        console.log('Oops! Something went wrong.');
        callbackFn(false);
    } else {
        // try {
          callbackFn(JSON.parse(xhr.response));
        // } catch (err) {
        //   console.log('JSON not parsed')
        //   callbackFn(false)
        // }
    }
  }

  xhr.open(meathod, url)
  xhr.send()
}

let storeObjects = function (key, value) {
  let existingValue = JSON.parse(localStorage.getItem(key))
  existingValue.push(value)
  let newValue = JSON.stringify(existingValue)
  localStorage.setItem(key, newValue) 
}



let retreiveObjects = function (key, callback) {
  let storedValue = JSON.parse(localStorage.getItem(key))
  callback(storedValue)
}

let utils = { jsonCaller, storeObjects, retrieveObjects: retreiveObjects }
export default utils


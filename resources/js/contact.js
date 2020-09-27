// https://youtu.be/eg4e-FObyJ8
const submitBtn = document.querySelector(".formBtn")


submitBtn.addEventListener('click', function(){
  
  const name = document.querySelector("#name").value
  const subject = document.querySelector("#subject").value
  const email = document.querySelector("#email").value
  const phone = document.querySelector("#phone").value
  const message = document.querySelector("#message").value

  var errorMessage = "Oops! Please Check the fields."
  
  if (validate(name, email, phone, message)){
    var contactData = {name:name, email:email, phone:phone, message:message}
    const contactJSON = JSON.stringify(contactData)
    apiCall(contactJSON)
  }
  else{
    alert(errorMessage)
  }
  
})



function validate(name, email, phone, message){
  // Check whether fields are empty
  if (name.length == 0 || email.length == 0 || phone.length == 0 || message.length == 0) {
    return false
  }
  else {
    if (name.length <= 2) {
      document.querySelector("#name").focus()
      return false
    }
    else if (isNaN(phone) || phone.length != 10) {
      document.querySelector("#phone").focus()
      return false
    }
    else if (email.indexOf("@") <= 0 || email.length < 6 || email.indexOf('.') == -1) {
      document.querySelector("#email").focus()
      return false
    }
    else if (message.length < 6) {
      document.querySelector("#message").focus()
      return false
    }
    else {
      return true
    }
  }

}


function apiCall(jsonData){
  alert(jsonData)
}
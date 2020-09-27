// https://youtu.be/eg4e-FObyJ8
const submitBtn = document.querySelector(".formBtn")


submitBtn.addEventListener('click', function(){
  
  const name = document.querySelector("#name").value
  const subject = document.querySelector("#subject").value
  const email = document.querySelector("#email").value
  const phone = document.querySelector("#phone").value
  const message = document.querySelector("#message").value
  
  if (validate(name, email, phone, message)){
    var contactData = {name:name, email:email, phone:phone, message:message} 
    const contactJSON = JSON.stringify(contactData)
    clearError()
    apiCall(contactJSON)
  }
  else{
    return
  }
  
})



function validate(name, email, phone, message){
  // Check whether fields are empty
  if (name.length == 0 || email.length == 0 || phone.length == 0 || message.length == 0) {
    const error = document.querySelectorAll(".label");
    for (i = 0; i < error.length; i++) {
      error[i].style.display = "block";
    }
    return false
  }
  else {
    clearError()
    if (name.length <= 2) {
      Id = "#name-error"
      setError(Id)
      return false
    }
    else{
      clearError()
    }

    if (isNaN(phone) || phone.length != 10) {
      Id = "#phone-error";
      setError(Id);
      return false
    }
    else{
      clearError()
    }

    if (email.indexOf("@") <= 0 || email.length < 6 || email.indexOf('.') == -1) {
      Id = "#email-error";
      setError(Id);
      return false
    }
    else{
      clearError()
    }

    if (message.length < 6) {
      Id = "#message-error";
      setError(Id);
      return false
     
    }
    else{
      clearError()
    }
    
  }

  return true
}

function setError(id){
  const fieldError = document.querySelector(id);
  fieldError.style.display = "block";
}

function clearError(){
  const error = document.querySelectorAll(".label");
  for(i=0; i< error.length; i++){
    error[i].style.display = "none"
  }
  
}


function apiCall(jsonData){
  alert(jsonData)
}
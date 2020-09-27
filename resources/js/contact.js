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
      Id1 = "#name-error"
      Id2 = "#name"
      setError(Id1,Id2)
      return false
    }
    else{
      clearError()
    }

    if (isNaN(phone) || phone.length != 10) {
      Id1 = "#phone-error";
      Id2 = "#phone";
      setError(Id1, Id2);
      return false
    }
    else{
      clearError()
    }

    if (email.indexOf("@") <= 0 || email.length < 6 || email.indexOf('.') == -1) {
      Id1 = "#email-error";
      Id2 = "#email";
      setError(Id1, Id2);
      return false
    }
    else{
      clearError()
    }

    if (message.length < 6) {
      Id1 = "#message-error";
      Id2 = "#message";
      setError(Id1, Id2);
      return false
     
    }
    else{
      clearError()
    }
    
  }

  return true
}

function setError(id1,id2){
  const fieldError = document.querySelector(id1);
  const field = document.querySelector(id2)
  field.style.border = "1px solid #ff0033";
  fieldError.style.display = "block";
}

function clearError(){
  const error = document.querySelectorAll(".label");
  const inputs = document.querySelectorAll("input")
  const textArea = document.querySelector("textarea")

  textArea.style.border = "1px solid #000"
  for(i=0; i< error.length; i++){
    error[i].style.display = "none"
    inputs[i].style.border = "1px solid #000"
  }
  
}


function apiCall(jsonData){
  alert(jsonData)
}
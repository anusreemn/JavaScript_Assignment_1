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
  clearError()
  if(name.length == 0){
    Id1 = "#name-error";
    Id2 = "#name";
    msg = "Name Field is Empty!";
    setError(Id1, Id2, msg);
    return false;
  }else{
    if (name.length <= 2) {
      Id1 = "#name-error";
      Id2 = "#name";
      msg = "Name is invalid!";
      setError(Id1, Id2, msg);
      return false;
    } else {
      clearError();
    }
  }
  
  if(phone.length ==0){
    Id1 = "#phone-error";
    Id2 = "#phone";
    msg = "Phone number field is empty!";
    setError(Id1, Id2, msg);
    return false;
  }
  else{
    const stringNumber = phone.toString()
    const slicedNum = stringNumber.slice(3)
    const phoneNo = parseInt(slicedNum,10)
    
    if (isNaN(phoneNo) || slicedNum.length != 10) {
      Id1 = "#phone-error";
      Id2 = "#phone";
      msg = "Phone number is invalid!";
      setError(Id1, Id2, msg);
      return false;
    } else {
      clearError();
    }
  }

  if(email.length == 0){
    Id1 = "#email-error";
    Id2 = "#email";
    msg = "Email field is empty!";
    setError(Id1, Id2, msg);
    return false;
  }
  else{
    if (
      email.indexOf("@") <= 0 ||
      email.length < 6 ||
      email.indexOf(".") == -1
    ) {
      Id1 = "#email-error";
      Id2 = "#email";
      msg = "Email is invalid!";
      setError(Id1, Id2, msg);
      return false;
    } else {
      clearError();
    }
  }

  if(message.length == 0){
    Id1 = "#message-error";
    Id2 = "#message";
    msg = "Message field is empty!";
    setError(Id1, Id2, msg);
    return false;
  }
  else{
    if (message.length < 6) {
      Id1 = "#message-error";
      Id2 = "#message";
      msg = "Message is invalid!";
      setError(Id1, Id2, msg);
      return false;
    } else {
      clearError();
    }
  }
  
  return true;
}

  


function setError(id1,id2,msg){
  const fieldError = document.querySelector(id1);
  const field = document.querySelector(id2)
  field.style.border = "1px solid #ff0033";
  fieldError.textContent = msg
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

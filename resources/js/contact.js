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
    // clearError()
    apiCall(contactJSON)
  }
  else{
    return
  }
  
})



function validate(name, email, phone, message){
  // clearError();
  var validName = false;
  var validEmail = false;
  var validPhone = false;
  var validMessage = false;
  console.log(name.length);

  if (name.length == 0) {
    Id1 = "#name-error";
    Id2 = "#name";
    msg = "Name Field is Empty!";
    setError(Id1, Id2, msg);
  } else {
    if (name.length <= 2) {
      Id1 = "#name-error";
      Id2 = "#name";
      msg = "Name is too short!";
      setError(Id1, Id2, msg);
    } else {
      Id1 = "#name-error";
      Id2 = "#name";
      clearError(Id1,Id2);
      validName = true;
    }
  }

  if (phone.trim().length == 3) {
    Id1 = "#phone-error";
    Id2 = "#phone";
    msg = "Phone number field is empty!";
    setError(Id1, Id2, msg);
  } else {
    const stringNumber = phone.toString();
    const slicedNum = stringNumber.slice(3);
    const phoneNo = parseInt(slicedNum, 10);

    if (isNaN(phoneNo) || slicedNum.length != 10) {
      Id1 = "#phone-error";
      Id2 = "#phone";
      msg = "Phone number is invalid!";
      setError(Id1, Id2, msg);
    } else {
      Id1 = "#phone-error";
      Id2 = "#phone";
      clearError(Id1,Id2);
      validPhone = true;
    }
  }

  if (email.length == 0) {
    Id1 = "#email-error";
    Id2 = "#email";
    msg = "Email field is empty!";
    setError(Id1, Id2, msg);
  } else {
    if (!isEmail(email)) {
      Id1 = "#email-error";
      Id2 = "#email";
      msg = "Email is invalid!";
      setError(Id1, Id2, msg);
    } else {
      Id1 = "#email-error";
      Id2 = "#email";
      clearError(Id1,Id2);
      validEmail = true;
    }
  }

  if(message.length == 0){
    Id1 = "#message-error";
    Id2 = "#message";
    msg = "Message field is empty!";
    setError(Id1, Id2, msg);

  }
  else{
    if (message.length < 6) {
      Id1 = "#message-error";
      Id2 = "#message";
      msg = "Message is too short!";
      setError(Id1, Id2, msg);

    } else {
      Id1 = "#message-error";
      Id2 = "#message";
      clearError(Id1,Id2);
      validMessage = true
    }
  }

  if (validName && validEmail && validPhone && validMessage) {
    return true;
    
  } else {
    return false;
  }

}

  


function setError(id1,id2,msg){
  const fieldError = document.querySelector(id1);
  const field = document.querySelector(id2)
  field.style.border = "1px solid #ff0033";
  fieldError.textContent = msg
  fieldError.style.display = "block";
}


function clearError(id1,id2){
  const fieldError = document.querySelector(id1)
  const field = document.querySelector(id2)

  field.style.border = "1px solid #2ecc71";
  fieldError.style.display = "none";
  
}


function apiCall(jsonData){
  // alert(jsonData)
  console.log(jsonData)
}

// Email validation using regular expressions
function isEmail(email){
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
}
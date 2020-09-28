// https://youtu.be/eg4e-FObyJ8
const submitBtn = document.querySelector(".formBtn")
const fields = document.querySelectorAll(".input");
const form = document.querySelector('form')

var isValid = true

submitBtn.addEventListener('click', function(){
  validateFields(fields)
  
  if (isValid) {
  
    var contactData = {
      name: fields[0].value,
      email: fields[3].value,
      phone: fields[2].value,
      message: fields[4].value,
    };
    
    const contactJSON = JSON.stringify(contactData);
    // clearError()
    apiCall(contactJSON);
  } else {
    isValid = true;
  }
  
})

function validateFields(fields){
  
  for(i=0; i<fields.length;i++){
    var input = fields[i]
    validate(input)
  }
}

function validate(input) {
  var validName = false;
  var validEmail = false;
  var validPhone = false;
  var validMessage = false;
  if (input.required && input.value.length == 0) {
    setError(input, `${input.name} field cannot be empty!`);
  } else {
    if (input.id == "name") {
      validName = validateName(input)
    }
    else if(input.id == "phone"){
      validPhone = validatePhone(input)
    }
    else if(input.id == "email"){
      validEmail = validateEmail(input)
    }
    else if(input.id == "message"){
      validMessage = validateMessage(input)
    }
  }

}

function validateName(input){
  if(input.value.length < 8){
    setError(input, "Name is too short!");
    return false
  }else{
    if(!isName(input.value)){
      setError(input, "Name is invalid!");
      return false
    }
    else{
      clearError(input)
      return true
    }
  }
}

function validatePhone(input){
  
  if(isNaN(input.value) || input.value.length != 10){
    setError(input, "Phone number is invalid!");
    return false;
  }else{
    clearError(input)
    return true
  }
}

function validateEmail(input){
  if (!isEmail(input.value)) {
    setError(input,"Email is invalid!");
    return false
  } else {
    clearError(input);
    return true
  }
}

function validateMessage(input){
  if (input.value.length < 6) {
    setError(input, "Message is too short!");
    return false
  } else {
    clearError(input);
    return true
  }
}

function countChar(input){
  const counter = document.querySelector(`#${input.id}-counter`);
  const limit = field.maxLength;

  charInField = input.value.length;
  newCounterVale = limit - charInField;

  counter.innerHTML = newCounterVale;
}


for(i=0;i< fields.length; i++){
  fields[i].addEventListener('blur',function(e){
    validate(e.target)
  })
}

form.addEventListener('keydown',function(e){
  try{
    
    clearError(e.target);
    countChar(e.target)
    // const counter = document.querySelector(`#${e.target.id}-counter`);
    // const limit = field.maxLength;

    // charInField = field.value.length;
    // newCounterVale = limit - charInField;

    // counter.innerHTML = newCounterVale;
  }
  catch{
    return
  }
})



// function validate(name, email, phone, message){
//   // clearError();
//   var validName = false;
//   var validEmail = false;
//   var validPhone = false;
//   var validMessage = false;

//   if (name.length == 0) {
//     Id1 = "#name-error";
//     Id2 = "#name";
//     msg = "Name Field is Empty!";
//     setError(Id1, Id2, msg);
//   } else {
//     if (name.length < 8) {
//       Id1 = "#name-error";
//       Id2 = "#name";
//       msg = "Name should be more than 8 charectors!";
//       setError(Id1, Id2, msg);
//     } else {
//       if(!isName(name)){
//         Id1 = "#name-error";
//         Id2 = "#name";
//         msg = "Name cannot be numbers or white space!";
//         setError(Id1, Id2, msg);
//       }
//       else{
//         Id1 = "#name-error";
//         Id2 = "#name";
//         clearError(Id1, Id2);
//         validName = true;
//       }
//     }
//   }

//   if (phone.trim().length == 3) {
//     Id1 = "#phone-error";
//     Id2 = "#phone";
//     msg = "Phone number field is empty!";
//     setError(Id1, Id2, msg);
//   } else {
//     const stringNumber = phone.toString();
//     const slicedNum = stringNumber.slice(3);
//     const phoneNo = parseInt(slicedNum, 10);

//     if (isNaN(phoneNo) || slicedNum.length != 10) {
//       Id1 = "#phone-error";
//       Id2 = "#phone";
//       msg = "Phone number is invalid!";
//       setError(Id1, Id2, msg);
//     } else {
//       Id1 = "#phone-error";
//       Id2 = "#phone";
//       clearError(Id1,Id2);
//       validPhone = true;
//     }
//   }

//   if (email.length == 0) {
//     Id1 = "#email-error";
//     Id2 = "#email";
//     msg = "Email field is empty!";
//     setError(Id1, Id2, msg);
//   } else {
//     if (!isEmail(email)) {
//       Id1 = "#email-error";
//       Id2 = "#email";
//       msg = "Email is invalid!";
//       setError(Id1, Id2, msg);
//     } else {
//       Id1 = "#email-error";
//       Id2 = "#email";
//       clearError(Id1,Id2);
//       validEmail = true;
//     }
//   }

//   if(message.length == 0){
//     Id1 = "#message-error";
//     Id2 = "#message";
//     msg = "Message field is empty!";
//     setError(Id1, Id2, msg);

//   }
//   else{
//     if (message.length < 6) {
//       Id1 = "#message-error";
//       Id2 = "#message";
//       msg = "Message is too short!";
//       setError(Id1, Id2, msg);

//     } else {
//       Id1 = "#message-error";
//       Id2 = "#message";
//       clearError(Id1,Id2);
//       validMessage = true
//     }
//   }

//   if (validName && validEmail && validPhone && validMessage) {
//     return true;
    
//   } else {
//     return false;
//   }

// }


function setError(input,msg){
  const fieldError = document.querySelector(`#${input.id}-error`);
  const field = document.querySelector(`#${input.id}`)
  field.style.border = "1px solid #ff0033";
  fieldError.textContent = msg
  fieldError.style.display = "block";
  isValid = false
}


function clearError(input){
  const fieldError = document.querySelector(`#${input.id}-error`);
  const field = document.querySelector(`#${input.id}`);

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

// Name validation using regular expressions
function isName(name){
  return /^[A-Za-z\s]+$/.test(name)
}


// const counter = document.querySelector("#name-counter")
// console.log(counter.textContent)



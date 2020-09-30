import utils from "./utils.js"

// All input fields
let passwordInput = document.querySelector("#password")  // password field
let firstnameInput = document.querySelector("#firstname")  // Firstname field
let lastnameInput = document.querySelector("#lastname") // Lastname field
let dateofbirthInput = document.querySelector("#dob") // date of birth field
dateofbirthInput.defaultValue = "2014-02-09"
let dropdown = document.querySelector('select')  // Gender field
let terms = document.querySelector("#t-and-c") // Terms and conditions

let forValidation = document.querySelectorAll(".validate")  // Fields for validation
let registerBtn = document.querySelector("#register-button")  // Register buton

let isValid = true


// Click event of register button
registerBtn.addEventListener('click',function(){
  isValid = true 
  validateFields(forValidation)
  // checkTandC()
  if (isValid) {
    if(terms.checked){
      let confirmField = document.querySelector(`#${passwordInput.id}-confirm`);
      if (confirmPassword(passwordInput)) {
        clearError(confirmField);
        let user = {
          firstname: firstnameInput.value,
          lastname: lastnameInput.value,
          dob: dateofbirthInput.value,
          gender: dropdown.value,
          password:passwordInput.value
        }

        utils.storeObjects("users",user)
        popup()
      } else {
        setError(confirmField, "Passwords doesnot match.");
        isValid = true;
      }
    }
    else{
      alert("Please accept the terms and conditions.")
    }
    
  } else {
    console.log("Not Valid");
    isValid = true;
  }

})


// General validation of required fields
function validateFields(fields){

  for(let field of fields){
    validate(field)
  }
}

function validate(field){
  let validFirstname = false
  let validLastname = false
  let validPassword = false

  if(field.required && field.value.length == 0){
    setError(field, `${field.name} cannot be blank.`);
  }
  else{
    if (field.name == "firstname" || field.name == "lastname") {
      validateName(field);
    } 
    else if (field.name == "password") {
      validatePassword(field)
    }
    else if(field.name == "password-confirm"){
      confirmPassword(field)
    }
  }
}

// Validate name
function validateName(input) {
  if (input.value.length < input.minLength) {
    setError(input, `${input.name} is too short.`);
    return false;
  } else {
    if (!isName(input.value)) {
      setError(input, "Name is invalid!");
      return false;
    } else {
      clearError(input);
      return true;
    }
  }
}

// Validate password
function validatePassword(input){
  if(input.value.length < input.minLength){
    setError(input, `${input.name} is too short.`)
    return false
  }
  else{
    if(!isPass(input.value)){
      setError(
        input,
        "password should contain atleast one number and one special character"
      );
      return false;
    }
    else{
      clearError(input);
      return true;
    }
  }
}

// Confirm password
function confirmPassword(input){
  let secondPass = document.querySelector(`#${input.id}-confirm`);
  if (input.value == secondPass.value){
    return true
  }
  else{
    return false
  }
}



// Name validation using regular expressions
function isName(name){
  return /^[A-Za-z\s]+$/.test(name)
}

function isPass(password){
  return /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(password);
  // Reffer: https://stackoverflow.com/questions/12090077/javascript-regular-expression-password-validation-having-special-characters
}

// Setting the error
function setError(input,msg){
  const errorField = document.querySelector(`.${input.id}-error`)
  input.style.border = "1px solid #ff0033"
  errorField.textContent = msg
  isValid = false
}

// Clearing errors
function clearError(input){
  const fieldError = document.querySelector(`.${input.id}-error`)
  input.style.border = "1px solid #2ecc71"
  fieldError.textContent = ""
}


// Validate on blur
for(let each of forValidation){
  each.addEventListener("blur", function (e) {
    validate(e.target);
  });
}

// Clear error on keydown
const form = document.querySelector('form')
form.addEventListener('keydown',function(e){
  clearError(e.target)
})

// Creates a user and stores to localStorage
function createUser(firstname,lastname,dob,gender,password){
  let userObj = {
    firstname:firstname,
    lastname:lastname,
    dob:dob,
    gender:gender,
    password:password
  }
  
  console.log(userObj);
  utils.storeObjects("users",userObj)
}

// Make the popup
function popup(){
  let body = document.querySelector(".register-body")
  let popupCard = document.querySelector(".popup")

  body.classList.toggle("blur")
  popupCard.classList.toggle("active")
}
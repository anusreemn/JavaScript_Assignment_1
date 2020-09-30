import utils from "./utils.js"

let userValue = localStorage.getItem("users")
let loggedinUser = localStorage.getItem("loggedin")

if(loggedinUser === null){

  if (userValue === null) {
    let value = '[]';
    localStorage.setItem("users", value);
    loginAction()
    // location.href = "/register.html";
  } else {
    loginAction()
  }

}
else{
  location.href = "/home.html"
}

function loginAction(){
  let fields = document.querySelectorAll("input");
  let loginBtn = document.querySelector("#login-button");

  loginBtn.addEventListener("click", function () {
    utils.retreiveObjects("users", function (data) {
      let dataString = JSON.stringify(data)
      
      if (dataString == '[]') { 
        setError(fields[0], "No user found")
        console.log("No user")
      }
      else{
        for (let each_option of data) {
          if (fields[0].value == each_option.firstname) {
            clearError(fields[0])
            if (fields[1].value == each_option.password) {
              clearError(fields[1])
              let nameOfUser = `${each_option.firstname} ${each_option.lastname}`
              localStorage.setItem("loggedin", nameOfUser)
              location.href = "/home.html"
            } else {
              setError(fields[1],"Wrong password")
              console.log("No password")
            }
          } else {
            setError(fields[0], "No user found")
            console.log("No user found")
          }
        }
      }

    });
  });
}


// Setting the error
function setError(input, msg) {
  const errorField = document.querySelector(`.${input.id}-error`)
  input.style.border = "1px solid #ff0033"
  errorField.textContent = msg
}


// Clearing errors
function clearError(input) {
  const fieldError = document.querySelector(`.${input.id}-error`)
  input.style.border = "1px solid #2ecc71"
  fieldError.textContent = ""
}


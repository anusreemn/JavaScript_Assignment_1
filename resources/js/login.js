import utils from "./utils.js"

let userValue = localStorage.getItem("users")
let loggedinUser = localStorage.getItem("loggedin")

if(loggedinUser === null){

  if (userValue === null) {
    let value = "[]";
    localStorage.setItem("users", value);
    location.href = "/register.html";
  } else {
    let fields = document.querySelectorAll("input");
    let loginBtn = document.querySelector("#login-button");

    loginBtn.addEventListener("click", function () {
      utils.retreiveObjects("users", function (data) {
        for (let each_option of data) {
          if (fields[0].value == each_option.firstname) {
            if (fields[1].value == each_option.password) {
              let nameOfUser = `${each_option.firstname} ${each_option.lastname}`
              localStorage.setItem("loggedin", nameOfUser)
              location.href = "/home.html"
            } else {
              console.log("Wrong password")
            }
          } else {
            console.log("NO user found")
          }
        }
      });
    });
  }

}
else{
  location.href = "/home.html"
}







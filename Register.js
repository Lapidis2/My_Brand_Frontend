const registerForm = document.getElementById("registerForm");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("cpassword");
const nameField = document.getElementById("name");
const err = document.querySelector(".err");
//fetching data

// @ts-ignore
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    // @ts-ignore
    if (confirmPassword.value !== password.value) {
        showError("Passwords must match");
        return;
    }

    let userData = {
        // @ts-ignore
        email: email.value,
        // @ts-ignore
        password: password.value,
        // @ts-ignore
        username: nameField.value,
    };

  
    await RegisterUser(userData)
  
  
});

function showError(message) {
   
    
    // @ts-ignore
    err.style.display = "block";
  
   
    // @ts-ignore
    err.style.backgroundColor = "red";
    
    
    // @ts-ignore
    err.innerText = message;
}

function showSuccess(message) {
  
    // @ts-ignore
    err.style.display = "block";

    // @ts-ignore
    err.style.backgroundColor = "green";
   
    // @ts-ignore
    err.innerText = message;
}
function showFail(message) {
  
    // @ts-ignore
    err.style.display = "block";

    // @ts-ignore
    err.style.backgroundColor = "red";
   
    // @ts-ignore
    err.innerText = message;
}



const RegisterUser= async (userData) =>{
    fetch("http://localhost:5000/auth/register", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'no-cors'
        },
        body: JSON.stringify(userData)
    }).then(async response =>{
        if(!response.ok){
           const errMessage=await response.json()
           const msg= errMessage.message
           throw Error(`${msg}`)
        }
        return response.json()
    }).then(async data =>{
        const token =  data.token;
        localStorage.setItem("token", JSON.stringify(token));
        window.location.href = "../index.html";
        console.log(data)
    }).catch(err =>{
    showError(err.message)
    })
    
}

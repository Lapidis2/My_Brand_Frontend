const wrapper =document.querySelector('.wrapper');
// const loginLink =document.querySelector('.login-link');
const registerLink =document.querySelector('.register-link');
const navLinks = document.getElementById('nav-links');
// @ts-ignore
const close = document.getElementById('close');
const toggleBtn = document.getElementById('toggle-btn');
const backToHomeBtn = document.getElementById('backToHomeBtn');



// @ts-ignore
backToHomeBtn.addEventListener('click', () => {
    // Redirect to home page 
    window.location.href = 'index.html'; 
});


// @ts-ignore
document.getElementById('close').addEventListener('click',function(){
    // @ts-ignore
    navLinks.style.display = 'none';
})
// @ts-ignore
toggleBtn.onclick = ()=>{
    // @ts-ignore
    navLinks.classList.toggle('active');
    // @ts-ignore
    if (navLinks.style.display === 'block') {
        // @ts-ignore
        navLinks.style.display = 'none';
      } else {
        // @ts-ignore
        navLinks.style.display = 'block';
}}

 


const wrapper =document.querySelector('.wrapper');
const registerLink =document.querySelector('.register-link');
const navLinks = document.getElementById('nav-links');
// @ts-ignore
const close = document.getElementById('close');
const toggleBtn = document.getElementById('toggle-btn');
const backToHomeBtn = document.getElementById('backToHomeBtn');



// @ts-ignore
backToHomeBtn.addEventListener('click', () => {
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


window.onload = async function() {
    

    try {
      const response = await fetch('https://my-brand-backend-tsc3.onrender.com/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const blogsArr = await response.json();
     
      const blogsData = blogsArr.blogs;
      console.log(blogsData)
      const blogList = document.getElementById('myblogs');
      // @ts-ignore
      blogList.innerHTML = ''; 

      blogsData.forEach((blog) => {
        const div = document.createElement('div');
        
        
        div.innerHTML = `
        <div class="blog"
        
            <div class="blog-content">
            <img src ='${blog.imageUrl}'>
            <h1 class="title">${blog.title}</h1>
            <p class='blog-desc'>${blog.description}</p>
            <a href="reademore.html?id=${blog._id} ">ReadMore</a>
          </div>
          </div>
        `
        // @ts-ignore
        blogList.appendChild(div);
      });

      
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
}


    


 


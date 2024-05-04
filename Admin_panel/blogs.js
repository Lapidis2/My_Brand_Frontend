// @ts-nocheck
const form = document.getElementById("newBlogForm");
let blogContainer = document.querySelector(".blog__list");
let blogs = [];
let blogsData = [];
let nextBlogId = 1; 
const createBtn = document.getElementById('createBtn');
const notifyMsg = document.getElementById('notify_msg'); 
const updateBlogForm = document.getElementById("updateBlogForm");
const createNewBlogmodal = document.getElementById("myModal");
const closeCreateNewBlogModel = document.querySelector(".close");
const closeUpdateBlogModel =document.querySelector(".closeUpdateBlogModel")
        
    closeCreateNewBlogModel.addEventListener("click", () => {
                       createNewBlogmodal.style.display = "none";
                                              });
closeUpdateBlogModel.addEventListener("click", () => {
  updateBlogModel.style.display = "none";
});

window.onload = async function() {
    

    try {
      const response = await fetch('https://my-brand-backend-tsc3.onrender.com/blogs');
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const blogsArr = await response.json();
     
      const blogsData = blogsArr.blogs;
      console.log(blogsData)
      const blogList = document.querySelector('.blog__list');
    
      blogList.innerHTML = ''; 

      blogsData.forEach((blog) => {
        const div = document.createElement('div');
        
        
        div.innerHTML = `
        <div class="blog"
        
            <div class="blog-content">
            <img src =${blog.imageUrl}>
            <h1 class="title">${blog.title}</h1>
            <p class='blog-desc'>${blog.description}</p>

          <div class="blog-buttons" >
          <button class="blog-update-btn" data-index="${index}" data-id="${blog._id}">Update</button>
          <button class="blog-delete-btn" data-id="${blog._id}">Delete</button>
           </div>
          </div>
          </div>
        `
        // @ts-ignore
        blogList.appendChild(div);
        console.log(imageUrl)
      });

      
    } catch (error) {
      console.error('Error fetching blogs:', error.message);
    }
}

document.getElementById("newBlogForm").addEventListener('submit',  async (e)=>{
    e.preventDefault()
    
    let title= document.getElementById("blogtitle").value.trim()
   
    const description= document.getElementById("blogdesc").value.trim()
    console.log(title,description)
    const image= document.getElementById("blogimage").files[0]
    let formData = new FormData()
    formData.append('title', title);
    formData.append('description', description);
   
    formData.append('image',image);
    try { 
    
      let token = getToken()
        fetch('https://my-brand-backend-tsc3.onrender.com/blogs', {
            method: 'POST',
               body:formData,
            headers: {
                'Authorization': `Bearer ${"token"}`
               
            }
       
        }).then(response =>{
            if(!response.ok){
                throw Error("Network Error")
            }
  
            console.log(Array.from(formData.entries()));
            console.log(image)
    notifyMsg.textContent = "Blog created successfully!";
    notifyMsg.style.display = "block";
   
    setTimeout(() => {
      notifyMsg.style.display = "none";
    }, 6000);
            return response.json()
        }).then(data=>{
            console.log(data)
        }).catch(err =>{
            console.log(err)
        })
        

        
// @ts-ignore
}catch(err){
    console.log(err)
}}
)

const getToken = () =>{
    
    const token = JSON.parse(localStorage.getItem('token'))
    console.log(token)
    return token
}
getToken()


let currentBlogId;
let index
let blogId

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("blog-update-btn")) {
    const index = event.target.dataset.index;
    const blogId = event.target.dataset.id;
    console.log("blogId before calling openUpdateBlogModel:", blogId);
    openUpdateBlogModel(index, blogId); 
  }
  if (event.target.classList.contains("blog-delete-btn")) {
    const blogId = event.target.dataset.id;
    await deleteBlog(blogId);
  }
});

const fetchAllBlogs = async () => {
};

const updateBlog = async (formData, blogId) => {
  let title= document.getElementById("title").value.trim()
  // @ts-ignore
  const description= document.getElementById("description").value.trim()
  console.log(title,description)
  const image= document.getElementById("imageUrl").files[0]
  formData = new FormData()
  formData.append('title', title);
  formData.append('description', description);
 
  formData.append('image', image);
  console.log(formData)
  try {
    const token = JSON.parse(localStorage.getItem('token'));
    const response = await fetch(
      `https://my-brand-backend-tsc3.onrender.com/blogs/${blogId}`, 
      {
        method: "PUT",
        headers: {
        
          "Authorization": `Bearer ${token}`, 
        },
        body: JSON.stringify({
          title:`${title}`,
          description:`${description}`,
          image:`${image}`
        }),
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to update blog");
    }

    fetchAllBlogs();
    updateBlogModel.style.display = "none";
  } catch (error) {
    console.error("Error updating blog:", error.message);
    alert("Error updating blog. Please try again.");
  }
};

const openUpdateBlogModel = async (index, blogId) => {
  const token = JSON.parse(localStorage.getItem('token'));
  updateBlogModel.style.display = "block";
  
  try {
    const response = await fetch(
      `https://my-brand-backend-tsc3.onrender.com/blogs/${blogId}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      }
    );
    
    if (!response.ok) {
      throw new Error("Failed to fetch blog details");
    }
    
    const blog = await response.json();
    console.log(blog);
    document.getElementById("title").value = blog.title;
    document.getElementById("description").value = blog.description;
    document.getElementById('blogId').value = blogId;
  } catch (error) {
    console.error("Error fetching blog details for update:", error.message);
   
    alert("Error fetching blog details for update. Please try again.");
  }
};

updateBlogForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  let title = document.getElementById("title").value.trim();
  let description = document.getElementById("description").value.trim();
  const image = document.getElementById("imageUrl").files[0];
  const blogId = document.getElementById("blogId").value;

  let formData = new FormData();
  formData.append("title", title);
  formData.append("description", description);
  formData.append("image", image);

  for (let entry of formData.entries()) {
    console.log(entry[0] + ": " + entry[1]);
  }

  await updateBlog(formData, blogId);
});






const deleteBlog = async (blogId) => {
  try {
    const token = JSON.parse(localStorage.getItem('token'));

    const confirmDelete = window.confirm("Are you sure you want to delete this blog?");

    if (!confirmDelete) {
      return;
    }

    const response = await fetch(
      `https://my-brand-backend-tsc3.onrender.com/blogs/${blogId}`,
      {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`, 
        },
      }
    );
    if (!response.ok) {
      throw new Error("Failed to delete blog");
    }
    else{
      window.location.reload()
    }
    
  } catch (error) {
    console.error("Error deleting blog:", error.message);
  }
};

const token=localStorage.getItem('token')
const getUserIdFromToken = token => {
  const decodedToken = JSON.parse(decodeURIComponent(atob(token.split('.')[1].replace('-', '+').replace('_', '/'))));
  return decodedToken.userId || null;
};















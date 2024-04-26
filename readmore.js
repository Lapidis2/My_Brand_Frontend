

var blog;

window.addEventListener("DOMContentLoaded", async ()=>{
    const blogContainer= document.getElementById("singleContent")
    const singleBlogId= window.location.href.split("=")[1]
    await fetch(`https://my-brand-backend-tsc3.onrender.com/blogs/${singleBlogId}`)
    .then(response =>{        
        if(!response.ok){
            throw Error("Network error")
        }
        return response.json()
    }).then(data=>{
        blog=data
        // @ts-ignore
        blogContainer.innerHTML=`
        <img src="${blog.imageUrl}">
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>

        `
        // console.log(data)
        
        console.log(blog)
    }).catch(err =>{
        console.log(err)
    })
})
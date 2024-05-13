// @ts-nocheck


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
       console.log(data)
        blogContainer.innerHTML=`
        <img src="${blog.imageUrl}">
        <h3>${blog.title}</h3>
        <p>${blog.description}</p>`


        let comments = blog.comment;
        comments.forEach(comment => {
            let commentsContainer = document.getElementById('commentsContainer'); 
            let commentDiv = document.createElement('div');
            let commentText = document.createElement('div');
            let commentTime = document.createElement('div');
            
            commentText.textContent = comment.text;
            commentTime.textContent = `Created at: ${comment.createdAt}`;
            
            commentDiv.appendChild(commentText);
            commentDiv.appendChild(commentTime);
            commentsContainer.appendChild(commentDiv);
        });
           

         likesStat(blog.likes.length)
         console.log(blog)
    }).catch(err =>{
        console.log(err)
    })
})



function likesStat(n){
    const blogNumber= document.getElementById("likesNumber")
    blogNumber.innerHTML=n
}

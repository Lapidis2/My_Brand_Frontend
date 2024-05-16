// @ts-nocheck

function addComment(){
    
    const userId=JSON.parse(localStorage.getItem("userId"))

    const text= document.getElementById("commentText").value.trim()
    const blogId= window.location.href.split("=")[1]
    fetch(`https://my-brand-backend-tsc3.onrender.com/comments/createComment/${blogId}/user/${userId}`, {
        headers:{
            method: "POST",
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({text})
    }).then(response=>{
        if(!response.ok){
            throw Error("Netwotk Error")
        }
        return response.json()
    }).then(data=>{
        console.log(data)
    }).catch(err=>{
        console.log(err)
    })

}
const commentBtn= document.getElementById("comment")
const likeBtn= document.getElementById("like")
likeBtn?.addEventListener("click", async()=>{
     
    const userId=JSON.parse(localStorage.getItem("userId"))
    
    const blogId= window.location.href.split("=")[1]
    fetch(`https://my-brand-backend-tsc3.onrender.com/like/${blogId}/user/${userId}`, {
        method: "POST",
    headers:{
            
            "Content-Type": "application/json"
        },
        
    }).then(response=>{
        if(!response.ok){
            throw Error("Netwotk Error")
        }
        return response.json()
    }).then(data=>{
        console.log(data)
    }).catch(err=>{
        console.log(err)
    })
})


commentBtn?.addEventListener("click", addComment)
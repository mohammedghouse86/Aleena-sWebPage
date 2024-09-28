export const add_like = async(user_UUID, post_UUID, likes) =>{
    console.log("LIKE API CALLED");
    const res = await fetch ('http://localhost:5000/addLIRTBM', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        userUuid:user_UUID, 
        PostUuid:post_UUID,
        likes:likes
        })
    }); 
    const response = await res.json()
}

export const add_retweet = async(user_UUID, post_UUID, retweet) =>{
    const res = await fetch ('http://localhost:5000/addLIRTBM', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        userUuid:user_UUID, 
        PostUuid:post_UUID,
        retweet:retweet,
        })
    }); 
    const response = await res.json()
}


export const add_bookmark = async(user_UUID, post_UUID, bookmarks) =>{
    const res = await fetch ('http://localhost:5000/addLIRTBM', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        userUuid:user_UUID, 
        PostUuid:post_UUID,
        bookmarks:bookmarks
        })
    }); 
    const response = await res.json()
}


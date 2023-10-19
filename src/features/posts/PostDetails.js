import React from 'react'
import { useSelector } from 'react-redux'
import { postById } from './postsSlice'
import { Link, useParams } from 'react-router-dom'
import PostAuthor from './PostAuthor'
import TimeAgo from './TimeAgo'


const PostDetails = () => {
    
    const { postId }= useParams();
    // Fetch the specific post by id
    const post = useSelector( (state) => postById(state, Number(postId)))

   if(!post) {
        return (
            <section>
                <h2>Post not found !!</h2>
            </section>
        )
   }else{
        return (
            <article>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <p className="postCredit">
                    <Link to={`/post/edit/${post.id}`}>Edit Post</Link>
                    <PostAuthor userId={post.userId} /> &nbsp;
                    <TimeAgo timestamp={post.date} />
                </p>
            </article>
        )
   }
  
}

export default PostDetails
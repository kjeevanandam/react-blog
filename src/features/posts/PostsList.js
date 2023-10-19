import { useSelector } from "react-redux"
import { selectAllPosts, getPostStatus, getPostError } from "./postsSlice"
import PostAuthor from "./PostAuthor"
import TimeAgo from "./TimeAgo"
import { Link } from "react-router-dom"

function PostsList() {
    // Fetch all the posts
    const getPosts = useSelector(selectAllPosts)
    const postStatus = useSelector(getPostStatus)
    const error = useSelector(getPostError)

    let posts;
    if(postStatus === 'loading'){
        posts = <p>Loading ...</p>
    }else if(postStatus === 'succeeded'){ 
        // Sorting the posts by date ( latest post will come first)
        posts = getPosts.slice().sort((a,b) => b.date.localeCompare(a.date));
        posts = posts.map(post => (
            <article key={post.id}>
                <h3>{post.title}</h3>
                <p className="excerpt">{post.body.substring(0, 70)}...</p>
                <p className="postCredit">
                    <Link to={`/post/${post.id}`}>View Post</Link>
                    <PostAuthor userId={post.userId} /> &nbsp;
                    <TimeAgo timestamp={post.date} />
                </p>
            </article>
        ))
    }else if(postStatus === 'failed'){
        posts = <p>{error}</p>
    }
    
    return (
        <section>
            <h2>Posts</h2>
            { posts }
        </section>
    )
}

export default PostsList
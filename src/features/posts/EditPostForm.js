import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { postById, updatePost, deletePost } from '../posts/postsSlice'

import { selectAllUsers } from "../users/usersSlice"


const EditPostForm = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { postId } = useParams()
    // Fetch post by id
    const post = useSelector( (state) => postById(state, Number(postId)))
    const users = useSelector(selectAllUsers)
    const [title, setTitle] = useState(post?.title)
    const [content, setContent] = useState(post?.body)
    const [userId, setUserId] = useState(post?.userId)
    const [requestStatus, setRequestStatus] = useState('idle')

    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)

    const enableSaveButton = [title, content, userId].every(Boolean) && requestStatus === 'idle'
    // Update post
    const postUpdate = () => {
        if(enableSaveButton) {
            try{
                setRequestStatus('pending')
                dispatch(updatePost({id:post.id, title, body:content, userId})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate(`/post/${postId}`)
            }catch(err){
                console.log('Failed to save the post', err)
            }finally {
                setRequestStatus('idle')
            }
        }
    }
    // Delete post
    const postDelete = () => {
        if(!window.confirm('Are you sure? Do you want to delete this post?')){
            return;
        }
        try {
            setRequestStatus('pending')
            dispatch(deletePost({id:post.id})).unwrap()
            setTitle('')
            setContent('')
            setUserId('')
            navigate('/')
        }catch(err) {
            console.log(`Failed to delete the post`, err)
        } finally {
            setRequestStatus('idle')
        }
    }

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input 
                    type="text"
                    id="postTitle"
                    name="postTitle"
                    value={title}
                    onChange={onTitleChange}
                />
                <label htmlFor="postAuthor"> Author:</label>
                <select id="postAuthor" value={userId} onChange={onAuthorChange}>
                    <option value=""></option>
                    {
                        users && users.map(user => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))
                    }
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea 
                    id="postContent"
                    name="postContent"
                    value={content}
                    onChange={onContentChange}
                />
                <button 
                    type="button"
                    onClick={postUpdate}
                    disabled={!enableSaveButton}
                >Save</button>
                <button 
                    type="button"
                    onClick={postDelete}
                >Delete</button>
            </form>
        </section>
    )
}

export default EditPostForm
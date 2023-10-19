import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost  } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
import { useNavigate } from "react-router-dom";

 
const AddPostForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [requestStatus, setRequestStatus] = useState('idle')


    const onTitleChange = e => setTitle(e.target.value)
    const onContentChange = e => setContent(e.target.value)
    const onAuthorChange = e => setUserId(e.target.value)

    const enableSaveButton = [title, content, userId].every(Boolean) && requestStatus === 'idle'

    const users = useSelector(selectAllUsers);
    const savePost = () => {
        if(enableSaveButton) {
            try{
                setRequestStatus('pending')
                dispatch(addNewPost({title, body:content, userId})).unwrap()
                setTitle('')
                setContent('')
                setUserId('')
                navigate('/')
            }catch(err){
                console.log('Failed to save the post', err)
            }finally {
                setRequestStatus('idle')
            }
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
                        users.map(user => (
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
                    onClick={savePost}
                    disabled={!enableSaveButton}
                >Save</button>
            </form>
        </section>
    )
}

export default AddPostForm
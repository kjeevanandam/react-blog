import React from 'react'
import { useSelector } from 'react-redux'
import { userById } from './usersSlice'
import { postByUserId } from '../posts/postsSlice'
import { Link, useParams } from 'react-router-dom'

const UserDetails = () => {
    const { userId } = useParams()
    // Fetch the user details by Id
    const user = useSelector((state) => userById(state, Number(userId)))
    // Fetch all the posts by user Id
    const postByUser = useSelector(state => postByUserId(state, Number(userId)))

    return (
        <section>
            <h2>{user?.name}</h2>
            <ol>
                {postByUser && postByUser.map(post => (
                    <li key={post.id}>
                        <Link to={`/post/${post.id}`} >{post.title}</Link>
                    </li>
                ))
            }
            </ol>
        </section>
    )
}

export default UserDetails
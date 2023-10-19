import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import PostsList from './features/posts/PostsList';
import UsersList from './features/users/UsersList';
import AddPostForm from './features/posts/AddPostForm';
import PostDetails from './features/posts/PostDetails';
import EditPostForm from './features/posts/EditPostForm';
import UserDetails from './features/users/UserDetails';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout />}>
            <Route index element={<PostsList />} />
            <Route path='post'>
                <Route index  element={<AddPostForm />}/>
                <Route path=":postId"  element={<PostDetails />}/>
                <Route path="edit/:postId"  element={<EditPostForm />}/>
            </Route>
            <Route path='user'>
                <Route index  element={<UsersList />}/>
                <Route path=":userId"  element={<UserDetails />}/>
            </Route>
            { /* Navigate to home page if the routes not found */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
    </Routes>
  );
}

export default App;

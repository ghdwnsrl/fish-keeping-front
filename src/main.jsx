import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import My from "./pages/userpage/My.jsx";
import PostDetail from "./pages/postDetail/PostDetail.jsx";
import Join from "./pages/Join.jsx";
import WriteForm from "./pages/WriteForm.jsx";
import UserPage from "./pages/userpage/UserPage.jsx";
import Post from "./pages/userpage/Post.jsx";
import Tank from "./pages/userpage/Tank.jsx";
import ArchiveDetail from "./pages/ArchiveDetail.jsx";
import EditForm from "./pages/EditForm.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <Home/>
            },
            {
                path: '/edit',
                element: <EditForm/>
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/my',
                element: <My/>,
            },
            {
                path: '/:id',
                element: <PostDetail/>
            },
            {
                path: '/join',
                element: <Join/>
            },
            {
                path: '/write',
                element: <WriteForm/>,
            },
            {
                path: '/users/:username',
                element: <UserPage/>,
                children: [
                    {
                        path: 'posts',
                        element: <Post/>
                    },
                    {
                        path: 'tanks',
                        element: <Tank/>
                    }
                ]
            },
            {
                path: '/users/:username/archives/:archiveName',
                element: <ArchiveDetail/>
            }

        ],
        errorElement: <div>error</div>
    }]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
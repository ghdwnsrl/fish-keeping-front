import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage/index.jsx";
import LoginPage from "./pages/LoginPage/index.jsx";
import My from "./pages/UserPage/My.jsx";
import JoinPage from "./pages/JoinPage/index.jsx";
import PostWritePage from "./pages/PostWritePage/index.jsx";
import UserPage from "./pages/UserPage/index.jsx";
import Post from "./pages/UserPage/Post.jsx";
import Tank from "./pages/UserPage/Tank.jsx";
import ArchiveDetail from "./pages/ArchiveDetail.jsx";
import PostEditPage from "./pages/PostEditPage/index.jsx";
import PostDetailPage from "./pages/PostDetailPage/index.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: '/edit',
                element: <PostEditPage/>
            },
            {
                path: '/login',
                element: <LoginPage/>,
            },
            {
                path: '/my',
                element: <My/>,
            },
            {
                path: '/:id',
                element: <PostDetailPage/>
            },
            {
                path: '/join',
                element: <JoinPage/>
            },
            {
                path: '/write',
                element: <PostWritePage/>,
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
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
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import SettingPage from "./pages/SettingPage/index.jsx";
import SearchPage from "./pages/SearchPage/index.jsx";
import Test from "./pages/Test.jsx";

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
                element: <ProtectedRoute>
                    <PostEditPage/>
                </ProtectedRoute>
            },
            {
                path: '/login',
                element: <LoginPage/>,
            },
            {
                path: '/my',
                element: <ProtectedRoute>
                    <My/>
                </ProtectedRoute>,
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
                path: '/setting',
                element: <ProtectedRoute>
                    <SettingPage/>
                </ProtectedRoute>
            },
            {
                path: '/write',
                element: <ProtectedRoute>
                    <PostWritePage/>
                </ProtectedRoute>,
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
            },
            {
                path: '/search',
                element: <SearchPage/>
            }
        ],
        errorElement: <div>error</div>
    }]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
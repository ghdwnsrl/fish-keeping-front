import {lazy} from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import HomePage from "./pages/HomePage/index.jsx";
import App from "./App.jsx";
import PrivacyPage from "./pages/PrivacyPage/index.jsx";
import TermPage from "./pages/TermPage/index.jsx";
import AdminLoginPage from "./pages/admin/AdminLoginPage/index.jsx";
import AdminDashBoardPage from "./pages/admin/AdminDashBoardPage/index.jsx";

const LoginPage = lazy(() => import('./pages/LoginPage/index.jsx'));
const PostEditPage = lazy(() => import('./pages/PostEditPage/index.jsx'));
const My = lazy(() => import('./pages/UserPage/My.jsx'));
const PostDetailPage = lazy(() => import('./pages/PostDetailPage'));
const JoinPage = lazy(() => import('./pages/JoinPage/index.jsx'));
const SettingPage = lazy(() => import('./pages/SettingPage/index.jsx'));
const PostWritePage = lazy(() => import('./pages/PostWritePage/index.jsx'));
const UserPage = lazy(() => import('./pages/UserPage/index.jsx'));
const ArchiveDetailPage = lazy(() => import('./pages/ArchiveDetailPage/index.jsx'));
const SearchPage = lazy(() => import('./pages/SearchPage/index.jsx'));
const Post = lazy(() => import('./pages/UserPage/Post.jsx'));
const Tank = lazy(() => import('./pages/UserPage/Tank.jsx'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <HomePage/>
            },
            {
                path: '/edit',
                element: <ProtectedRoute><PostEditPage /></ProtectedRoute>
            },
            {
                path: '/login',
                element: <LoginPage/>
            },
            {
                path: '/my',
                element: <ProtectedRoute><My/></ProtectedRoute>
            },
            {
                path: '/:id',
                element: <PostDetailPage />
            },
            {
                path: '/join',
                element: <JoinPage />
            },
            {
                path: '/setting',
                element: <ProtectedRoute><SettingPage /></ProtectedRoute>
            },
            {
                path: '/write',
                element: <ProtectedRoute><PostWritePage /></ProtectedRoute>
            },
            {
                path: '/users/:username',
                element: <UserPage />,
                children: [
                    {
                        path: 'posts',
                        element: <Post />
                    },
                    {
                        path: 'tanks',
                        element: <Tank />
                    }
                ]
            },
            {
                path: '/users/:username/archives/:archiveName',
                element: <ArchiveDetailPage />
            },
            {
                path: '/search',
                element: <SearchPage />
            },
            {
                path: '/privacy',
                element: <PrivacyPage/>
            },
            {
                path: '/terms',
                element: <TermPage/>
            },
            {
                path: '/admin',
                element: <AdminLoginPage/>,
            },
            // todo : 접근 제한 필요
            {
                path: '/admin/dashboard',
                element: <AdminDashBoardPage/>,
            }
        ],
        errorElement: <div>Error</div>
    }
]);

createRoot(document.getElementById('root')).render(
      <RouterProvider router={router}/>
)
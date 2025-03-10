import {useState} from "react";
import {FaBars} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkSessionState, logout} from "../../api/user.js";
import * as AuthSlice from "../../feature/authSlice.js";
import {useMutation} from "@tanstack/react-query";
import {openModal} from "../../feature/dialogSlice.js";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";
import LazyNavLink from "../LazyNavLink.jsx";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isAuthenticated : isLogin, username} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { mutate: checkAuth } = useMutation({
        mutationFn : checkSessionState,
        onError: (error) => {
            console.log(error)
                if (error.response && error.response.status === 401) {
                    dispatch(openModal({
                        title: "로그인 만료",
                        content: "잠시 후, 로그인 페이지로 이동합니다.",
                        redirectPath: '/login'
                    }))
                }
            }
        }
    )

    const { mutate: logoutUser } = useMutation({
            mutationFn: logout,
            onSuccess: () => {
                dispatch(AuthSlice.logout())
                setIsMenuOpen(!isMenuOpen)
                navigate('/login')
            }
        }
    )

    const onClickHandler = () => {
        checkAuth()
    }

    const navItems = [
        <LazyNavLink
            key="login"
            to="/login"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            preloadModule={() => import('../../pages/LoginPage/index.jsx')}
            className='font-semibold hover:text-gray-500'
        >
            로그인
        </LazyNavLink>,
    ];

    const authNavItems = [
        <LazyNavLink
            key="write"
            to="/write"
            onClick={onClickHandler}
            className='font-semibold hover:text-gray-500'
            preloadModule={() => import('../../pages/PostWritePage/index.jsx')}
        >
            작성하기
        </LazyNavLink>,
        <LazyNavLink
            key="setting"
            to="/setting"
            onClick={onClickHandler}
            className='font-semibold hover:text-gray-500'
            preloadModule={() => import('../../pages/SettingPage/index.jsx')}
        >
            설정
        </LazyNavLink>,
        <LazyNavLink
            key="my"
            to={`/users/${username}/posts`}
            className='font-semibold hover:text-gray-500'
            preloadModule={() => import('../../pages/UserPage/index.jsx')}
        >
            마이페이지
        </LazyNavLink>,
        <button key="logout" className='font-semibold hover:text-gray-500 text-left' onClick={() => {
            logoutUser()
            setIsMenuOpen(false)
        }}>로그아웃</button>,
    ];

    return (
        <header className='px-4 border-b'>
            <div className='flex justify-between container mx-auto items-center h-14'>
                <Link to='/' className='text-4xl h-full block'>
                    <img className='h-full p-2' alt='logo' src="/logo.png"/>
                </Link>
                <nav className=' space-x-4'>
                    {isLogin? <Menu>
                        <MenuButton><FaBars/></MenuButton>
                        <MenuItems anchor="bottom" className='mt-5 bg-white flex flex-col border p-5 min-w-[150px]'>
                            {authNavItems.map((item, index) => {
                                return <MenuItem key={index}>
                                    {item}
                                </MenuItem>
                            })}
                        </MenuItems>
                    </Menu> : navItems}
                </nav>
            </div>
        </header>
    )
}

export default Header;
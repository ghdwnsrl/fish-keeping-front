import {useState} from "react";
import {FaBars} from "react-icons/fa";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkSessionState, logout} from "../../api/user.js";
import * as AuthSlice from "../../feature/authSlice.js";
import {useMutation} from "@tanstack/react-query";
import {openModal} from "../../feature/dialogSlice.js";
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react";

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
                        content: "로그인 페이지로 이동할까요?",
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
        <NavLink key="login" to="/login" onClick={() => setIsMenuOpen(!isMenuOpen)} className='font-semibold hover:text-gray-300'>로그인</NavLink>,
    ];

    const authNavItems = [
        <NavLink key="write" onClick={onClickHandler} to="/write" className='font-semibold hover:text-gray-300'>작성하기</NavLink>,
        <NavLink key="setting" onClick={onClickHandler} to="/setting" className='font-semibold hover:text-gray-300'>설정</NavLink>,
        <NavLink key="my" to={`/users/${username}/posts`} className='font-semibold hover:text-gray-300'>마이페이지</NavLink>,
        <button key="logout" className='font-semibold hover:text-gray-300 text-left' onClick={() => {
            logoutUser()
            setIsMenuOpen(false)
        }}>로그아웃</button>,
    ];

    return (
        <header className='px-4 border-b'>
            <div className='flex justify-between container mx-auto items-center h-14'>
                <Link to='/' className='text-4xl h-full block'>
                    <img className='h-full p-2' alt='logo' src="/logo.svg"/>
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
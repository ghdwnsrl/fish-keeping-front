import {useState} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {checkSessionState, logout} from "../../api/user.js";
import * as AuthSlice from "../../feature/authSlice.js";
import useApiRequest from "../../hooks/useApiRequest.js";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isAuthenticated : isLogin, username} = useSelector(state => state.auth)
    const {execute: executeLogout} = useApiRequest(logout)
    const {execute: checkSession} = useApiRequest(checkSessionState)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onClickHandler = () => {
        checkSession({}, {
            onSuccess: () => {
                console.log('유효한 세션')
            },
            onError: (error) => {
                if (error.response && error.response.status === 401) {
                    console.log('session 만료')
                    dispatch(AuthSlice.logout())
                    navigate('/login')
                }
            }
        })
    }


    const onLogoutClickHandler = () => {
        executeLogout({},{
            onSuccess : () => {
                dispatch(AuthSlice.logout())
                navigate('/login')
            },
            onError: () => {
                console.log('실패')
            },
        });
    }

    const navItems = [
        <NavLink key="login" to="/login" className='font-semibold hover:text-gray-300'>로그인</NavLink>,
    ];

    const authNavItems = [
        <NavLink key="write" onClick={onClickHandler} to="/write" className='font-semibold hover:text-gray-300'>작성하기</NavLink>,
        <NavLink key="my" onClick={onClickHandler} to={`/users/${username}/posts`} className='font-semibold hover:text-gray-300'>마이페이지</NavLink>,
        <button key="logout" className='font-semibold hover:text-gray-300 text-left' onClick={onLogoutClickHandler}>로그아웃</button>,
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const renderNavItems = () => {
        const items = isLogin ? authNavItems : navItems
        return items.map(item => {
            return item;
        })
    }

    return (
        <header className='bg-sky-800 text-white px-4'>
            <div className='flex justify-between container mx-auto items-center h-14'>
                <div>
                    <Link to='/' className='text-4xl font-bold'> Test </Link>
                </div>
                <nav className='hidden md:flex space-x-4'>
                    {isLogin? authNavItems : navItems}
                </nav>
                <button className='md:hidden' onClick={toggleMenu}>
                    <FaBars/>
                </button>
            </div>

            {/*   mobile   */}
            <aside className={`
                fixed top-0 left-0 w-64 h-full bg-sky-800 z-50
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
                md:hidden transform transition-transform duration-300 ease-in-out
                `
            }>
                <div className='flex justify-end p-4'>
                    <button
                        className='text-white focus:outline-none'
                        aria-label='Close menu'
                        onClick={toggleMenu}
                    >
                        <FaTimes className="h-6 w-6"/>
                    </button>
                </div>
                <nav className='flex flex-col space-y-4 p-4'>
                    {renderNavItems()}
                </nav>
            </aside>
        </header>
    )
}

export default Header;
import {useState} from "react";
import {FaBars, FaPen, FaTimes} from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import {CiLogin, CiLogout} from "react-icons/ci";
import {IoPerson} from "react-icons/io5";
import {useSelector} from "react-redux";

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const {isAuthenticated : isLogin, username} = useSelector(state => state.auth)

    const navItems = [
        { id: 'login', label: '로그인', icon: <CiLogin/>, to: '/login' },
    ];

    const authNavItems = [
        { id: 'write', label: '작성하기', icon: <FaPen/>, to: '/write' },
        { id: 'my', label: '마이페이지', icon: <IoPerson/>, to: `/users/${username}/posts` },
        { id: 'logout', label: '로그아웃', icon: <CiLogout/>, to: '/logout' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const renderNavItems = () => {
        const items = isLogin ? authNavItems : navItems
        return items.map(item => {
            return <NavLink key={item.id} to={item.to} onClick={toggleMenu} className='font-semibold hover:text-gray-300'>{item.label}</NavLink>
        })
    }

    return (
        <header className='bg-sky-800 text-white px-4'>
            <div className='flex justify-between container mx-auto items-center h-14'>
                <div>
                    <Link to='/' className='text-4xl font-bold'> Test </Link>
                </div>
                <nav className='hidden md:flex space-x-4'>
                    {renderNavItems()}
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
import {useState} from "react";
import {FaBars, FaTimes} from "react-icons/fa";
import {Link, NavLink} from "react-router-dom";
import {CiLogin, CiLogout} from "react-icons/ci";
import {IoPerson} from "react-icons/io5";

function Header() {
    const [isLogin, setIsLogin] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { id: 'login', label: 'LOGIN', icon: <CiLogin/>, to: '/login' },
    ];

    const authNavItems = [
        { id: 'my', label: 'MY', icon: <IoPerson/>, to: '/my' },
        { id: 'logout', label: 'LOGOUT', icon: <CiLogout/>, to: '/logout' },
    ];

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

    const renderNavItems = () => {
        const items = isLogin ? navItems : authNavItems
        return items.map(item => {
            return <NavLink key={item.id} to={item.to} onClick={toggleMenu} className='hover:text-gray-300'>{item.label}</NavLink>
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
import LazyNavLink from "../../components/LazyNavLink.jsx";

const TabNavigation = ({username}) => {
    return (
        <div className='flex gap-2 text-xl font-bold'>
            <LazyNavLink
                key="posts"
                to={`/users/${username}/posts`}
                className={({ isActive }) => isActive ? "text-sky-800 border-b-2 border-b-sky-800" : "text-black"}
                preloadModule={() => import('../../pages/UserPage/Post.jsx')}
            >
                모든 게시물
            </LazyNavLink>
            <LazyNavLink
                key="tanks"
                to={`/users/${username}/tanks`}
                className={({ isActive }) => isActive ? "text-sky-800 border-b-2 border-b-sky-800" : "text-black"}
                preloadModule={() => import('../../pages/UserPage/Tank.jsx')}
            >
                저장소
            </LazyNavLink>
        </div>
    )
}

export default TabNavigation;
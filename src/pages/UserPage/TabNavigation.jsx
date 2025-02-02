import {NavLink} from "react-router-dom";

const TabNavigation = ({username}) => {
    return (
        <div className='flex gap-2 text-xl font-bold'>
            <NavLink
                to={`/users/${username}/posts`}
                className={({ isActive }) => isActive ? "text-blue-500 border-b-2 border-b-blue-500" : "text-black"}
            >
                모든 게시물
            </NavLink>
            <NavLink
                to={`/users/${username}/tanks`}
                className={({ isActive }) => isActive ? "text-blue-500 border-b-2 border-b-blue-500" : "text-black"}
            >
                저장소
            </NavLink>
        </div>
    )
}

export default TabNavigation;
import {FaPencil} from "react-icons/fa6";
import {Link} from "react-router-dom";

function TankCard({ username, imgURL='https://via.placeholder.com/150', props}) {
    const {name, id, description, lastModified = '-', totalPosts} = props
    console.log('tankCard ', username, name)
    return (
        <div className='opacity-100 will-change-transform transform-none'>
            <Link to={`/users/${username}/archives/${name}`}>
                <div className='overflow-hidden flex md:flex-col min-w-6 bg-gray-100 rounded-xl m-2 items-center'>
                    <img className='p-2 rounded-2xl md:w-full' src={imgURL} alt='thumbnail'/>
                    <div className='gap-1 flex m-3 items-baseline flex-col'>
                        <span className='font-semibold'>{name} [{totalPosts} POST]</span>
                        <p className='pl-2 pb-1'>{description}</p>
                        <div className='flex gap-1 items-center'>
                            <FaPencil className='text-xs text-gray-500'/>
                            <span className='text-xs text-gray-500'>{lastModified}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default TankCard;
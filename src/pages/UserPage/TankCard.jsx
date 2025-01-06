
import {Link} from "react-router-dom";

function TankCard({ username, imgURL='https://via.placeholder.com/150', props}) {
    const {name, id, description, lastModified = '-', totalPosts} = props
    console.log('tankCard ', username, name)
    return (
        <Link to={`/users/${username}/archives/${name}`}>
            <div className='grid grid-cols-3 mt-3 gap-1 mx-auto'>
                        <div key={id}>
                            <img className='object-cover w-48 h-48 sm:h-64 sm:w-64 rounded-lg' src={imgURL}
                                 alt='thumbnail'/>
                            <dl key={name} className='m-1'>
                                <dt className='font-bold'>{name}</dt>
                                <dd>{description}</dd>
                                <div className='flex flex-grow gap-1'>
                                    <p className='text-sm'>{totalPosts} 개의 업로드</p>
                                    <p className='text-xs text-gray-500'>마지막 업로드 {lastModified}</p>
                                </div>
                            </dl>
                        </div>
            </div>
        </Link>


    )
}

export default TankCard;
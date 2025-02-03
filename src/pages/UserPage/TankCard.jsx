
import {Link} from "react-router-dom";

function TankCard({ username, props}) {
    console.log(props)
    const {name, id, thumbnailUrl, description, lastModified, totalPosts} = props
    return (
        <Link to={`/users/${username}/archives/${name}`}>
            <div key={id}>
                <img className='object-cover w-48 h-48 sm:h-64 sm:w-64 rounded-lg' src={thumbnailUrl ?? 'https://placehold.co/200x240?text=NO%20IMAGE'}
                     alt='thumbnail'/>
                <dl key={name} className='m-1'>
                    <dt className='font-bold'>{name}</dt>
                    <dd>{description}</dd>
                    <div className='flex-row flex-grow gap-1 sm:flex sm:items-end'>
                        <p className='text-sm'>{totalPosts} 개의 업로드</p>
                        <p className='text-xs text-gray-500'>마지막 업로드 {lastModified?? '-'}</p>
                    </div>
                </dl>
            </div>
        </Link>
    )
}

export default TankCard;
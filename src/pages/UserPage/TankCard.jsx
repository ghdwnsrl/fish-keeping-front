
import {Link} from "react-router-dom";

function TankCard({ username, props}) {
    const {name, id, thumbnailUrl, description, lastModified, totalPosts} = props
    return (
        <Link to={`/users/${username}/archives/${name}`}>
            <div key={id} className='flex flex-col sm:flex-row gap-4 hover:bg-gray-50 p-4'>
                <img className='object-cover w-full h-48 sm:h-40 sm:w-48 rounded-lg' src={thumbnailUrl ?? 'https://placehold.co/200x240?text=NO%20IMAGE'}
                     alt='thumbnail'/>
                <dl key={name} className='m-1 flex-1 flex-col flex justify-between '>
                    <dt className='font-bold text-2xl'>{name}</dt>
                    <dd>{description}</dd>
                    <div className='flex items-center justify-between mt-4 gap-1'>
                        <div className="flex items-center gap-2">
                            <span
                                className='text-xs inline-flex  font-semibold bg-gray-200 px-1.5 m-1 rounded-full'>{totalPosts}개의 업로드</span>
                            <p className='text-xs text-gray-500'>마지막 업로드 {lastModified ?? '-'}</p>
                        </div>
                        <div className="text-sm text-muted-foreground text-gray-500 group-hover:text-primary transition-colors duration-200">
                            자세히 보기 →
                        </div>
                    </div>
                </dl>
            </div>
        </Link>
    )
}

export default TankCard;
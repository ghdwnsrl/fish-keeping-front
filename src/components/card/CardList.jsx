import Card from "./Card.jsx";
import {useParams} from "react-router-dom";

function CardList({currentPage = 0, data}) {
    const {id} = useParams();
    return <div className='mb-4'>
        {data?.map(data => {
            return <Card key={data.id}
                         id={data.id}
                         title={data.title}
                         createdAt={data.createdAt}
                         commentCount={data.commentCount}
                         username={data.username}
                         like={data.likeCount}
                         views={data.views}
                         thumbnailUrl={data.thumbnailUrl}
                         page={currentPage}
                         options={(Number(id) === data.id) ? 'bg-sky-100' : ''}
            />
        })}
    </div>
}

export default CardList;
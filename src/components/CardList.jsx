import Card from "./Card.jsx";
import {useParams} from "react-router-dom";

function CardList({currentPage, data}) {
    const {id} = useParams();
    return data.map(data => {
        return <Card key={data.id}
                     id={data.id}
                     title={data.title}
                     createdAt={data.createdAt}
                     commentCount={data.commentCount}
                     like={data.like}
                     views={data.views}
                     page={currentPage}
                     options={(Number(id) === data.id) ? 'bg-sky-100' : ''}
        />
    })
}

export default CardList;
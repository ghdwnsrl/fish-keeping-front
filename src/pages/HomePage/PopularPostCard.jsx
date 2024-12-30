import Card from "../../components/Card.jsx";
import Title from "../../components/Title.jsx";

const PopularPostCard = ({data}) => {
    return (
        <Card
            header={<Title>인기 게시글</Title>}
            data={data}
        />
    )
}

export default PopularPostCard
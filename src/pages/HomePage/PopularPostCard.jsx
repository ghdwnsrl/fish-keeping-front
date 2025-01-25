import Card from "../../components/Card.jsx";
import Title from "../../components/Title.jsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {getPopularPosts} from "../../api/posts.js";

const PopularPostCard = () => {
    const { data } = useSuspenseQuery({
        queryKey: ['PopularPosts'],
        queryFn: getPopularPosts
    } )
    return (
        <Card
            header={<Title>인기 게시글</Title>}
            data={data}
        />
    )
}

export default PopularPostCard
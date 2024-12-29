import Card from "../../components/Card.jsx";
import Title from "../../components/Title.jsx";

const dummyData = [
    {
        id: 1,
        title: 'Beautiful Sunset',
        description: 'Experience the beauty of a breathtaking sunset by the beach.',
        imageUrl: 'https://via.placeholder.com/300x200',
        createdAt: '2024-12-27T08:00:00Z',
    },
    {
        id: 2,
        title: 'Mountain Adventure',
        description: 'Discover the thrill of hiking through stunning mountain trails.',
        imageUrl: 'https://via.placeholder.com/300x200',
        createdAt: '2024-12-27T08:00:00Z',
    },
    {
        id: 3,
        title: 'City Lights',
        description: 'Immerse yourself in the vibrant life of a bustling city.',
        imageUrl: 'https://via.placeholder.com/300x200',
        createdAt: '2024-12-27T08:00:00Z',
    },
];

const PopularPostCard = () => {
    return (
        <Card
            header={<Title>인기 게시글</Title>}
            data={dummyData}
        />
    )
}

export default PopularPostCard
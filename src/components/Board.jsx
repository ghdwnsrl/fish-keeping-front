import CardList from "./card/CardList.jsx";
import {useEffect, useState} from "react";
import useApiRequest from "../hooks/useApiRequest.js";
import {getPosts} from "../api/posts.js";
import Paginate from "./Paginate.jsx";
import SearchBar from "./SearchBar.jsx";

function Board({initialPage = 0, username, archiveName}) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPage, setTotalPage] = useState(0);
    const {execute: fetch} = useApiRequest(getPosts)
    useEffect(() => {
        fetch({params: currentPage, username, archiveName}, {
            onSuccess: response => {
                setData(response.data.content)
                setTotalPage(response.data.totalPages)
            },
            onError: (error) => {
                console.log('실패', error)
            }
        });
    }, []);

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };

    return (
        <>
            <CardList
                data={data}
                currentPage={currentPage}
            />
            <Paginate currentPage={currentPage} totalPage={totalPage} handlePageChange={handlePageChange}/>
            <SearchBar setData={setData} setTotalPage={setTotalPage}/>
        </>
    )
}

export default Board;
import CardList from "./card/CardList.jsx";
import {useEffect, useState} from "react";
import useApiRequest from "../hooks/useApiRequest.js";
import {getPosts} from "../api/posts.js";
import Paginate from "./Paginate.jsx";
import SearchBar from "./SearchBar.jsx";

function Board({initialPage = 0, username, archiveName, searchParams, moveToPage}) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPage, setTotalPage] = useState(0);
    const [condition, setCondition] = useState({
        type : searchParams ? searchParams.type : "title",
        keyword : searchParams ? searchParams.keyword : ""
    })
    const {execute: fetch} = useApiRequest(getPosts)

    useEffect(() => {
        fetch({params: currentPage, username, archiveName, searchParams:condition}, {
            onSuccess: response => {
                setData(response.data.content)
                setTotalPage(response.data.totalPages)
            },
            onError: (error) => {
                console.log('실패', error)
            }
        });
    }, [username,condition]);

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };

    const onSearchBarClickHandler = (value) => {
        if (moveToPage) {
            moveToPage(value)
            return
        }
        setCondition(value)
    }

    return (
        <>
            <CardList
                data={data}
                currentPage={currentPage}
            />
            { totalPage === 0 ?
                    <div>검색 결과가 없습니다.</div> :
                    <Paginate currentPage={currentPage} totalPage={totalPage} handlePageChange={handlePageChange}/>
            }
            <SearchBar condition={condition} setCondition={setCondition} onSearchBarClickHandler={onSearchBarClickHandler}/>
        </>
    )
}

export default Board;
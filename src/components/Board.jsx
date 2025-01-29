import CardList from "./card/CardList.jsx";
import {useState} from "react";
import {getPosts} from "../api/posts.js";
import Paginate from "./Paginate.jsx";
import SearchBar from "./SearchBar.jsx";
import {useSuspenseQuery} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

function Board({initialPage = 1 , username, archiveName, searchParams, children}) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const navigate = useNavigate();
    const [condition, setCondition] = useState({
        type: searchParams ? searchParams.type : "title",
        keyword: searchParams ? searchParams.keyword : ""
    })

    const {data} = useSuspenseQuery({
        queryKey: ['Posts', currentPage, username, archiveName, condition],
        queryFn: getPosts
    })

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected + 1);
        navigate(`?page=${selected + 1}`)
    };

    const onSearchBarClickHandler = (value) => {
        setCondition(value)
    }

    if (!data || data.totalPages === 0) {
        return <>
            <p className='text-center text-xl'>검색 결과가 없습니다.</p>
            <SearchBar condition={condition} setCondition={setCondition}
                       onSearchBarClickHandler={onSearchBarClickHandler}>
                {children}
            </SearchBar>
        </>
    }

    return <>
        <CardList
            data={data.content}
            currentPage={currentPage}
        />
        <Paginate currentPage={data.number} totalPage={data.pageable.totalPages} handlePageChange={handlePageChange}/>
        <SearchBar condition={condition} setCondition={setCondition}
                   onSearchBarClickHandler={onSearchBarClickHandler}>
            {children}
        </SearchBar>
    </>
}

export default Board;
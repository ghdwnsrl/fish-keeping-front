import CardList from "./card/CardList.jsx";
import {useState} from "react";
import {getPosts} from "../api/posts.js";
import Paginate from "./Paginate.jsx";
import SearchBar from "./SearchBar.jsx";
import {useSuspenseQuery} from "@tanstack/react-query";

function Board({initialPage, username, archiveName, searchParams, children, moveToPage}) {
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [condition, setCondition] = useState({
        type: searchParams ? searchParams.type : "title",
        keyword: searchParams ? searchParams.keyword : ""
    })

    const {data, isLoading} = useSuspenseQuery({
        queryKey: ['Posts', currentPage, username, archiveName, condition],
        queryFn: getPosts
    })

    const handlePageChange = ({selected}) => {
        setCurrentPage(selected);
    };

    // todo : 값 이상함
    const onSearchBarClickHandler = (value) => {
        if (moveToPage) {
            moveToPage(value)
            return
        }
        setCondition(value)
    }

    if (isLoading) {
        return <div>로딩 중...</div>;
    }

    if (!data || data.totalPages === 0) {
        return <>
            <div>검색 결과가 없습니다.</div>
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
        <Paginate currentPage={data.number} totalPage={data.totalPages} handlePageChange={handlePageChange}/>
        <SearchBar condition={condition} setCondition={setCondition}
                   onSearchBarClickHandler={onSearchBarClickHandler}>
            {children}
        </SearchBar>
    </>
}

export default Board;
import { useSearchParams } from "react-router-dom";
import Board from "../../components/Board.jsx";
import Title from "../../components/Title.jsx";
import {Suspense} from "react";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const searchParamsResult = {
        type: searchParams.get("type"),
        keyword: searchParams.get("keyword"),
    }
    const searchType = {
        TITLE: "제목",
        ALL: "제목 + 게시글",
        USERNAME: "작성자",
    };

    return (
        <div className='container'>
            <Title>{searchParamsResult.type} &#39;{searchParamsResult.keyword}&#39; 검색 결과</Title>
            <Suspense>
                <Board searchParams={searchParamsResult}>
                    <option value="title">{searchType.TITLE}</option>
                    <option value="all">{searchType.ALL}</option>
                    <option value="username">{searchType.USERNAME}</option>
                </Board>
            </Suspense>
        </div>
    )
}

export default SearchPage;
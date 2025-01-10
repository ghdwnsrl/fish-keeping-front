import { useSearchParams } from "react-router-dom";
import Board from "../../components/Board.jsx";
import Title from "../../components/Title.jsx";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const searchParamsResult = {
        type: searchParams.get("type"),
        keyword: searchParams.get("keyword"),
    }
    return (
        <div>
            <Title>&#39;{searchParamsResult.keyword} &#39; 검색 결과</Title>
            <Board searchParams={searchParamsResult}/>
        </div>
    )
}

export default SearchPage;
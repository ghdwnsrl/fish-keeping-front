import CardList from "./CardList.jsx";
import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";
import useApiRequest from "../hooks/useApiRequest.js";
import {getPosts} from "../api/posts.js";


function Board({initialPage = 0, username, archiveName}) {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(initialPage);
    const [totalPage, setTotalPage] = useState(0);
    const { execute : fetch } = useApiRequest(getPosts)
    useEffect( () => {
        fetch({params:currentPage, username, archiveName}, {
            onSuccess: response => {
                setData(response.data.content)
                setTotalPage(response.data.totalPages)
            }
        });
    }, [fetch, currentPage]);

    const handlePageChange = ({ selected }) => {
        setCurrentPage(selected);
        console.log('clicked..')
    };

    return (
        <>
            <CardList
                data={data}
                currentPage={currentPage}
            />
            <div>
                <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={totalPage}
                    marginPagesDisplayed={5}
                    pageRangeDisplayed={2}
                    onPageChange={handlePageChange}
                    containerClassName="flex justify-center gap-2 items-center text-xs"
                    activeClassName="bg-sky-800 text-white rounded-lg font-medium py-2"
                    pageLinkClassName="bg-transparent border border-sky-800 rounded-lg font-medium px-3 py-2"
                    previousLinkClassName="bg-sky-800 text-white lg:px-4 px-3 text-xs lg:text-base py-2 rounded-lg font-medium"
                    nextLinkClassName="bg-sky-800 text-white lg:px-4 px-3 text-xs lg:text-base py-2 rounded-lg font-medium"
                    disabledClassName="pointer-events-none opacity-50"
                />
            </div>
        </>
    )
}

export default Board;
import ReactPaginate from "react-paginate";

const Paginate = ({totalPage, currentPage, handlePageChange}) => {

    return <ReactPaginate
        previousLabel={"이전"}
        nextLabel={"다음"}
        breakLabel={"..."}
        breakClassName={"break-me"}
        pageCount={totalPage}
        marginPagesDisplayed={0}
        forcePage={currentPage}
        pageRangeDisplayed={10}
        onPageChange={handlePageChange}
        containerClassName="flex justify-center gap-2 items-center text-xs"
        activeClassName="bg-sky-800 text-white rounded-lg font-medium py-2"
        pageLinkClassName="bg-transparent border border-sky-800 rounded-lg font-medium px-3 py-2"
        previousLinkClassName="bg-sky-800 text-white lg:px-4 px-3 text-xs lg:text-base py-2 rounded-lg font-medium"
        nextLinkClassName="bg-sky-800 text-white lg:px-4 px-3 text-xs lg:text-base py-2 rounded-lg font-medium"
        disabledClassName="pointer-events-none opacity-50"
    />
}

export default Paginate;
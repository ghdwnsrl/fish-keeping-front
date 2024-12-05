import Board from "../components/Board.jsx";

function Home() {
    return (
        <div className='container' >
            <div className='w-full max-w-[100rem]'>
                <h1 className='font-bold text-2xl'>전체 게시글</h1>
                <Board/>
            </div>
        </div>
    )
}

export default Home;
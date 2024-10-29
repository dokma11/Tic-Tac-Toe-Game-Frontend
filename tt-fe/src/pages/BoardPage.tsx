import Board from "../components/Board.tsx";

function BoardPage() {
    return (<>
        <div className='justify-items-center mt-12'>
            <h1 className="text-3xl font-bold">Mulitplayer game</h1>
            <p className="text-lg mt-4">Your goal is simple: outsmart
                your opponent and claim victory. Good luck!</p>
        </div>
        <div className='justify-items-center mt-12'>
            <Board/>
        </div>
    </>);
}

export default BoardPage;

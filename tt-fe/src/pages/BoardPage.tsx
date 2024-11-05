import Board from "../components/Board.tsx";

function BoardPage() {
    return (<>
        <div className='justify-items-center mt-12 text-center'>
            <h1 className="text-3xl font-bold text-center">Mulitplayer game</h1>
            <p className="text-lg mt-4 text-center">Your goal is simple: outsmart
                your opponent and claim victory. Good luck!</p>
        </div>
        <div className='flex flex-col items-center justify-center mt-12'>
            <Board/>
        </div>
    </>);
}

export default BoardPage;

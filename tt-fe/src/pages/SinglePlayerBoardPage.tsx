import SinglePlayerBoard from "../components/SinglePlayerBoard.tsx";

function SinglePlayerBoardPage() {
    return (<>
        <div className='justify-items-center mt-12'>
            <h1 className="text-3xl font-bold">Single player game</h1>
            <p className="text-lg mt-4">Your goal is simple: outsmart
                the computer and claim victory. Good luck!</p>
        </div>
        <div className='justify-items-center mt-12'>
            <SinglePlayerBoard/>
        </div>
    </>);
}

export default SinglePlayerBoardPage;

import SinglePlayerBoard from "../components/SinglePlayerBoard.tsx";

function SinglePlayerBoardPage() {
    return (<>
        <div className='justify-items-center mt-12'>
            <h1>Nkei naslov za sp</h1>
            <p>Ovde mozda da stavim neko objasnjenje sa sp</p>
        </div>
        <div className='justify-items-center mt-12'>
            <SinglePlayerBoard/>
        </div>
    </>);
}

export default SinglePlayerBoardPage;

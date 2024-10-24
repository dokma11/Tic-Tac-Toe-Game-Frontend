import Board from "../components/Board.tsx";

// ovo je dakle stranica koja ce imati neke info ali najvaznije je da sadrzi samu tablu, unutar table vec ce biti polja
function BoardPage() {
    return (<>
        <div className='justify-items-center mt-12'>
            <h1>Nkei naslov</h1>
            <p>Ovde mozda da stavim neko objasnjenje</p>
        </div>
        <div className='justify-items-center mt-12'>
            <Board/>
        </div>
    </>);
}

export default BoardPage;

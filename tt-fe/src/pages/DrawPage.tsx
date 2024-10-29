import { useNavigate } from 'react-router-dom';

function DrawPage() {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate('/');
    };

    const handlePlayAgain = () => {
        navigate('/play');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-yellow-100 text-gray-800">
            <h1 className="text-6xl font-bold mb-10 -mt-64 text-yellow-600">Draw!</h1>
            <p className="text-lg mb-10">Looks like you've came across a worthy opponent! Next time show no mercy.</p>
            <div >
                <button
                    onClick={ handleReturnHome }
                    className="bg-yellow-600 text-white mr-3 px-6 py-3 rounded-md hover:bg-yellow-700 transition"
                >
                    Return Home
                </button>
                <button
                    onClick={ handlePlayAgain }
                    className="bg-yellow-600 text-white px-6 py-3 rounded-md hover:bg-yellow-700 transition"
                >
                    Play another game
                </button>
            </div>
        </div>
    );
}

export default DrawPage;

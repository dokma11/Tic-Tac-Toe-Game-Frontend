import { useNavigate } from 'react-router-dom';

function DefeatPage() {
    const navigate = useNavigate();

    const handleReturnHome = () => {
        navigate('/');
    };

    const handlePlayAgain = () => {
        navigate('/play');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-red-100 text-gray-800">
            <h1 className="text-6xl font-bold mb-10 -mt-64 text-red-600">Defeat!</h1>
            <p className="text-lg mb-10">Don't worry, you'll get them next time!</p>
            <div >
                <button
                    onClick={ handleReturnHome }
                    className="bg-red-600 text-white mr-3 px-6 py-3 rounded-md hover:bg-red-700 transition"
                >
                    Return Home
                </button>
                <button
                    onClick={ handlePlayAgain }
                    className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                >
                    Play another game
                </button>
            </div>
        </div>
    );
}

export default DefeatPage;

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
        <div className="flex flex-col items-center justify-center h-screen bg-green-100 text-gray-800">
            <h1 className="text-6xl font-bold mb-10 -mt-64 text-green-600">Win!</h1>
            <p className="text-lg mb-10">Congratulations! Hard work pays off right?</p>
            <div >
                <button
                    onClick={handleReturnHome}
                    className="bg-green-600 text-white mr-3 px-6 py-3 rounded-md hover:bg-red-700 transition"
                >
                    Return Home
                </button>
                <button
                    onClick={handlePlayAgain}
                    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition"
                >
                    Play another game
                </button>
            </div>
        </div>
    );
}

export default DefeatPage;

function RulesPage() {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-12">
            <div className="w-full max-w-3xl px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-center text-black mb-8">Tic Tac Toe Rules</h1>
                <div className="bg-white rounded-lg shadow-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Objective</h2>
                    <p className="text-gray-700 text-lg mb-6">
                        The objective of Tic Tac Toe is to be the first player to get three of your marks in a row
                        (either horizontally, vertically, or diagonally) on a 3x3 grid.
                    </p>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">How to Play</h2>
                    <ul className="list-disc list-inside text-lg text-gray-700 mb-6">
                        <li>Two players take turns to mark the spaces in a 3x3 grid.</li>
                        <li>Player 1 uses the symbol <strong>X</strong>, while Player 2 uses the symbol <strong>O</strong>.</li>
                        <li>Players take turns placing their mark in an empty square.</li>
                        <li>The first player to place three of their marks in a horizontal, vertical, or diagonal row wins the game.</li>
                        <li>If all nine squares are filled and no player has three marks in a row, the game ends in a tie.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Winning Combinations</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-center">
                            <p className="text-indigo-600 font-semibold">Row 1</p>
                            <p className="text-lg text-gray-700">Top row across</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-center">
                            <p className="text-indigo-600 font-semibold">Row 2</p>
                            <p className="text-lg text-gray-700">Middle row across</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-center">
                            <p className="text-indigo-600 font-semibold">Row 3</p>
                            <p className="text-lg text-gray-700">Bottom row across</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-center">
                            <p className="text-indigo-600 font-semibold">Column 1</p>
                            <p className="text-lg text-gray-700">Left column down</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-center">
                            <p className="text-indigo-600 font-semibold">Column 2</p>
                            <p className="text-lg text-gray-700">Middle column down</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-center">
                            <p className="text-indigo-600 font-semibold">Column 3</p>
                            <p className="text-lg text-gray-700">Right column down</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-center">
                            <p className="text-indigo-600 font-semibold">Diagonal 1</p>
                            <p className="text-lg text-gray-700">Top-left to bottom-right</p>
                        </div>
                        <div className="p-4 bg-gray-100 rounded-lg shadow-inner text-center">
                            <p className="text-indigo-600 font-semibold">Diagonal 2</p>
                            <p className="text-lg text-gray-700">Top-right to bottom-left</p>
                        </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Game End</h2>
                    <p className="text-lg text-gray-700">
                        The game ends when one player gets three in a row, or all squares are filled, resulting in a tie.
                        If there’s a tie, feel free to play again and see who wins the next round!
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RulesPage;

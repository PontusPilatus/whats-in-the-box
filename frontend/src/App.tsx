import React, { useState } from 'react';
import SquareGrid from './SquareGrid';

function App() {
  const [squares, setSquares] = useState<Array<{ color: string }>>([]);
  const squareSize = 60;
  const gap = 5;

  // Generate a random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Add a new square with a random color
  const createSquare = () => {
    setSquares([...squares, { color: getRandomColor() }]);
  };

  // Clear all squares
  const clearSquares = () => {
    setSquares([]);
  };

  // Fun messages for square count
  const getSquareCountMessage = (count: number) => {
    if (count === 1) return "Just one square at this party so far!";
    if (count <= 3) return `${count} colorful squares getting the party started!`;
    if (count <= 6) return `${count} squares dancing in a spiral!`;
    if (count <= 10) return `Wow! ${count} squares partying hard!`;
    if (count <= 15) return `${count} squares?! This party is hopping!`;
    if (count <= 20) return `${count} squares! The dance floor is packed!`;
    return `${count} squares! 🎉 This is the hottest party in town!`;
  };

  return (
    <div className="text-center min-h-screen flex flex-col font-sans">
      <header className="bg-gradient-to-r from-indigo-500 to-purple-500 py-6 shadow-md">
        <h1 className="m-0 text-4xl text-white font-bold">
          Block Party
        </h1>
        <p className="mt-2 text-sm text-slate-200">
          Where colorful squares dance in a spiral!
        </p>
      </header>

      <main className="flex-grow p-8 flex flex-col items-center bg-slate-50">
        <div className="mb-5 flex gap-4 justify-center flex-wrap">
          <button
            className="px-4 py-3 w-40 rounded-lg text-white font-medium border-none shadow bg-green-500 cursor-pointer transition duration-200 flex items-center justify-center hover:bg-green-600"
            onClick={createSquare}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            One more!
          </button>
          <button
            className="px-4 py-3 w-40 rounded-lg text-white font-medium border-none shadow bg-red-500 cursor-pointer transition duration-200 flex items-center justify-center hover:bg-red-600"
            onClick={clearSquares}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Clear all
          </button>
        </div>

        {squares.length > 0 ? (
          <div className="w-full max-w-4xl">
            <p className="text-lg text-center mb-6 text-gray-700 font-medium">
              {getSquareCountMessage(squares.length)}
            </p>
            <SquareGrid squares={squares} squareSize={squareSize} gap={gap} />
          </div>
        ) : (
          <div className="text-center p-10 max-w-md mx-auto">
            <div className="bg-indigo-50 rounded-xl p-8 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">No blocks yet!</h2>
              <p className="text-gray-600 mb-4">
                Click the "One more!" button to start creating your colorful spiral pattern.
              </p>
              <button
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200 shadow-sm"
                onClick={createSquare}
              >
                Get started
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className="py-4 text-center text-gray-600 bg-gray-100 text-sm">
        <p>Made with Tailwind CSS</p>
      </footer>
    </div>
  );
}

export default App;

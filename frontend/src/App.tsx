import React, { useState, useEffect } from 'react';
import SquareGrid from './SquareGrid';

function App() {
  const [squares, setSquares] = useState<Array<{ color: string; originalColor?: string }>>([]);
  const [discoMode, setDiscoMode] = useState<boolean>(false);
  const squareSize = 60;
  const gap = 5;
  const discoThreshold = 25; // Show disco mode button after this many squares

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
    const newColor = getRandomColor();
    setSquares([...squares, { color: newColor, originalColor: newColor }]);
  };

  // Clear all squares
  const clearSquares = () => {
    setSquares([]);
    setDiscoMode(false);
  };

  // Toggle disco mode
  const toggleDiscoMode = () => {
    setDiscoMode(!discoMode);
  };

  // Disco mode effect - change square colors periodically
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (discoMode && squares.length > 0) {
      interval = setInterval(() => {
        setSquares(squares.map(square => ({
          ...square,
          color: getRandomColor(),
          originalColor: square.originalColor || square.color
        })));
      }, 500);
    } else if (!discoMode && squares.length > 0) {
      // Restore original colors when disco mode is turned off
      setSquares(squares.map(square => ({
        ...square,
        color: square.originalColor || square.color
      })));
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [discoMode, squares.length]);

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
    <div className={`text-center min-h-screen flex flex-col font-sans ${discoMode ? 'bg-gray-900 text-white' : ''}`}>
      <header className={`bg-gradient-to-r ${discoMode ? 'from-purple-900 to-pink-800' : 'from-indigo-500 to-purple-500'} py-6 shadow-md transition-colors duration-500`}>
        <h1 className="m-0 text-4xl text-white font-bold">
          Block Party
        </h1>
        <p className="mt-2 text-sm text-slate-200">
          Where colorful squares dance in a spiral!
        </p>
      </header>

      <main className={`flex-grow p-8 flex flex-col items-center transition-colors duration-500 ${discoMode ? 'bg-gray-900' : 'bg-slate-50'}`}>
        <div className="mb-5 flex gap-4 justify-center flex-wrap">
          <button
            className="px-4 py-3 w-40 rounded-lg text-white font-medium border-none shadow-md bg-green-500 cursor-pointer transition duration-200 flex items-center justify-center hover:bg-green-600 hover:shadow-lg transform hover:-translate-y-1"
            onClick={createSquare}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            One more!
          </button>
          <button
            className="px-4 py-3 w-40 rounded-lg text-white font-medium border-none shadow-md bg-red-500 cursor-pointer transition duration-200 flex items-center justify-center hover:bg-red-600 hover:shadow-lg transform hover:-translate-y-1"
            onClick={clearSquares}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Clear all
          </button>
        </div>

        {squares.length > 0 ? (
          <div className={`w-full max-w-4xl ${discoMode ? 'text-white' : 'text-gray-700'}`}>
            <p className={`text-lg text-center mb-6 font-medium ${discoMode ? 'text-white' : 'text-gray-700'}`}>
              {getSquareCountMessage(squares.length)}
              {discoMode && " 🎵 Disco time! 🎵"}
            </p>
            <SquareGrid squares={squares} squareSize={squareSize} gap={gap} />

            {squares.length >= discoThreshold && (
              <div className="mt-8 flex justify-center">
                <button
                  className={`px-6 py-4 rounded-lg text-white font-medium border-none shadow-md cursor-pointer transition duration-300 flex items-center justify-center transform hover:-translate-y-1 hover:shadow-lg ${discoMode ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-purple-600 hover:bg-purple-700'} ${!discoMode && 'animate-pulse'}`}
                  onClick={toggleDiscoMode}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                  </svg>
                  <span className="text-lg">
                    {discoMode ? 'Lights On' : 'Turn On Disco Mode!'}
                  </span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center p-10 max-w-md mx-auto">
            <div className={`${discoMode ? 'bg-gray-800' : 'bg-indigo-50'} rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300`}>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-16 w-16 mx-auto ${discoMode ? 'text-purple-400' : 'text-indigo-400'} mb-4`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
              </svg>
              <h2 className={`text-xl font-bold ${discoMode ? 'text-white' : 'text-gray-800'} mb-2`}>No blocks yet!</h2>
              <p className={`${discoMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                Click the "One more!" button to start creating your colorful spiral pattern.
              </p>
              <button
                className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                onClick={createSquare}
              >
                Get started
              </button>
            </div>
          </div>
        )}
      </main>

      <footer className={`py-6 text-center ${discoMode ? 'bg-gradient-to-r from-purple-900 to-pink-800' : 'bg-gradient-to-r from-indigo-500 to-purple-500'} text-white transition-colors duration-500`}>
        <div className="flex items-center justify-center gap-2 text-sm">
          <span>Made with</span>
          <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${discoMode ? 'text-pink-300 animate-pulse' : 'text-red-300'}`} viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
          </svg>
          <span>for all square lovers out there</span>
        </div>
        <p className="mt-1 text-xs text-slate-200">Squares deserve to be colorful too!</p>
        {discoMode && (
          <p className="mt-1 text-xs text-pink-300 animate-bounce">✨ Let's dance! ✨</p>
        )}
      </footer>
    </div>
  );
}

export default App;

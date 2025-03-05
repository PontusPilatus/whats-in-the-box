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

  // Common button style
  const buttonStyle = {
    padding: '12px 16px',
    width: '160px',
    borderRadius: '8px',
    color: 'white',
    fontWeight: '500',
    border: 'none',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    transition: 'all 0.2s',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
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
    <div style={{ textAlign: 'center', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif' }}>
      <header style={{
        background: 'linear-gradient(90deg, #6366F1 0%, #8B5CF6 100%)',
        padding: '24px 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ margin: 0, fontSize: '2.2rem', color: 'white', fontWeight: 'bold' }}>
          Block Party
        </h1>
        <p style={{ marginTop: '8px', fontSize: '0.95rem', color: '#E2E8F0' }}>
          Where colorful squares dance in a spiral!
        </p>
      </header>

      <main style={{
        flexGrow: 1,
        padding: '32px 16px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#F7FAFC'
      }}>
        <div style={{
          marginBottom: '20px',
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          flexWrap: 'wrap'
        }}>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: '#48BB78',
            }}
            onClick={createSquare}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px', marginRight: '8px' }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            One more!
          </button>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: '#F56565',
            }}
            onClick={clearSquares}
          >
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: '20px', width: '20px', marginRight: '8px' }} viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Enough!
          </button>
        </div>

        {squares.length > 0 && (
          <div style={{ color: '#4A5568', marginBottom: '10px', fontSize: '0.875rem', fontWeight: '500' }}>
            {getSquareCountMessage(squares.length)}
          </div>
        )}

        <div style={{ padding: '0 20px' }}>
          <SquareGrid
            squares={squares}
            squareSize={squareSize}
            gap={gap}
          />
        </div>
      </main>

      <footer style={{
        backgroundColor: '#4A4E69',
        color: '#CBD5E0',
        padding: '16px',
        fontSize: '0.75rem'
      }}>
        <p>Keep the party going! 🎉</p>
      </footer>
    </div>
  );
}

export default App;

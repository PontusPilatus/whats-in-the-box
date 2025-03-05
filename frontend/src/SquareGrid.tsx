import React, { useState } from 'react';

interface SquareGridProps {
  squares: { color: string }[];
  squareSize: number;
  gap: number;
}

const SquareGrid: React.FC<SquareGridProps> = ({ squares, squareSize, gap }) => {
  const [activeSquare, setActiveSquare] = useState<number | null>(null);

  // Calculate positions of each square based on the layer pattern
  const calculateSquarePositions = () => {
    // Initialize positions array
    const positions: { x: number; y: number }[] = [];

    if (squares.length === 0) return positions;

    // First square is always at 0,0
    positions.push({ x: 0, y: 0 });

    // Handle the rest of the squares
    let currentLayerSize = 1; // Size of the first layer is 1x1
    let squaresPlaced = 1;

    while (squaresPlaced < squares.length) {
      // New layer dimensions
      const newLayerSize = currentLayerSize + 1;

      // Place squares on the right edge (top to bottom)
      for (let y = 0; y < currentLayerSize && squaresPlaced < squares.length; y++) {
        positions.push({ x: currentLayerSize, y });
        squaresPlaced++;
      }

      // Place squares on the bottom edge (right to left)
      for (let x = currentLayerSize; x >= 0 && squaresPlaced < squares.length; x--) {
        positions.push({ x, y: currentLayerSize });
        squaresPlaced++;
      }

      // Update for next layer
      currentLayerSize = newLayerSize;
    }

    return positions;
  };

  const positions = calculateSquarePositions();

  if (squares.length === 0) {
    return (
      <div style={{
        padding: '20px',
        color: '#6366F1',
        fontStyle: 'italic',
        textAlign: 'center',
        marginTop: '20px'
      }}>
        This party needs some guests! Click "One more!" to invite some blocks!
      </div>
    );
  }

  // Find the maximum x and y values to determine the actual size needed
  const getActualSize = () => {
    if (positions.length === 0) return { width: 0, height: 0 };

    let maxX = 0;
    let maxY = 0;

    positions.forEach(pos => {
      maxX = Math.max(maxX, pos.x);
      maxY = Math.max(maxY, pos.y);
    });

    // Add 1 because positions are 0-indexed
    return {
      width: (maxX + 1) * (squareSize + gap) - gap,
      height: (maxY + 1) * (squareSize + gap) - gap
    };
  };

  const { width, height } = getActualSize();

  return (
    <div
      style={{
        position: 'relative',
        margin: '0 auto',
        width: `${width}px`,
        height: `${height}px`,
        marginTop: '10px'
      }}
    >
      {squares.map((square, index) => {
        const position = positions[index] || { x: 0, y: 0 };
        const isActive = activeSquare === index;

        return (
          <div
            key={index}
            style={{
              backgroundColor: square.color,
              width: `${squareSize}px`,
              height: `${squareSize}px`,
              position: 'absolute',
              left: `${position.x * (squareSize + gap)}px`,
              top: `${position.y * (squareSize + gap)}px`,
              borderRadius: '8px',
              boxShadow: isActive
                ? '0 10px 25px rgba(0, 0, 0, 0.2)'
                : '0 4px 6px rgba(0, 0, 0, 0.1)',
              transform: isActive ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s ease-in-out',
              zIndex: isActive ? 20 : 'auto',
              cursor: 'pointer'
            }}
            onClick={() => setActiveSquare(isActive ? null : index)}
            onMouseEnter={() => !isActive && setActiveSquare(index)}
            onMouseLeave={() => !isActive && setActiveSquare(null)}
          >
            <div style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: isActive ? 1 : 0,
              transition: 'opacity 0.2s'
            }}>
              <span style={{
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                fontSize: '0.75rem',
                padding: '4px 8px',
                borderRadius: '9999px'
              }}>
                #{index + 1}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SquareGrid; 
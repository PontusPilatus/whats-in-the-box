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

  // Calculate the actual size needed for the container
  const getActualSize = () => {
    if (positions.length === 0) return { width: 0, height: 0 };

    let maxX = 0;
    let maxY = 0;

    // Find the maximum coordinates
    for (const position of positions) {
      if (position.x > maxX) maxX = position.x;
      if (position.y > maxY) maxY = position.y;
    }

    // Calculate the actual dimensions
    const width = (maxX + 1) * (squareSize + gap) - gap;
    const height = (maxY + 1) * (squareSize + gap) - gap;

    return { width, height };
  };

  const { width, height } = getActualSize();

  return (
    <div className="w-full flex justify-center pt-8">
      <div
        className="relative"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {squares.map((square, index) => {
          const position = positions[index];
          const isActive = activeSquare === index;

          return (
            <div
              key={index}
              className={`absolute rounded-lg shadow transition-all duration-300 ease-in-out cursor-pointer
                        ${isActive ? 'shadow-xl z-20 scale-110' : 'shadow-md z-10 scale-100'}`}
              style={{
                backgroundColor: square.color,
                width: `${squareSize}px`,
                height: `${squareSize}px`,
                left: `${position.x * (squareSize + gap)}px`,
                top: `${position.y * (squareSize + gap)}px`,
              }}
              onClick={() => setActiveSquare(isActive ? null : index)}
              onMouseEnter={() => !isActive && setActiveSquare(index)}
              onMouseLeave={() => !isActive && setActiveSquare(null)}
            >
              <div
                className={`w-full h-full flex items-center justify-center transition-opacity duration-200
                         ${isActive ? 'opacity-100' : 'opacity-0'}`}
              >
                <span className="bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
                  #{index + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SquareGrid; 
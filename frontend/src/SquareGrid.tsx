import React, { useState } from 'react';
import { calculateSquarePositions, Square } from './utils';

interface SquareGridProps {
  squares: Square[];
  squareSize: number;
  gap: number;
}

const SquareGrid: React.FC<SquareGridProps> = ({ squares, squareSize, gap }) => {
  const [activeSquare, setActiveSquare] = useState<number | null>(null);
  const [clickedSquare, setClickedSquare] = useState<number | null>(null);

  const positions = calculateSquarePositions(squares.length);

  if (squares.length === 0) {
    return (
      <div className="text-center py-8 text-indigo-600 italic">
        This party needs some guests! Click "BOOM! New Block" to invite some blocks!
      </div>
    );
  }

  // Calculate the required container dimensions based on square positions
  const getActualSize = () => {
    if (positions.length === 0) return { width: 0, height: 0 };

    let maxX = 0;
    let maxY = 0;

    for (const position of positions) {
      if (position.x > maxX) maxX = position.x;
      if (position.y > maxY) maxY = position.y;
    }

    const width = (maxX + 1) * (squareSize + gap) - gap;
    const height = (maxY + 1) * (squareSize + gap) - gap;

    return { width, height };
  };

  const { width, height } = getActualSize();

  const handleSquareClick = (index: number) => {
    if (clickedSquare === index) {
      setClickedSquare(null);
    } else {
      setClickedSquare(index);
    }
  };

  return (
    <div className="w-full flex justify-center pt-8">
      <div
        className="relative"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {squares.map((square, index) => {
          const position = positions[index];
          // A square is active if it's either being hovered over or clicked
          const isActive = activeSquare === index || clickedSquare === index;

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
              onClick={() => handleSquareClick(index)}
              onMouseEnter={() => setActiveSquare(index)}
              onMouseLeave={() => setActiveSquare(null)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SquareGrid; 
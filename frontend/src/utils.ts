// Common utility functions for the app

// Common interfaces
export interface Square {
  color: string;
  originalColor?: string;
}

export interface SquareState {
  squares: Square[];
}

// Calculates positions of squares in a spiral pattern
export const calculateSquarePositions = (squareCount: number) => {
  const positions: { x: number; y: number }[] = [];

  if (squareCount === 0) return positions;

  // First square is always at 0,0
  positions.push({ x: 0, y: 0 });

  let currentLayerSize = 1;
  let squaresPlaced = 1;

  while (squaresPlaced < squareCount) {
    const newLayerSize = currentLayerSize + 1;

    // Place squares on the right edge (top to bottom)
    for (let y = 0; y < currentLayerSize && squaresPlaced < squareCount; y++) {
      positions.push({ x: currentLayerSize, y });
      squaresPlaced++;
    }

    // Place squares on the bottom edge (right to left)
    for (let x = currentLayerSize; x >= 0 && squaresPlaced < squareCount; x--) {
      positions.push({ x, y: currentLayerSize });
      squaresPlaced++;
    }

    currentLayerSize = newLayerSize;
  }

  return positions;
};

// Calculates Manhattan distance between two points
export const calculateDistance = (pos1: { x: number; y: number }, pos2: { x: number; y: number }): number => {
  return Math.abs(pos1.x - pos2.x) + Math.abs(pos1.y - pos2.y);
};

// Finds adjacent squares (distance = 1) for a given square
export const getAdjacentSquares = (index: number, positions: { x: number; y: number }[]): number[] => {
  if (!positions[index]) return [];

  const currentPos = positions[index];
  const adjacentIndices: number[] = [];

  positions.forEach((pos, idx) => {
    if (idx !== index) {
      const distance = calculateDistance(currentPos, pos);
      if (distance === 1) {
        adjacentIndices.push(idx);
      }
    }
  });

  return adjacentIndices;
};

// Generates a random hex color
export const generateRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Generates a random color different from the given colors
export const generateDifferentColor = (avoidColors: string[]): string => {
  let color;
  let attempts = 0;
  const maxAttempts = 20; // Prevent infinite loops

  do {
    color = generateRandomColor();
    attempts++;

    if (attempts > maxAttempts) break;

  } while (avoidColors.includes(color));

  return color;
};

// API Utilities
interface FetchOptions {
  method?: string;
  body?: any;
  headers?: Record<string, string>;
}

/**
 * Make an API request with timeout handling
 */
export const apiRequest = async <T>(
  url: string,
  options: FetchOptions = {},
  timeout: number = 5000,
  errorMessage: string = 'API request failed'
): Promise<T> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const headers = {
      ...(options.body ? { 'Content-Type': 'application/json' } : {}),
      ...options.headers
    };

    const response = await fetch(url, {
      method: options.method || 'GET',
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`${errorMessage} (Status: ${response.status})`);
    }

    // Only try to parse JSON if we expect a response body
    if (options.method === 'DELETE') {
      return {} as T; // DELETE usually doesn't return content
    }

    return await response.json();
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.error(`Request timed out after ${timeout}ms: ${url}`);
      throw new Error(`Request timed out after ${timeout}ms`);
    }

    console.error(`API request failed: ${error.message}`);
    throw error;
  }
}; 
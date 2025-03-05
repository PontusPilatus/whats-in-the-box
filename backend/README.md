# Block Party Backend API

This is the .NET/C# backend for the Block Party application. It provides an API for storing and retrieving square data.

## Requirements

- .NET 8.0 or higher
- ASP.NET Core Runtime

## Getting Started

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Ensure you have the Data directory:
   ```
   mkdir -p Data
   ```

3. Run the application:
   ```
   dotnet run
   ```

4. The API will be available at https://localhost:7107 and http://localhost:5024

## API Endpoints

### GET /api/Square
Returns all squares saved in the system.

### POST /api/Square
Saves the entire squares state.

### POST /api/Square/add
Adds a new square to the existing collection.

### DELETE /api/Square
Clears all squares from the system.

## How It Works

The API stores square data in a JSON file located at `Data/squareState.json`. This file is automatically created when the application starts if it doesn't exist.

Each square has a color property and an optional originalColor property (used for disco mode).

The frontend application communicates with this API to save squares when they are created and to retrieve the saved state when the page loads. 
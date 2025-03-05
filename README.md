# 🎉 BLOCK PARTY 🎉

*Where colorful squares dance in a spiral!*

## What's This All About?

Welcome to the hottest shindig in town! Block Party is where colorful squares come to hang out, mingle, and arrange themselves in a funky spiral pattern. No square is too square for this party!

## 🎮 How to Join the Fun

1. Click **"BOOM! New Block"** to invite a colorful square to the party
2. Watch as each new guest finds their perfect spot in the spiral
3. Click on any square to make it pop and see its party number
4. Had enough fun? Click **"ZAP! All Gone"** to clear the dance floor
5. Once you've got 25+ squares, unlock **"DISCO FEVER"** mode for extra wildness!

## 🌈 Features That Make This Party Rock

- **Dazzling Colors**: Every square brings its own unique color to the party
- **Spiral Formation**: Squares arrange themselves in an eye-catching spiral
- **Interactive Fun**: Hover and click on squares to see them groove
- **Party Stats**: Fun messages keep you updated on how lit the party is!
- **Offline Mode**: The party never stops - even when you lose connection to the backend!

## 🔧 Tech Stuff (Because Even Parties Need Structure)

This project is built with:
- React
- TypeScript
- Tailwind CSS for styling
- A whole lot of good vibes

## 🚀 Getting Started

```bash
# Clone the party venue
git clone https://github.com/yourusername/whats-in-the-box.git

# Head to the party
cd whats-in-the-box

# Install the party supplies
npm install

# Start the music
npm start
```

## 🎨 Why a Block Party?

Because life's too short for boring squares arranged in boring grids! Our blocks know how to party in a spiral, showing that even the simplest shapes can create something mesmerizing when they come together.

## 👩‍💻 Who's Hosting This Party?

This fun little project was created with love and a healthy dose of whimsy. Feel free to fork it, contribute to it, or just enjoy watching the squares dance!

---

*Remember: Every party needs more squares! Keep clicking "BOOM! New Block" until the dance floor is packed!*

# Block Party

A fun interactive application where colorful squares dance in a spiral pattern. Built with React for the frontend and .NET/C# for the backend.

## Features

- Add colorful squares with a click
- Watch them arrange in a spiral pattern
- Hover effects for interaction
- Disco mode (unlocks after 25 squares)
- Persistence via backend API
- Offline mode support - works even without backend connection

## Tech Stack

### Frontend
- React with TypeScript
- Tailwind CSS for styling
- Modern React hooks and patterns
- Graceful degradation for offline use

### Backend
- .NET 8.0 / C# Web API
- File-based persistence using JSON
- RESTful API design

## Running the Application

### Prerequisites
- Node.js and npm for the frontend
- .NET 8.0 SDK for the backend

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Create the data directory:
   ```
   mkdir -p Data
   ```
3. Run the .NET API:
   ```
   dotnet run
   ```
4. The API will be available at https://localhost:7107

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. The application will be available at http://localhost:3000

## How It Works

- When you click "BOOM! New Block", a new square with a random color is created
- The square's position and color are sent to the backend API for storage
- When the page is refreshed, the application retrieves the previously saved state
- Squares are arranged in a spiral pattern, calculated based on their position in the sequence
- After adding 25 squares, you unlock disco mode, which makes the squares flash with different colors
- If the backend is unavailable, the app will switch to offline mode and continue to function

## Project Structure

- `/frontend` - React frontend application
- `/backend` - .NET/C# backend API

*Remember: Every party needs more squares! Keep clicking "BOOM! New Block" until the dance floor is packed!* 
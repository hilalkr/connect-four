# Connect Four Game Documentation
## Overview
This documentation outlines our Connect Four game, a digital adaptation of the classic two-player strategy game, realized through React. Designed for ease of use and engaging play, our version features a straightforward 6x7 grid interface where players alternate turns to connect four of their own discs in a row, either horizontally, vertically, or diagonally. The game incorporates a simple yet powerful AI for single-player experiences and provides a responsive design for cross-platform compatibility. This guide serves as a comprehensive resource for installation, gameplay, and feature overview, ensuring a smooth user experience.

This document provides a comprehensive overview of the Connect Four game developed using React. The game features a 6x7 grid where two players - a human player and an AI (computer) opponent - take turns to drop colored discs into a vertically suspended board. The first player to form a horizontal, vertical, or diagonal line of four discs wins the game.

## Table of Contents
1. [Introduction](#introduction)
2. [Installation](#installation)
3. [Quick Start](#quick-start)
4. [Features](#features)
5. [Components](#components)
   - [AlertModal](#alertmodal)
   - [GameBoard](#gameboard)
   - [GameCreationScreen](#gamecreationscreen)
   - [GameProvider](#gameprovider)
   - [GameScreen](#gamescreen)
   - [ListOfGamesScreen](#listofgamesscreen)
6. [Context](#context)
7. [Server](#server)
   - [AI Logic](#ai-logic)
8. [Scripts](#scripts)
   - [Starting the Development Server](#starting-the-development-server)
   - [Building for Production](#building-for-production)
   - [Running Tests](#running-tests)
9. [Deployment](#deployment)
10. [Future Enhancements](#future-enhancements)
11. [Acknowledgements](#acknowledgements)
12. [License](#license)



### 2. Installation
**Prerequisites**
- Node.js installed on your machine.
- An OpenAI API key if you're using OpenAI services.
**Server Setup**
1. Clone the Repository (if applicable): Clone or download the project repository to your local machine.

2. Navigate to Server Directory: Open a terminal and navigate to the server directory of your project. This is typically where your package.json file for the server is located.

3. Install Dependencies:

```bash
npm install
```
  - This will install all the required Node.js packages for the client-side.

4. Set up Environment Variables:
- Create a .env file in your server directory.
- Add your OpenAI API key:

```makefile
OPENAI_API_KEY=your_openai_api_key_here
```
5. Start the Client:

```bash
npm start
```
 - This command will start the React application, usually available at localhost:3000.
 

### Introduction

Introducing our Connect Four game: a digital twist on the popular board game, brought to life with the versatile React framework. This project transforms the familiar game of strategy into an interactive online experience, accessible to anyone, anywhere.

At the heart of this game is a simple yet powerful user interface, designed for clarity and ease of use. Players will find themselves immediately at home with the intuitive layout and smooth gameplay. Behind the scenes, React's efficient update and render capabilities ensure that the game feels responsive and lively.

This document sets out everything you need to know to understand the logic of the game and move into the development phase of the game.  It's a resource for developers, providing insights into game mechanics as well as technical fundamentals. Whether you want to play a quick match or improve your React skills by exploring the codebase, with this guide, Connect Four is easy to access and understand.


 ### Quick Start
Get the Connect Four game up and running on your local machine in just a few simple steps. This guide assumes a basic familiarity with using a command line interface and having Node.js installed on your computer.

Step 1: Clone the Repository
First, you need to get the code onto your machine. You can do this by cloning the repository from GitHub. Open your command line interface (CLI) and run:

```bash
git clone https://github.com/your-username/connect-four.git
```

Step 2: Install Dependencies
Navigate to the directory where you cloned the project:

```bash
cd connect-four
```

Now, install all the necessary dependencies for the game to run. Execute:


```bash
npm install
```

This command reads the package.json file in the project and installs all the required Node.js packages.

Step 3: Start the Game Server
After successfully installing the dependencies, you're ready to start the game server. Run:

```bash
npm start
```


This command starts a development server and usually opens the game in your default web browser. If it doesn't open automatically, you can manually access it by typing http://localhost:3000 in your browser's address bar.

Step 4: Play the Game

Once the game interface loads in your browser, you're ready to play! The game's UI is intuitive, allowing you to begin playing Connect Four immediately. If you're playing against the AI, it will automatically take its turn after you place your disc.

 ### Features
 The Connect Four game is a sophisticated embodiment of the classic board game, meticulously engineered to enrich the user experience with a suite of modern features. Below is a detailed exposition of its salient characteristics:

 1.  Customization
 - **Personalized Themes**: Players can choose from a variety of themes to personalize the visual aspect of the game board.

 2. Real-Time Interaction
 - **Instant Move Reflection**: Moves are updated and reflected in real-time, providing an immediate and synchronous game flow.

3. Intuitive Gameplay
- **Simple yet Engaging**: The game's rules are easy to grasp – connect four discs in a row to win. This simplicity makes it accessible for players of all ages while still offering strategic depth.

4. Customizable Settings
- **Personalized Game Options**: Players can choose their disc colors and set board dimensions, allowing for a more personalized gameplay experience.
Game History Tracking: The game keeps track of past sessions, allowing players to review their game history.

5. Developer-Friendly Structure
- **Modular Codebase**:The game's code is organized into distinct components, making it easier for developers to understand, maintain, and extend.
- **Comprehensive Documentation**: Extensive comments and documentation are provided within the code, guiding developers through the game's architecture and logic.

### Components

##### AlertModal.js
`AlertModal` is a reusable modal component that displays custom content passed as children. It is conditionally rendered based on the `show` prop, allowing it to appear over other content when necessary. The modal is designed with a fixed position and a high z-index to ensure it's prominently visible. It also includes a 'Close' button, which triggers the `onClose` callback, allowing for the modal to be dismissed.

#### GameBoard

`GameBoard` represents the central game logic and UI for the Connect Four game. It manages the state of the game board, the current player, and whether the game has ended. The component renders a grid based on the rows and columns state and handles disc placement with the `placeDisc` function. It uses a series of checks to determine if the game has a winner after each move with `checkForWinner`, and updates the game state accordingly. It also integrates with a server-side AI for move selection in a single-player game.

#### GameCreationScreen

`GameCreationScreen` allows players to set up a new game session. It provides form inputs to enter a game name and select a background color for the game board. Upon submission, it uses the `GameContext` to add a new game and redirects the user to the game screen for the newly created game using the `useNavigate` hook from React Router.

#### GameProvider

`GameProvider` is a context provider that encapsulates the state and logic for managing multiple game sessions. It maintains a list of games, handles the addition of new games, and updates the status of existing games. This state is persisted to `localStorage` to maintain state across page refreshes. The provider exposes this state and functionality through the `GameContext`, allowing other components in the application to access and manipulate the list of games.

#### GameScreen

`GameScreen` is the component responsible for rendering an individual game's interface. It retrieves the game's details from `GameContext` based on the game ID from the URL parameters. It manages the display of the current player and the game result using local state. `GameScreen` renders the `GameBoard` and `AlertModal` components, passing down the necessary props and callbacks to handle game completion and player change events.

#### ListOfGamesScreen

`ListOfGamesScreen` displays a list of all past completed games retrieved from the `GameContext`. It filters the games to only show those with a status of 'completed' and presents them in a list format, showing details such as the game name, date/time, winner, and loser.

#### GameContext

GameContext creates a React Context, which is a way to pass data through the component tree without having to pass props down manually at every level. In the context of this game, GameContext is used to manage and distribute the state of multiple game sessions throughout the application.

**Key Functionalities** 
- State Management: GameProvider maintains the state of all game sessions, including their status, players involved, and outcomes. This state is initialized from the browser's local storage to persist data across sessions.

- Adding New Games: The addGame function is used to create a new game session. It assigns a unique identifier, captures the current date and time, and sets initial values for the game's status, winner, and loser. The new game is then added to the state and stored in local storage.

- Updating Game Status: The updateGameStatus function allows for updating the status of a game (e.g., ongoing, completed), as well as setting the winner and loser as the game concludes. The game's data is then updated in both the state and local storage.


### Server
The server component of the Connect Four game is a crucial piece of the architecture, particularly responsible for the AI logic. It is designed to interact with OpenAI's API to determine the best moves for the AI opponent during gameplay.


#### AI Logic

**Key Components**
- Server Setup (server/index.js): The server is built using Express, a popular Node.js web application framework. The server configuration includes CORS (Cross-Origin Resource Sharing) settings to allow requests from the specified frontend (http://localhost:3000), and it uses JSON for data handling. The server listens on a configurable port, defaulting to 5000 if not specified.

- AI Route (server/routes/ai.js): This file defines an endpoint /get-ai-move for the AI logic. It uses the express.Router to handle incoming POST requests that contain the game's current state.

**AI Logic**

- Game State Analysis: Upon receiving the game state in a POST request, the server constructs a prompt for the OpenAI API. The prompt includes the current game board state, where '+' indicates the player's moves, 'O' the AI's moves, and '-' the empty spaces.

- OpenAI Integration: The server interacts with OpenAI's GPT-3.5-turbo model to analyze the game state and determine the optimal move for the AI. The configuration for the API call includes specifying the model, setting the temperature (which affects the randomness of the response), and limiting the response length.

- Response Handling: The response from the OpenAI API is parsed to extract the AI's chosen move, which is then sent back to the client. This move is the column index where the AI has decided to place its disc.

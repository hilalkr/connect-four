# Connect Four Game Documentation
## Overview
This documentation outlines our Connect Four game, a digital adaptation of the classic two-player strategy game, realized through React. Designed for ease of use and engaging play, our version features a straightforward 6x7 grid interface where players alternate turns to connect four of their own discs in a row, either horizontally, vertically, or diagonally. The first player to form a horizontal, vertical, or diagonal line of four discs wins the game. The game incorporates a simple yet powerful AI for single-player experiences and provides a responsive design for cross-platform compatibility. This guide serves as a comprehensive resource for installation, gameplay, and feature overview, ensuring a smooth user experience.

## Table of Contents
1. [Installation](#installation)
2.  [Project Structure](#project-structure)
3. [Quick Start](#quick-start)
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

8. Contact



### Installation
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
  - Navigate to the root directory of the project to install client-side dependencies:

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
 
### Project Structure

```plaintext
connect-four-hilal/
├── public/
│   └── index.html 
├── src/
│   ├── components/
│   │   ├── AlertModal.js
│   │   ├── GameBoard.js
│   │   ├── GameCreationScreen.js
│   │   ├── GameProvider.js
│   │   ├── GameScreen.js
│   │   └── ListOfGamesScreen.js
│   ├── context/
│   │   └── GameContext.js
│   ├── App.js
│   └── index.js
├── server/
│   ├── routes/
│   │   └── ai.js
│   └── index.js
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```



 ### Quick Start
Get the Connect Four game up and running on your local machine in just a few simple steps. This guide assumes a basic familiarity with using a command line interface and having Node.js installed on your computer.

Step 1: Clone the Repository
First, you need to get the code onto your machine. You can do this by cloning the repository from GitHub. Open your command line interface (CLI) and run:

```bash
git clone https://github.com/hilalkr/connect-four.git
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

This command reads the package.json file in the project and installs all the required packages.

Step 3: Start the Game Server
After successfully installing the dependencies, you're ready to start the game server. Run:

```bash
- Navigate to the server directory
cd server

- Install dependencies
npm install

- In a separate terminal, start the server
npm start
```


This command starts a development server and usually opens the game in your default web browser. If it doesn't open automatically, you can manually access it by typing http://localhost:3000 in your browser's address bar.

Step 4: Play the Game

Once the game interface loads in your browser, you're ready to play! The game's UI is intuitive, allowing you to begin playing Connect Four immediately. If you're playing against the AI, it will automatically take its turn after you place your disc.

**Game Logic**
- This project includes a frontend and a Node.js server for a React-based Connect Four game. AI moves are calculated using the OpenAI API.

- In the game, the winner is the player who places four pieces consecutively on the board. These four pieces can be arranged vertically, horizontally or diagonally. If the board becomes full and no player can line up four pieces in a row, the game ends in a draw.

- In the event of a draw, i.e. when the board is full, a new game is usually started and the players take turns again.

 ### Components

1. AlertModal.js
`AlertModal` is a reusable modal component that displays custom content passed as children. It is conditionally rendered based on the `show` prop, allowing it to appear over other content when necessary. The modal is designed with a fixed position and a high z-index to ensure it's prominently visible. It also includes a 'Close' button, which triggers the `onClose` callback, allowing for the modal to be dismissed.

2. GameBoard.js
`GameBoard` represents the central game logic and UI for the Connect Four game. It manages the state of the game board, the current player, and whether the game has ended. The component renders a grid based on the rows and columns state and handles disc placement with the `placeDisc` function. It uses a series of checks to determine if the game has a winner after each move with `checkForWinner`, and updates the game state accordingly. It also integrates with a server-side AI for move selection in a single-player game.

3. GameCreationScreen.js
`GameCreationScreen` allows players to set up a new game session. It provides form inputs to enter a game name and select a background color for the game board. Upon submission, it uses the `GameContext` to add a new game and redirects the user to the game screen for the newly created game using the `useNavigate` hook from React Router.

4. GameProvider.js
`GameProvider` is a context provider that encapsulates the state and logic for managing multiple game sessions. It maintains a list of games, handles the addition of new games, and updates the status of existing games. This state is persisted to `localStorage` to maintain state across page refreshes. The provider exposes this state and functionality through the `GameContext`, allowing other components in the application to access and manipulate the list of games.

5. GameScreen
`GameScreen` is the component responsible for rendering an individual game's interface. It retrieves the game's details from `GameContext` based on the game ID from the URL parameters. It manages the display of the current player and the game result using local state. `GameScreen` renders the `GameBoard` and `AlertModal` components, passing down the necessary props and callbacks to handle game completion and player change events.

6. ListOfGamesScreen
`ListOfGamesScreen` displays a list of all past completed games retrieved from the `GameContext`. It filters the games to only show those with a status of 'completed' and presents them in a list format, showing details such as the game name, date/time, winner, and loser.

7. GameContext
GameContext creates a React Context, which is a way to pass data through the component tree without having to pass props down manually at every level. In the context of this game, GameContext is used to manage and distribute the state of multiple game sessions throughout the application. 

**Key Functionalities** 
- State Management: GameProvider maintains the state of all game sessions, including their status, players involved, and outcomes. This state is initialized from the browser's local storage to persist data across sessions.

- Adding New Games: The addGame function is used to create a new game session. It assigns a unique identifier, captures the current date and time, and sets initial values for the game's status, winner, and loser. The new game is then added to the state and stored in local storage.

- Updating Game Status: The updateGameStatus function allows for updating the status of a game (e.g., ongoing, completed), as well as setting the winner and loser as the game concludes. The game's data is then updated in both the state and local storage.


### Server
The server component of the Connect Four game is a crucial piece of the architecture, particularly responsible for the AI logic. The server side of the application is built using Express.js and integrates with an AI service for game logic. It is designed to interact with OpenAI's API to determine the best moves for the AI opponent during gameplay.

#### AI Logic

**Key Components**
- Server Setup (server/index.js): The server is built using Express, a popular Node.js web application framework. The server configuration includes CORS (Cross-Origin Resource Sharing) settings to allow requests from the specified frontend (http://localhost:3000), and it uses JSON for data handling. The server listens on a configurable port, defaulting to 5000 if not specified.

- AI Route (server/routes/ai.js): This file defines an endpoint /get-ai-move for the AI logic. It uses the express.Router to handle incoming POST requests that contain the game's current state.

**AI Logic**

- Game State Analysis: Upon receiving the game state in a POST request, the server constructs a prompt for the OpenAI API. The prompt includes the current game board state, where '+' indicates the player's moves, 'O' the AI's moves, and '-' the empty spaces.

- OpenAI Integration: The server interacts with OpenAI's GPT-3.5-turbo model to analyze the game state and determine the optimal move for the AI. The configuration for the API call includes specifying the model, setting the temperature (which affects the randomness of the response), and limiting the response length.

- Response Handling: The response from the OpenAI API is parsed to extract the AI's chosen move, which is then sent back to the client. This move is the column index where the AI has decided to place its disc.


ChatGpt History: https://github.com/hilalkr/connect-four/blob/main/chatgpt-conversation-history.md

### Contact

Hilal KARA - hilalkara0020@gmail.com
Project Link: https://github.com/hilalkr/connect-four







# Music Sync Tool (Proof of Concept)

## Deployed URL on VERCEL
https://syntax-erro-frontend-git-main-eazeplace.vercel.app/

## Overview
The **Music Sync Tool** is a real-time music playback synchronization app that enables seamless listening sessions across multiple devices. Whether you're syncing with friends or setting up a group playback session, the tool ensures minimal latency and handles any de-synchronization issues. The host manages playback controls, and all connected peers stay in sync in real-time.

## Features
- **Real-time Playback Synchronization:** The host manages the playback (play, pause, jump), and the playback state is broadcasted to all connected peers, ensuring everyone hears the music at the same time.
- **Peer Onboarding:** Peers can easily join rooms created by the host, syncing with the current playback state when they connect.
- **Desynchronization Handling:** The tool checks for peer latency and compensates for any de-syncs by adjusting playback times or resyncing peers with the host.
- **Latency Checking:** Continuous monitoring of connection quality between peers to ensure minimal delays.
1. **Emit the Current Timestamp from the Host:**
   Whenever the host plays or updates the song, emit the current playback timestamp to all peers. The host can send the timestamp regularly, such as every second, to ensure synchronization.

2. **Peers Adjust Playback:**
   Peers will listen for this timestamp and, if the difference between the host's timestamp and their own is significant (more than a threshold, say 1-2 seconds), they can adjust their playback time to match the host.

## Technologies Used

- List the technologies and frameworks used in the project.
  - React
  - Socket.io
  - Tailwind CSS
  - Axios
    
## How to Run

### 1. Clone the repo
To Clone the repo use the following command
```bash
git clone https://github.com/achyuta22/syntax-erro-frontend.git
```

### 2. Navigate into the project directory:
to acesss the server files you have to enter into repo for this use the following command

```bash
cd directory
```

### 3. Install Dependencies
To install the necessary dependencies, run the following command:
```bash
npm install
```

### 4. Start the Server
To start the development server, run:
```bash
npm start
```
## Project Structure

- **public/**: Contains the static files used by the server to render the React app, including:
  - `index.html`: The main HTML file that is served.
  - Any images, icons, or stylesheets needed for the static assets.

- **src/**: Contains all the logic and components needed to render pages on the server. This includes:
  - **components/**: Reusable React components.
  - **pages/**: Page components that correspond to different routes in your application.
  - **hooks/**: Custom hooks for managing state and side effects.
  - **redux/**: Redux setup (if applicable), including actions, reducers, and store configuration.
  - **styles/**: Any CSS or styling files, including global styles or styles specific to components.

- **index.js**: The entry point for the React application, where the app is rendered to the DOM. This file typically includes:
  - Importing necessary libraries (e.g., React, ReactDOM).
  - Rendering the main application component.
  - Setting up any providers (like Redux or context providers) if needed.

- **App.js**: The main application component that serves as the root of the React component tree. It typically includes:
  - Route definitions for navigating between different pages.
  - Any layout components that wrap around the page content, such as headers and footers.
  - Context providers or state management setup for the entire app.

- **AudioContext.js**: A module for managing audio contexts, which may include functionalities for playing, pausing, and controlling audio in the application. This file handles the initialization and configuration of the Web Audio API, providing a centralized way to manage audio playback across your components.

This will start the app in development mode. You can open [http://localhost:3000](http://localhost:3000) in your browser to interact with the app.

- The page will reload whenever you make changes.
- Any lint errors or warnings will also be shown in the console.


```

### Key Files:

## Key Concepts
- **WebSocket Communication**: The app uses WebSockets (via Socket.IO) for real-time, bidirectional communication between the server and the connected peers.
- **Peer Management**: Peers are onboarded into rooms, and the host’s playback state is shared with them upon connection. This ensures they are synchronized with the music from the start.

## Contributing
Feel free to contribute by opening a pull request or submitting issues if you encounter bugs or have ideas for new features.

## License
This project is licensed under the MIT License.

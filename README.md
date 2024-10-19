# Music Sync Tool (Proof of Concept)

## Overview
The **Music Sync Tool** is a real-time music playback synchronization app that enables seamless listening sessions across multiple devices. Whether you're syncing with friends or setting up a group playback session, the tool ensures minimal latency and handles any de-synchronization issues. The host manages playback controls, and all connected peers stay in sync in real-time.

## Features
- **Real-time Playback Synchronization:** The host manages the playback (play, pause, jump), and the playback state is broadcasted to all connected peers, ensuring everyone hears the music at the same time.
- **Peer Onboarding:** Peers can easily join rooms created by the host, syncing with the current playback state when they connect.
- **Desynchronization Handling:** The tool checks for peer latency and compensates for any de-syncs by adjusting playback times or resyncing peers with the host.
- **Latency Checking:** Continuous monitoring of connection quality between peers to ensure minimal delays.

## How to Run

### 1. Install Dependencies
To install the necessary dependencies, run the following command:
```bash
npm install
```

### 2. Start the Server
To start the development server, run:
```bash
npm start
```

This will start the app in development mode. You can open [http://localhost:3000](http://localhost:3000) in your browser to interact with the app.

- The page will reload whenever you make changes.
- Any lint errors or warnings will also be shown in the console.

## Project Structure
Here’s a breakdown of the project files and their purpose:

```
.
├── controllers
│   └── hiController.js   # Handles WebSocket communication and peer onboarding logic
├── routes
│   └── hiRoute.js        # Defines the routes related to peer synchronization
├── index.js              # Main entry point that sets up the Express server and WebSocket connections
├── package.json          # Project configuration and dependency management
├── package-lock.json     # Detailed dependency tree
└── README.md             # This README file
```

### Key Files:
1. **`controllers/hiController.js`**:
   - Manages WebSocket connections and event handling.
   - Responsible for onboarding new peers, syncing playback states, and handling any desynchronization issues.

2. **`routes/hiRoute.js`**:
   - Defines the routes for managing the synchronization logic, such as onboarding peers and broadcasting playback states.

3. **`index.js`**:
   - Sets up the main server using Express.
   - Initializes the WebSocket server with Socket.IO and configures event handling for peer connection and synchronization.

## Key Concepts
- **WebSocket Communication**: The app uses WebSockets (via Socket.IO) for real-time, bidirectional communication between the server and the connected peers.
- **Delta Synchronization**: The app ensures efficient data transmission by only sending delta updates (changes) in playback state, rather than broadcasting the full state every time.
- **Peer Management**: Peers are onboarded into rooms, and the host’s playback state is shared with them upon connection. This ensures they are synchronized with the music from the start.

## Contributing
Feel free to contribute by opening a pull request or submitting issues if you encounter bugs or have ideas for new features.

## License
This project is licensed under the MIT License.
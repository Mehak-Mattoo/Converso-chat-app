# 💬 Real-Time Chat Application

## ✨ Features

- **Real-Time Communication**: Instant messaging with no delays, powered by Socket.IO.
- **User Authentication**: Secure login and registration using JWT (JSON Web Tokens).
- **Responsive Design**: A mobile-friendly interface that adapts to any screen size.
- **Group Chats and Direct Messages**: Communicate privately or in groups with ease.
- **Message Notifications**: Receive real-time notifications for new messages.
- **User Status Indicators**: See who is typing in real-time.
- **Chat History**: Persistent message storage, allowing users to see past conversations.

## 🛠 Technologies Used

- **MongoDB**: Database to store user data and messages.
- **Express.js**: Backend framework to handle API requests and WebSocket connections.
- **React**: Frontend library for building the user interface.
- **Node.js**: Server environment to run the backend application.
- **Socket.IO**: Library to enable real-time, bidirectional communication between clients and servers.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **Chakra UI**: For styling the user interface with a modern, responsive design.

## 🚀 Getting Started

To run this project locally, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/chat-application.git
    cd chat-application
    ```

2. **Install dependencies** for both the client and server:
    ```sh
    cd client
    npm install
    cd ../server
    npm install
    ```

3. **Create a `.env` file** in the `server` directory and add the following variables:
    ```env
    MONGO_URI=your_mongo_database_uri
    JWT_SECRET=your_jwt_secret
    ```

4. **Run the server**:
    ```sh
    npm run start
    ```

5. **Open your browser** and navigate to `http://localhost:3000` to see the application in action.

## Landing Page

![chat](https://github.com/Mehak-Mattoo/chat-app/assets/77096365/77b049c5-7c6a-4e45-8d0d-e41f4d3ec9b0)

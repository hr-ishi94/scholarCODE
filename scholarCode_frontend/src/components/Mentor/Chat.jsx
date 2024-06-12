import React, { useState, useEffect } from 'react';
import { w3cwebsocket as W3CWebSocket } from 'websocket';


const Chat = ({ roomName }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    const client = new W3CWebSocket(`ws://localhost:8000/ws/chat/${roomName}/`);

    useEffect(() => {

        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        client.onmessage = (message) => {
            const dataFromServer = JSON.parse(message.data);
            setMessages((prevMessages) => [...prevMessages, dataFromServer.message]);
        };

        return () => {
            client.close();
        };

    }, [roomName]);

    const sendMessage = () => {
        client.send(JSON.stringify({ message }));
        setMessage('');
    };

    return (
        <div>
            <h2>Chat Room: {roomName}</h2>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onClick={(e) => e.key === 'Enter' && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
};

export default Chat;

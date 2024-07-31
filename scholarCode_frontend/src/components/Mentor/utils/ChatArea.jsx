import React, { useEffect, useRef, useState } from 'react';
import Messages from './Messages';
import { Avatar } from '@mui/material';
import {jwtDecode} from 'jwt-decode';
import { ChatMsg } from '../../../Redux/Slices/Userside/ChatSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SOCKET } from '../../../Axios/Urls/EndPoints';
import { Badge } from 'antd';
import { Button, Col, Row } from 'react-bootstrap';
import InputEmoji from 'react-input-emoji';
import { useNavigate } from 'react-router-dom';

const ChatArea = ({ user, username }) => {
  const Mentor_token = useSelector((state) => state.MentorToken);
  const User_token = useSelector((state) => state.UserToken);
  console.log('mentor',Mentor_token,'user',User_token)
  const access = Mentor_token?.access || User_token?.access;
  const userId = jwtDecode(access).user_id;
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const dispatch = useDispatch();
  const chatContainerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user_id1 = user;
    const user_id2 = userId;
    GetChats(user_id1, user_id2);
  }, [user, username]);

  const GetChats = async (user_id1, user_id2) => {
    if (socket) {
      socket.close();
    }

    const id = { user_id1, user_id2 };
    const res = await dispatch(ChatMsg(id));
    setMessages(res.payload);
  };

  useEffect(() => {
    getSocket();
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user, access]);

  const getSocket = () => {
    if (user && access) {
      const newSocket = new WebSocket(`${SOCKET}/${user}/?token=${access}`);
      setSocket(newSocket);

      newSocket.onopen = () => {
        console.log('WebSocket Connected');
      };

      newSocket.onerror = (error) => {
        console.log('WebSocket error:', error);
      };

      newSocket.onclose = () => {
        console.log('WebSocket closed');
        setTimeout(getSocket, 1000); // Attempt to reconnect after 1 second
      };

      newSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.content) {
          setMessages((prevMessages) => [...prevMessages, data]);
        } else {
          console.log('Unexpected message format:', data);
        }
      };
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newMessage && socket) {
      if (socket.readyState === WebSocket.CLOSED) {
        getSocket();
      } else if (socket.readyState === WebSocket.OPEN) {
        const data = { message: newMessage };
        socket.send(JSON.stringify(data));
        setNewMessage('');
      }
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleVcall = () => {
    console.log('vcall running');
    // navigate(`/meeting/${userid}/${mentorid}/${courseid}/`)
  };

  return (
    <div className="chat-history">
      <div className="chat-header clearfix card text-light" style={{ backgroundColor: '#12A98E' }}>
        <Row>
          <Col sm={11}>
            <div className='px-5 pt-2 d-flex'>
              <a href="javascript:void(0);" className="mx-2 mt-2" data-toggle="modal" data-target="#view_info">
                <Avatar />
              </a>
              <div className="chat-about">
                <h5>{username || 'user'}</h5>
                <Badge status="success" /> online
              </div>
            </div>
          </Col>
          <Col sm={1}>
            <Button className='text-light rounded-circle mt-3' variant='' onClick={handleVcall}>
              <h5 className='pt-2 px-2'>
                <i className="fa-solid fa-video"></i>
              </h5>
            </Button>
          </Col>
        </Row>
      </div>
      <div ref={chatContainerRef} className="chat-area">
        <div className="mx-4 mt-1">
          {messages
            .slice()
            .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
            .map((msg, index) => (
              <Messages key={index} text={msg.content} send={msg.user} sender={userId} />
            ))}
        </div>
      </div>
      <div className="chat-message p-2">
        <InputEmoji
          value={newMessage}
          onChange={setNewMessage}
          cleanOnEnter
          onEnter={handleSubmit}
        />
        <Button onClick={handleSubmit} variant="" className="text-light p-2 mx-1 send-button">
          <i className="fa fa-send"></i>
        </Button>
      </div>
    </div>
  );
};

export default ChatArea;

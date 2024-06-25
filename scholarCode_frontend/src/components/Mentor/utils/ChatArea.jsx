import React, { useEffect, useRef, useState } from 'react'
import Messages from './Messages'
import { Avatar } from '@mui/material'
import { jwtDecode } from 'jwt-decode'
import { ChatMsg } from '../../../Redux/Slices/Userside/ChatSlice'
import { useDispatch } from 'react-redux'
import { SOCKET } from '../../../Axios/Urls/EndPoints'
import { stringAvatar } from '../../../constants/mui'
import { Badge } from 'antd'
import { Button } from 'react-bootstrap'
import InputEmoji from 'react-input-emoji'

const ChatArea = ({user,username}) => {
  const access = localStorage.getItem('access')
  const userId = jwtDecode(access).user_id
  const dispatch = useDispatch()
  const [messages,setMessages] = useState([])
  const [socket,setSocket] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const chatContainerRef = useRef(null)

  useEffect(()=>{
    const user_id1 = user
    const user_id2 = userId
    GetChats(user_id1,user_id2)
  },[user,username])

  const GetChats  = async (user_id1,user_id2) =>{
    if (socket){
      socket.close()
    }

    const id = {
      user_id1,
      user_id2
    }
    const res = await dispatch(ChatMsg(id))
    setMessages(res.payload)
  }

  useEffect(()=>{
    getSocket()
    return()=>{
      if(socket){
        socket.close()
      }
    }
  },[user,access])


  const getSocket = () =>{
    let newSocket = null
    if (user && access){
      console.log(user, access,'jkl   ')
      newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${user}/?token=${access}`)
      // newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${user}/`)
      setSocket(newSocket)
      newSocket.onopen = () => console.log('Websocket Connected')
      newSocket.onerror = (error)=>{
        console.log('Websocket error:',error)
      }
      newSocket.close = () =>{
        console.log('Websocket closed')
      }
    }
  }

  const handleSubmit = (event) =>{
    event.preventDefault()
    if (newMessage && socket){
      if (socket.readyState === WebSocket.CLOSED ){
        getSocket()
      }else if (socket.readyState === WebSocket.OPEN){
        const data = {
          message:newMessage
        }
        socket.send(JSON.stringify(data))
        setNewMessage("")
      }
    }
  }

  useEffect(()=>{
    if (socket){
      socket.onmessage = (event) =>{
        const data = JSON.parse(event.data)
        if (data.content){
          setMessages((prevMessages)=>[...prevMessages, data])
        }else{
          console.log("Unexpected message format:",data)
        }
      }
    }
    console.log(messages,'kll')
    },[socket])

    
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      } else {
        console.error("chatContainerRef is null");
      }
    }, [messages, chatContainerRef]);
  
  
  return (
    <div className="chat-history chat-area">
     
      <div className="chat-header clearfix card text-light" style={{backgroundColor:'#12A98E'}}>
        <div className="row p-1" >
                <div className="col-lg-6 px-3 p-1 d-flex">
                    <a href="javascript:void(0);"className='mx-2'  data-toggle="modal" data-target="#view_info">
                        <Avatar/>
                    </a>
                    <div className="chat-about" >
                        <h5 className="m-b-0">{username?username:'user'}</h5>
                          <Badge status="success" /> online
                        
                    </div>
                </div>
                
            </div>

      </div>
      <div ref={chatContainerRef}>
        <div>
        {messages.slice().sort((a,b) =>new Date(a.timestamp) - new Date(b.timestamp))
        .map((msg,index)=>(

        <Messages key={index} text = {msg.content} send = {msg.user} sender ={userId} /> 
        
        ))}

        </div>

      </div>

    
            <div className="chat-message clearfix p-2  ">
            <InputEmoji
          value={newMessage}
          onChange={setNewMessage}
          cleanOnEnter
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSubmit();
            }
          }}
        />
                <Button onClick={handleSubmit} className='p-1 m-1'><i className="fa fa-send"></i></Button>
              
            </div>
        </div>
        
  )
}

export default ChatArea
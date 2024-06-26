import React, { useState } from 'react'
import './Chat.css'
import LeftChat from './utils/LeftChat'
import ChatLayout from './utils/ChatLayout'
import { Padding } from '@mui/icons-material'
import { Button } from 'react-bootstrap'

const Chat = () => {

    const [user , setUser ] = useState('')
    const [username , setUsername ] = useState('')
    
    
    const Chat = ({id, username}) => {
    setUser(id);
    setUsername(username);
}
    console.log(user,username,'krishn');
    
    
    const style = {
        marginTop:'50px',
        marginLeft:'250px'
    }
  

  return (
    

    <>
    
      <div className="container" style={style}>
        <div className="row clearfix">
            <div className="col-lg-12">
                <h2>Chat</h2>
                
                <div className="card left-area">
                    <LeftChat Chat = {Chat} />
                </div>
                <div className=" chat-layout" >
                    <ChatLayout user={user} username= {username} />
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Chat
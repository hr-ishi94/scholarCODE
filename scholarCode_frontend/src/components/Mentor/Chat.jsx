import React, { useState } from 'react'
import './Chat.css'
import LeftChat from './utils/LeftChat'
import ChatLayout from './utils/ChatLayout'
import { Padding } from '@mui/icons-material'

const Chat = () => {

    const [usr , setUsr ] = useState('')
    const [usrname , setUsrname ] = useState('')
    const Chat = (id, username) => {
    console.log("id:", id);
    console.log("username:", username);
    // Assuming setUsr and setUsrname are state update functions
    // You can set the states with the received id and username
    setUsr(id.id);
    setUsrname(id.username);
    console.log(usr,usrname);
    }
    
    
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
                    <LeftChat Chat = {Chat} edit/>
                </div>
                <div className=" chat-layout" >
                    <ChatLayout usr={usr} usrname= {usrname} />
                </div>
            </div>
        </div>
      </div>
    </>
  )
}

export default Chat
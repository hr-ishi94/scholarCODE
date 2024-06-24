import React from 'react'
import ChatArea from './ChatArea'
import ChatMessage from './ChatMessage'
import { Avatar } from '@mui/material'

const ChatLayout = ({user,username}) => {
  return (
    <div className="chat" >
        {user && 
            <> 
            
            <ChatArea user = {user} username = {username}/>
        </>
            
    }
    </div>
  )
}

export default ChatLayout
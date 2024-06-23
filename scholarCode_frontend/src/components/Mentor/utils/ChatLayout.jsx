import React from 'react'
import ChatArea from './ChatArea'
import ChatMessage from './ChatMessage'
import { Avatar } from '@mui/material'

const ChatLayout = ({usr,usrname}) => {
  return (
    <div className="chat " >
        <div className="chat-header clearfix card text-light" style={{backgroundColor:'#12A98E'}}>
        {usr ? 
            <> 
            <div className="row p-1" >
                <div className="col-lg-6 px-3 p-1 d-flex">
                    <a href="javascript:void(0);"className='mx-2'  data-toggle="modal" data-target="#view_info">
                        <Avatar/>
                    </a>
                    <div className="chat-about" >
                        <h5 className="m-b-0">Aiden Chavez</h5>
                    </div>
                </div>
                
            </div>
            <ChatArea usr = {usr} usrname = {usrname}/>
        </>:
        <div style={{backgroundColor:'#BCFFDB'}}>
            
        </div>
            
    }
    </div>
    </div>
  )
}

export default ChatLayout
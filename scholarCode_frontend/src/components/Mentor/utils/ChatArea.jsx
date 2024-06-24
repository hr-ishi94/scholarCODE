import React, { useEffect, useState } from 'react'
import Messages from './Messages'
import { Avatar } from '@mui/material'
import { jwtDecode } from 'jwt-decode'
import { ChatMsg } from '../../../Redux/Slices/Userside/ChatSlice'
import { useDispatch } from 'react-redux'

const ChatArea = ({user,username}) => {
  const userId = jwtDecode(localStorage.getItem('access')).user_id
  const dispatch = useDispatch()
  const [messages,setMessages] = useState([])
  
  useEffect(()=>{
    const user_id1 = user
    const user_id2 = userId
    GetChats(user_id1,user_id2)
  },[user,username])

  const GetChats  = async (user_id1,user_id2) =>{
    const id = {
      user_id1,
      user_id2
    }
    const res = await dispatch(ChatMsg(id))
    setMessages(res.payload)
  }
  console.log(messages,'mess')

  return (
    <div className="chat-history chat-area">
      <ul className="m-b-0">
      <div className="chat-header clearfix card text-light" style={{backgroundColor:'#12A98E'}}>
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

      </div>

        <Messages/>
      </ul>
            <div className="chat-message clearfix m">
            <div className="input-group p-2">
                <input type="text" className="form-control " placeholder="Enter text here..."/>                                    
                <div className="input-group-prepend ">
                    <span className="input-group-text p-2"><i className="fa fa-send"></i></span>
                </div>
            </div>
        </div>
        </div>
        
  )
}

export default ChatArea
import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axiosChatInstance } from '../../../Axios/Utils/AxiosInstances'
import { Avatar, Stack } from '@mui/material'
import { stringAvatar } from '../../../constants/mui'


const LeftChat = ({Chat = ()=>{}}) => {
  const Mentor_token = useSelector((state)=>state.MentorToken) 
  const User_token = useSelector((state)=>state.UserToken) 
  const access = Mentor_token?.access || User_token?.access;
  // console.log(access,'lo')
  const userId = jwtDecode(access).user_id
  const [chatUsers, setChatUsers] = useState([])
  // console.log(Mentor_token,access,'lllko')
  useEffect(() => {
    const getChatUsers = async (userId) => {
      try {
        const res = await axiosChatInstance.get(`/chat_users/${userId}/`);
        setChatUsers(res.data);
      } catch (error) {
        console.log('Error while fetching users:', error);
      }
    };

    getChatUsers(userId);
  }, [userId])
  ;
  // console.log(chatUsers,'chatusers')
  return (
    <>
    <div id="plist" className="people-list p-2">
      {/* <div className="input-group p-2">
          <div className="input-group-prepend ">
              <span className="input-group-text p-2"><i className="fa fa-search"></i></span>
          </div>
          <input type="text" className="form-control" placeholder="Search..."/>
      </div> */}
      <ul className="list-unstyled chat-list mt-2 mb-0 px-2">
      {Array.isArray(chatUsers) && chatUsers.length > 0 ? (
        chatUsers.map((user, index) => (
          <ChatUserItem user={user} userId={userId} key={user.id } Chat={Chat} />
        ))
      ) : (
        <p>No users available.</p> // Display a message if there are no users
      )}
          
      </ul>
    </div>
  </>
  )
}

export default LeftChat


const ChatUserItem = ({user,userId,Chat = ()=>{ }})=>{


  const isUser = user.user1.id === userId
  const displayUser = !isUser?user.user1:user.user2
  const isMentor = displayUser.is_staff
  
  
  return(
        <button style={{width:'13em',borderRadius:'5px'}} onClick={()=>Chat({id:displayUser.id, username:displayUser.username})}>
          <li className="d-flex p-1">
            <Stack direction='row' spacing={2} className='mx-2'>
              <Avatar{ ...stringAvatar(`${displayUser.first_name} ${displayUser.last_name}` )}/>
            </Stack>
              <h5 className='mt-2'>{displayUser.first_name} {displayUser.last_name}</h5>
          </li>
              <h6 style={{color:'#12A98E'}}>{isMentor &&  'Mentor'}</h6>
        </button>
  )
}
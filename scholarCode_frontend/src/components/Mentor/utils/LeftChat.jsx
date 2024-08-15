import { jwtDecode } from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { axiosChatInstance } from '../../../Axios/Utils/AxiosInstances'
import { Avatar, Stack } from '@mui/material'
import { stringAvatar } from '../../../constants/mui'


const LeftChat = ({ Chat = () => {} }) => {
  const Mentor_token = useSelector((state) => state.MentorToken) 
  const User_token = useSelector((state) => state.UserToken) 
  const access = Mentor_token?.access || User_token?.access;
  const userId = access ? jwtDecode(access).user_id : null;

  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    const getChatUsers = async (userId) => {
      if (userId) {
        try {
          const res = await axiosChatInstance.get(`/chat_users/${userId}/`);
          setChatUsers(res.data);
        } catch (error) {
          console.log('Error while fetching users:', error);
        }
      }
    };

    getChatUsers(userId);
  }, [userId]); // Ensure userId is in the dependency array

  return (
    <div id="plist" className="people-list p-2">
      <ul className="list-unstyled chat-list mt-2 mb-0 px-2">
        {chatUsers.length > 0 ? (
          chatUsers.map((user, index) => (
            <ChatUserItem user={user} userId={userId} key={user.id} Chat={Chat} />
          ))
        ) : (
          <li>No chat users available.</li>
        )}
      </ul>
    </div>
  )
}

export default LeftChat


const ChatUserItem = ({ user, userId, Chat = () => {} }) => {
  const isUser = user.user1.id === userId;
  const displayUser = !isUser ? user.user1 : user.user2;
  const isMentor = displayUser.is_staff;

  return (
    <button 
      style={{ width: '13em', borderRadius: '5px' }} 
      onClick={() => Chat({ id: displayUser.id, username: displayUser.username })}
    >
      <li className="d-flex p-1">
        <Stack direction='row' spacing={2} className='mx-2'>
          <Avatar { ...stringAvatar(`${displayUser.first_name} ${displayUser.last_name}`) } />
        </Stack>
        <h5 className='mt-2'>{displayUser.first_name} {displayUser.last_name}</h5>
      </li>
      <h6 style={{color:'#12A98E'}}>{isMentor && 'Mentor'}</h6>
    </button>
  );
}

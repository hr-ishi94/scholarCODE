import React, { useEffect } from 'react'
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 } from 'uuid';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { addLink, removeLink } from '../../../Redux/Slices/ZegoCallSlice';
import { Vurl } from '../../../Axios/Urls/EndPoints';

const ZegoCall = () => {
    const {userid,mentorid,courseid} = useParams()
    const access = localStorage.getItem('access')
    const tokenDecode = jwtDecode(access)
    const dispatch = useDispatch()
    const linkForm = {
        link:`${Vurl}meeting/${userid}/${mentorid}/${courseid}/`,
        userid:Number(userid),
        mentorid:Number(mentorid),
        courseid:Number(courseid)
    }
    console.log(linkForm)
    useEffect(()=>{
        dispatch(addLink(linkForm))

    },[dispatch])
    
    const navigate = useNavigate()

    const myMeeting = async (element)=>{
        const appID =27702034
        const serverSecret = "d8f974da65ead0ac4a628349a4035554"
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(appID,serverSecret,mentorid,Date.now().toString(),userid)
        const zc = ZegoUIKitPrebuilt.create(kitToken)
        
        zc.joinRoom({
            container:element,
        scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall,
            
        },
        showScreenSharingButton:true,
        onLeaveRoom:()=>{
            dispatch(removeLink(linkForm))
            if(mentorid == tokenDecode.user_id){
                navigate(`/mentor/review/${courseid}/`)
            }else{
                navigate('/courses/')
            }
        }
})
}
  return (
    <div >
        <div className='p-5' ref={myMeeting}/>
    </div>
  )
}

export default ZegoCall
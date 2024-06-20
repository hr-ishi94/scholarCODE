import React, { useCallback, useEffect } from 'react'
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
    console.log(mentorid)
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
        const appID =278653523
        const serverSecret = "2b24a8822788b4f9c557874508ea61de"
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
    <div>
        <div ref={myMeeting}/>
    </div>
  )
}

export default ZegoCall
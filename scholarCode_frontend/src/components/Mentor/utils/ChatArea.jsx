import React from 'react'
import Messages from './Messages'

const ChatArea = () => {
  return (
    <div className="chat-history chat-area">
      <Messages/>
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
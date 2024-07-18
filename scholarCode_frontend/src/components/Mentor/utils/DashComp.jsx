import React from 'react'

const DashComp = ({title, count,revenue}) => {
  const dash_style = {
    width:'30em',
    height:'8em',
    marginBottom:'10px',
    backgroundColor:'#BCFFDB',
    borderRadius:'10px'

  }
  return (
    <div className='p-3' style={dash_style}>
      <h3>{title}</h3>
      <h3 style={{marginLeft:'13em',marginTop:'1em'}}>{revenue?`Rs ${count}` :`${count} Nos`}</h3>
    </div>
  )
}

export default DashComp
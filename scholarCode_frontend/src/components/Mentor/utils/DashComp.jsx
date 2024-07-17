import React from 'react'

const DashComp = ({title, count}) => {
  const dash_style = {
    width:'30em',
    height:'12em',
    marginBottom:'10px',
    backgroundColor:'#BCFFDB',
    borderRadius:'10px'

  }
  return (
    <div className='p-3' style={dash_style}>
      <h3>{title}</h3>
      <h3 style={{marginLeft:'13em',marginTop:'2em'}}>{count} </h3>
    </div>
  )
}

export default DashComp
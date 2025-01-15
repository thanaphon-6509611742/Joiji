import React from 'react'

function Plan() {
    
  const user = sessionStorage.getItem('user');

  return (
    <div>{`Hello ${user} again!`}</div>
  )
}

export default Plan
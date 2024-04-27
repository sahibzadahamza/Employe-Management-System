import React from 'react'

const UserHeader = () => {
   
    const logout=()=>{
        localStorage.removeItem('data')
        window.location.reload();
    }
  return (
    <div className='flex gap-6 justify-end items-end py-10 px-20 '>

    <button onClick={logout}>Logout</button>    
    </div>
  )
}

export default UserHeader
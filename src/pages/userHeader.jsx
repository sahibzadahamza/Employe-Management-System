import React from 'react'
import {Link} from 'react-router-dom';



const UserHeader = () => {
   
    const logout=()=>{
        localStorage.removeItem('data')
        window.location.reload();
    }
  return (
    <div className='flex gap-6 justify-center py-10 items-center'>

    <button onClick={logout}>Logout</button>    
    </div>
  )
}

export default UserHeader
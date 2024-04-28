import React from 'react'
import img from '../assets/emp.jpg'
import {Link} from 'react-router-dom';
const UserHeader = () => {

  const logout = () => {
    localStorage.removeItem('data')
    window.location.reload();
  }
  return (
    <div className='flex gap-6 justify-between py-2 px-20 '>
      <div>

        <img className='w-[150px] h-[150px]' src={img} alt="image" />
      </div>
      <div>
      <Link to="/user-apply" className="font-medium text-indigo-600 hover:text-indigo-500">View Applications </Link>
      </div>
      <div>

        <button onClick={logout}>Logout</button>
      </div>
    </div>
  )
}

export default UserHeader
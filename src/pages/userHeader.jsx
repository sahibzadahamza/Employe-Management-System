import React from 'react'
import img from '../assets/emp.jpg'
import {Link} from 'react-router-dom';
const UserHeader = () => {

  const logout = () => {
    localStorage.removeItem('data')
    localStorage.setItem('isLoggedIn',false) 
    window.location.reload();
  }
  return (
    <div className='flex gap-6 justify-between py-2 px-20 '>
      <div>

        <img className='w-[150px] h-[150px]' src={img} alt="image" />
      </div>
      <div className='mt-20'>
      <Link to="/user-apply" className="font-medium text-indigo-600 hover:text-indigo-500 ">View Applications </Link>
      </div>
      <div className='mt-20'>
        <button onClick={logout} className='group relative  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>Logout</button>
      </div>
    </div>
  )
}

export default UserHeader
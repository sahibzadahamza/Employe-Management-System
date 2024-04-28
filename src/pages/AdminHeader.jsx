import React from 'react'
import {Link} from 'react-router-dom';
import img from '../assets/emp.jpg'



const AdminHeader = () => {
   
    const logout=()=>{
        localStorage.removeItem('data')
        window.location.reload();
    }
  return (
    <div className='flex gap-6 justify-between py-2 px-10 '>
    <div>
    <img className='w-[150px] h-[150px]' src={img} alt="image" />
    </div>
   <div className='space-x-6 mt-20'>
    <Link to="/joblisting" className="font-medium text-indigo-600 hover:text-indigo-500">View All Jobs </Link> 
    <Link to="/employeesDetail" className="font-medium text-indigo-600 hover:text-indigo-500">View All Employees </Link> 
    <Link to="/createJob" className="font-medium text-indigo-600 hover:text-indigo-500">Post New Job </Link> 
    <Link to="/addEmployee" className="font-medium text-indigo-600 hover:text-indigo-500">Add New Employee </Link> 
    <Link to="/showapply" className="font-medium text-indigo-600 hover:text-indigo-500">View Applications </Link>
   </div>
    <div className='mt-20'>
    <button onClick={logout}>Logout</button>    
    </div>
    </div>
  )
}

export default AdminHeader
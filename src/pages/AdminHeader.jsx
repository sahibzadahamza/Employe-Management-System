import React from 'react'
import {Link} from 'react-router-dom';



const AdminHeader = () => {
   
    const logout=()=>{
        localStorage.removeItem('data')
        window.location.reload();
    }
  return (
    <div className='flex gap-6 justify-center py-10 items-center'>
    <Link to="/joblisting" className="font-medium text-indigo-600 hover:text-indigo-500">View All Jobs </Link> 
    <Link to="/employeesDetail" className="font-medium text-indigo-600 hover:text-indigo-500">View All Employees </Link> 
    <Link to="/createJob" className="font-medium text-indigo-600 hover:text-indigo-500">Post New Job </Link> 
    <Link to="/addEmployee" className="font-medium text-indigo-600 hover:text-indigo-500">Add New Employee </Link> 
    <Link to="/showapply" className="font-medium text-indigo-600 hover:text-indigo-500">see user apply </Link>
    <button onClick={logout}>Logout</button>    
    </div>
  )
}

export default AdminHeader
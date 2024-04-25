import React from 'react';

const UserEntry = () => {
  const logout = () => {
    localStorage.removeItem('data');
    window.location.reload();
  };

  return (
    <div>
    <h1>user Works here</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default UserEntry;
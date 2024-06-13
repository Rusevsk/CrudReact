import React, { useState } from 'react';
import UserList from './Components/UserList';
import AddUserForm from './Components/AddUserForm';
import UpdateUserForm from './Components/UpdateUserForm';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  }

  return (
    <div>
      <h1>Usuarios</h1>
      <AddUserForm />
      <UserList selectUser={handleSelectUser} />
      {selectedUser && <UpdateUserForm user={selectedUser} />}
    </div>
  );
}

export default App;

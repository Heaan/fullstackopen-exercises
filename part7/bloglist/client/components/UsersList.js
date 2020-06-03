import React from 'react';
import { useSelector } from 'react-redux';

const UsersList = () => {
  const users = useSelector((state) => state.users);
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td> </td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </thead>
      </table>
    </div>
  );
};

export default UsersList;

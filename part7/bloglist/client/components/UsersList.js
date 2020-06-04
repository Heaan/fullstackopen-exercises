import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { initializeUsers } from 'Reducers/usersReducer';

const UsersList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

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
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;

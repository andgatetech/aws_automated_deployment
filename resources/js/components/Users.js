import React, {useState,useEffect} from 'react'
import UserTable from '../tables/UserTable';
import AddUserForm from '../forms/AddUserForm';
import EditUserForm from '../forms/EditUserForm';
import userAsyncRequest from '../hooks/userAsyncRequest';

  const Users = () => {
 
  const [data, loading] = userAsyncRequest();

  const [users, setUsers] = useState(null);

   useEffect(() => {
    if (data) {
      const formattedUsers = data.map((obj, i) => {
        return {
          id: obj.id,
          firstname: obj.firstname,
          lastname: obj.lastname,
          status: obj.status,
          name: obj.name,
          email: obj.email,
        };
      });
      setUsers(formattedUsers);
    }
  }, [data]);

  const addUser = (user) => {
    axios.post('/api/v1/user/create', user)
    .then(response => {
      //response.data is returning newly created user id
      user.id = response.data;
      setUsers([...users, user]);
    })
    .catch(error => {
      alert('Email Already Taken');
      console.log(error.response)
    });
      
    };

  const deleteFromDB = (id) => {
    axios.delete('/api/v1/user/delete/'+id)
  };

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    deleteFromDB(id);
  };

  const [editing, setEditing] = useState(false);

  const initialUser = { id: null, firstname: "", lastname: "", status: "", name: "", email: "" };

  const [currentUser, setCurrentUser] = useState(initialUser);

  const editUser = (id, user) => {
    setEditing(true);
    setCurrentUser(user);
  };

  const updateUser = (newUser) => {
    axios.post('/api/v1/user/update/'+newUser.id, newUser)
    .then(response => { 
      setUsers(
        users.map((user) => (user.id === currentUser.id ? newUser : user))
      );
      setCurrentUser(initialUser);
      setEditing(false);
    })
    .catch(error => {
      alert('Email Already Taken');
      console.log(error.response)
    });
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          {editing ? (
            <div>
              <h2>Edit user</h2>
              <EditUserForm
                currentUser={currentUser}
                setEditing={setEditing}
                updateUser={updateUser}
              />
            </div>
          ) : (
            <div>
              <h2>Add user</h2>
              <AddUserForm addUser={addUser} />
            </div>
          )}
        </div>
        {loading || !users ? (
          <p>Loading...</p>
        ) : (
          <div className="col-md-7">
            <h2>View users</h2>

            <UserTable
              users={users}
              deleteUser={deleteUser}
              editUser={editUser}
            />
          </div>
        )}
      </div>
    </div>
  );
        }

  export default Users;
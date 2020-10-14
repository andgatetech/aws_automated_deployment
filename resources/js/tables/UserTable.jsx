import React from 'react';

const UserTable = (props) => {
    return (
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Status</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.users.length > 0 ? (
                    props.users.map(user => {
                        const {id, firstname, lastname, status, name, email} = user;
                        return (
                            <tr key={id}>
                                <td>{firstname}</td>
                                <td>{lastname}</td>
                                <td>{status}</td>
                                <td>{name}</td>
                                <td>{email}</td>
                                <td>
                                    {/* <button onClick={() => props.deleteUser(id)} className="btn btn-info btn-sm">Delete</button>&nbsp; */}
                                    <button onClick={() => props.editUser(id, user)} className="btn btn-info btn-sm">Edit</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No users found</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default UserTable;
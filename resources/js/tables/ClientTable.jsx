import React from 'react';

const ClientTable = (props) => {
    return (
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Client Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.clients.length > 0 ? (
                    props.clients.map(client => {
                        const {id, clnt_name} = client;
                        return (
                            <tr key={id}>
                                <td>{clnt_name}</td>
                       
                                <td>
                                    {/* <button onClick={() => props.deleteClient(id)} className="btn btn-info btn-sm">Delete</button>&nbsp; */}
                                    <button onClick={() => props.editClient(id, client)} className="btn btn-info btn-sm">Edit</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No Clients found</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default ClientTable;
import React from 'react';

const ProjectTable = (props) => {
    return (
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Project Name</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.projects.length > 0 ? (
                    props.projects.map(project => {
                        const {id, prj_name} = project;
                        return (
                            <tr key={id}>
                                <td>{prj_name}</td>
                       
                                <td>
                                    {/* <button onClick={() => props.deleteProject(id)} className="btn btn-info btn-sm">Delete</button>&nbsp; */}
                                    <button onClick={() => props.editProject(id, project)} className="btn btn-info btn-sm">Edit</button>
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

export default ProjectTable;
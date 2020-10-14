import React from 'react';

const TaskTable = (props) => {
    return (
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Task Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Performance Rate</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                { props.tasks.length > 0 ? (
                    props.tasks.map(task => {
                        const {id, task_name, start_date, end_date, perfomance_rate} = task;
                        return (
                            <tr key={id}>
                                <td>{task_name}</td>
                                <td>{start_date}</td>
                                <td>{end_date}</td>
                                <td>{perfomance_rate}</td>
                                <td>
                                    <button onClick={() => props.deleteTask(id)} className="btn btn-info btn-sm">Delete</button>&nbsp;
                                    <button onClick={() => props.editTask(id, task)} className="btn btn-info btn-sm">Edit</button>
                                </td>
                            </tr>
                        )
                    })
                ) : (
                    <tr>
                        <td colSpan={4}>No tasks found</td>
                    </tr>
                )   
                }
            </tbody>
        </table>
    )
}

export default TaskTable;
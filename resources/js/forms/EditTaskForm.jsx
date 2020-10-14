import React, {useState, useEffect} from 'react';

const EditTaskForm = (props) => {

    useEffect(() => {
        setTask(props.currentTask);
        setTemp(props.currentTask.perfomance_rate);
    }, [props])

    const [task, setTask] = useState(props.currentTask);
    const [temp, setTemp] = useState(task.perfomance_rate)

    const handleChange = e => {
        const {name, value} = e.target;
        setTask({...task, [name]: value});
        if(e.target.name=='perfomance_rate'){
                console.log("Performance Rate ", e.target.value);
                setTemp(e.target.value); 
            }
        }

    const handleSubmit = e => {
        e.preventDefault();
        if (task.task_name && task.start_date && task.end_date && task.perfomance_rate) props.updateTask(task);
    }

    return (
        <form>
            <label>task_name</label>
            <input className="form-control" type="text" value={task.task_name} name="task_name" onChange={handleChange} />
            <label>start_date</label>
            <input className="form-control" type="date" value={task.start_date} name="start_date" onChange={handleChange} />
            <label>end_date</label>
            <input className="form-control" type="date" value={task.end_date} name="end_date" onChange={handleChange} />
            <br/>
            <div class="row">
                    <div class="col-md-4">
                    <input type="range" min="0" max="100" step="5" value={task.perfomance_rate} name="perfomance_rate" onChange={handleChange} />
                    </div>
                    <div class="col-md-8">

                    </div>
                    <div class="col-md-4">
                        <input class="form-control" type="number"  step="5" value={temp} disabled  /> 
                        <br/><br/>
                    </div>
                    <div class="col-md-8">
                        <h3>%</h3>
                    </div> 
            </div>
            
            
            <button className="btn btn-primary btn-md" type="submit" onClick={handleSubmit} >Edit task</button>&nbsp;
            <button className="btn btn-primary btn-md" type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
        </form>
    )
}

export default EditTaskForm;
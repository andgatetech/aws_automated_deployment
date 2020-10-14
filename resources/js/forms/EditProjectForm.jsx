import React, {useState, useEffect} from 'react';

const EditProjectForm = (props) => {

    useEffect(() => {
        setProject(props.currentProject)
    }, [props])

    const [project, setProject] = useState(props.currentProject);

    const handleChange = e => {
        const {name, value} = e.target;
        setProject({...project, [name]: value});
        }

    const handleSubmit = e => {
        e.preventDefault();
        if (project.prj_name) props.updateProject(project);
    }

    return (
        <form>
            <label>Project Name</label>
            <input className="form-control" type="text" value={project.prj_name} name="prj_name" onChange={handleChange} />
            <br/>
            <button className="btn btn-primary btn-md" type="submit" onClick={handleSubmit} >Edit Project</button>&nbsp;
            <button className="btn btn-primary btn-md" type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
        </form>
    )
}

export default EditProjectForm;
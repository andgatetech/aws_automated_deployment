import React, {useState} from 'react';

const AddProjectForm = (props) => {

    console.log(props);

    const initProject = { id: null, prj_name: "" };

    const [project, setProject] = useState(initProject);

    const handleChange = e => {
        const {name, value} = e.target;
        setProject({...project, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (project.prj_name ) {
            handleChange(e, props.addProject(project));
        }
    }

    return (
        <form>
            <label>Project Name</label>
            <input className="form-control" type="text" value={project.prj_name} name="prj_name" onChange={handleChange} /><br/>
            <button className="btn btn-primary btn-md" type="submit" onClick={handleSubmit} >Add Client</button>
        </form>
    )
}

export default AddProjectForm;
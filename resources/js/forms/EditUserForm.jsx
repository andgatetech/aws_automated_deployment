import React, {useState, useEffect} from 'react';

const EditUserForm = (props) => {

    useEffect(() => {
        setUser(props.currentUser)
    }, [props])

    const [user, setUser] = useState(props.currentUser);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
        }

    const handleSubmit = e => {
        e.preventDefault();
        if (user.firstname && user.lastname && user.status && user.name && user.email) props.updateUser(user);
    }

    return (
        <form>
            <label>Firstname</label>
            <input className="form-control" type="text" value={user.firstname} name="firstname" onChange={handleChange} />
            <label>Lastname</label>
            <input className="form-control" type="text" value={user.lastname} name="lastname" onChange={handleChange} />
            <label>Status</label>
            <input className="form-control" type="number" value={user.status} name="status" onChange={handleChange} />
            <label>Name</label>
            <input className="form-control" type="text" value={user.name} name="name" onChange={handleChange} />
            <label>Email</label>
            <input className="form-control" type="text" value={user.email} name="email" onChange={handleChange} />
            <br/>
            <button className="btn btn-primary btn-md" type="submit" onClick={handleSubmit} >Edit user</button>&nbsp;
            <button className="btn btn-primary btn-md" type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
        </form>
    )
}

export default EditUserForm;
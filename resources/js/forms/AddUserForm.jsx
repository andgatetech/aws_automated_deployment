import React, {useState} from 'react';

const AddUserForm = (props) => {

    console.log(props);

    const initUser = { id: null, firstname: "", lastname: "", status: "", name: "", email: "" };

    const [user, setUser] = useState(initUser);

    const handleChange = e => {
        const {name, value} = e.target;
        setUser({...user, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (user.firstname && user.lastname && user.status && user.name && user.email) {
            handleChange(e, props.addUser(user));
        }
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
            <input className="form-control" type="text" value={user.email} name="email" onChange={handleChange} /><br/>
            <button className="btn btn-primary btn-md" type="submit" onClick={handleSubmit} >Add user</button>
        </form>
    )
}

export default AddUserForm;
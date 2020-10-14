import React, {useState, useEffect} from 'react';

const EditClientForm = (props) => {

    useEffect(() => {
        setClient(props.currentClient)
    }, [props])

    const [client, setClient] = useState(props.currentClient);

    const handleChange = e => {
        const {name, value} = e.target;
        setClient({...client, [name]: value});
        }

    const handleSubmit = e => {
        e.preventDefault();
        if (client.clnt_name) props.updateClient(client);
    }

    return (
        <form>
            <label>Client Name</label>
            <input className="form-control" type="text" value={client.clnt_name} name="clnt_name" onChange={handleChange} />
            <br/>
            <button className="btn btn-primary btn-md" type="submit" onClick={handleSubmit} >Edit Client</button>&nbsp;
            <button className="btn btn-primary btn-md" type="submit" onClick={() => props.setEditing(false)} >Cancel</button>
        </form>
    )
}

export default EditClientForm;
import React, {useState} from 'react';

const AddClientForm = (props) => {

    console.log(props);

    const initClient = { id: null, clnt_name: "" };

    const [client, setClient] = useState(initClient);

    const handleChange = e => {
        const {name, value} = e.target;
        setClient({...client, [name]: value});
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (client.clnt_name ) {
            handleChange(e, props.addClient(client));
        }
    }

    return (
        <form>
            <label>Clientname</label>
            <input className="form-control" type="text" value={client.clnt_name} name="clnt_name" onChange={handleChange} /><br/>
            <button className="btn btn-primary btn-md" type="submit" onClick={handleSubmit} >Add Client</button>
        </form>
    )
}

export default AddClientForm;
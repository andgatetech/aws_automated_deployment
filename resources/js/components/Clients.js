import React, {useState,useEffect} from 'react'
import ClientTable from '../tables/ClientTable';
import AddClientForm from '../forms/AddClientForm';
import EditClientForm from '../forms/EditClientForm';
import clientAsyncRequest from '../hooks/clientAsyncRequest';

  const Clients = () => {
 
  const [data, loading] = clientAsyncRequest();

  const [clients, setClients] = useState(null);

   useEffect(() => {
    if (data) {
      const formattedClients = data.map((obj, i) => {
        return {
          id: obj.id,
          clnt_name: obj.clnt_name
        };
      });
      setClients(formattedClients);
    }
  }, [data]);

  const addClient = (client) => {
    axios.post('api/v1/client/create', client)
    .then(response => {
      client.id = response.data;
      setClients([...clients, client]);
    })
    .catch(error => {
      alert('Cannot Add Client');
      console.log(error.response)
    });
      
    };

  const deleteFromDB = (id) => {
    axios.delete('/api/v1/client/delete/'+id)
  };

  const deleteClient = (id) => {
    setClients(clients.filter((client) => client.id !== id));
    deleteFromDB(id);
  };

  const [editing, setEditing] = useState(false);

  const initialClient = { id: null, clnt_name: ""};

  const [currentClient, setCurrentClient] = useState(initialClient);

  const editClient = (id, client) => {
    setEditing(true);
    setCurrentClient(client);
  };

  const updateClient = (newClient) => {
    axios.post('/api/v1/client/update/'+newClient.id, newClient)
    .then(response => { 
      setClients(
        clients.map((client) => (client.id === currentClient.id ? newClient : client))
      );
      setCurrentClient(initialClient);
      setEditing(false);
    })
    .catch(error => {
      alert('Cannot Add Client');
      console.log(error.response)
    });
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          {editing ? (
            <div>
              <h2>Edit client</h2>
              <EditClientForm
                currentClient={currentClient}
                setEditing={setEditing}
                updateClient={updateClient}
              />
            </div>
          ) : (
            <div>
              <h2>Add client</h2>
              <AddClientForm addClient={addClient} />
            </div>
          )}
        </div>
        {loading || !clients ? (
          <p>Loading...</p>
        ) : (
          <div className="col-md-7">
            <h2>View clients</h2>

            <ClientTable
              clients={clients}
              deleteClient={deleteClient}
              editClient={editClient}
            />
          </div>
        )}
      </div>
    </div>
  );
        }

  export default Clients;
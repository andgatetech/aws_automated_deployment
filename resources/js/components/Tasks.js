import React, {useState,useEffect} from 'react'
import TaskTable from '../tables/TaskTable';
import EditTaskForm from '../forms/EditTaskForm';
import taskAsyncRequest from '../hooks/taskAsyncRequest';

  const Tasks = () => {
 
  const [data, loading] = taskAsyncRequest();

  const [tasks, setTasks] = useState(null);

   useEffect(() => {
    if (data) {
      const formattedTasks = data.map((obj, i) => {
        return {
          id: obj.id,
          task_name: obj.task_name,
          start_date: obj.start_date,
          end_date: obj.end_date,
          perfomance_rate: obj.perfomance_rate,
        };
      });
      setTasks(formattedTasks);
    }
  }, [data]);

  const deleteFromDB = (id) => {
    axios.delete('/api/v1/tasks/delete/'+id)
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
    deleteFromDB(id);
  };

  const [editing, setEditing] = useState(false);

  const initialTask = { id: null, task_name: "", start_date: "", end_date: "", perfomance_rate: "" };

  const [currentTask, setCurrentTask] = useState(initialTask);

  const editTask = (id, task) => {
    setEditing(true);
    setCurrentTask(task);
  };

  const updateTask = (newTask) => {
    axios.post('/api/v1/tasks/update/'+newTask.id, newTask)
    .then(response => { 
      setTasks(
        tasks.map((task) => (task.id === currentTask.id ? newTask : task))
      );
      setCurrentTask(initialTask);
      setEditing(false);
    })
    .catch(error => {
      console.log(error.response)
    });
    
  };

  return (
    <div className="container">
      <div className="row">
        {loading || !tasks ? (
          <p>Loading...</p>
        ) : (
          <div className="col-md-7">
            <h2>View tasks</h2>

            <TaskTable
              tasks={tasks}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          </div>
        )}
        <div className="col-md-5">
          {editing ? (
            <div>
              <h2>Edit task</h2>
              <EditTaskForm
                currentTask={currentTask}
                setEditing={setEditing}
                updateTask={updateTask}
              />
            </div>
          ) : (
            <div>
             
              
            </div>
          )}
        </div>
      </div>
    </div>
  );
        }

  export default Tasks;
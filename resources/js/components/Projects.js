import React, {useState,useEffect} from 'react'
import ProjectTable from '../tables/ProjectTable';
import AddProjectForm from '../forms/AddProjectForm';
import EditProjectForm from '../forms/EditProjectForm';
import projectAsyncRequest from '../hooks/projectAsyncRequest';

  const Projects = () => {
 
  const [data, loading] = projectAsyncRequest();

  const [projects, setProjects] = useState(null);

   useEffect(() => {
    if (data) {
      const formattedProjects = data.map((obj, i) => {
        return {
          id: obj.id,
          prj_name: obj.prj_name
        };
      });
      setProjects(formattedProjects);
    }
  }, [data]);

  const addProject = (project) => {
    axios.post('api/v1/project/create', project)
    .then(response => {
      project.id = response.data;
      setProjects([...projects, project]);
    })
    .catch(error => {
      alert('Cannot Add Project');
      console.log(error.response)
    });
      
    };

  const deleteFromDB = (id) => {
    axios.delete('/api/v1/project/delete/'+id)
  };

  const deleteProject = (id) => {
    setProjects(projects.filter((project) => project.id !== id));
    deleteFromDB(id);
  };

  const [editing, setEditing] = useState(false);

  const initialProject = { id: null, prj_name: ""};

  const [currentProject, setCurrentProject] = useState(initialProject);

  const editProject = (id, project) => {
    setEditing(true);
    setCurrentProject(project);
  };

  const updateProject = (newProject) => {
    axios.post('/api/v1/project/update/'+newProject.id, newProject)
    .then(response => { 
      setProjects(
        projects.map((project) => (project.id === currentProject.id ? newProject : project))
      );
      setCurrentProject(initialProject);
      setEditing(false);
    })
    .catch(error => {
      alert('Cannot Add project');
      console.log(error.response)
    });
    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5">
          {editing ? (
            <div>
              <h2>Edit project</h2>
              <EditProjectForm
                currentProject={currentProject}
                setEditing={setEditing}
                updateProject={updateProject}
              />
            </div>
          ) : (
            <div>
              <h2>Add project</h2>
              <AddProjectForm addProject={addProject} />
            </div>
          )}
        </div>
        {loading || !projects ? (
          <p>Loading...</p>
        ) : (
          <div className="col-md-7">
            <h2>View projects</h2>

            <ProjectTable
              projects={projects}
              deleteProject={deleteProject}
              editProject={editProject}
            />
          </div>
        )}
      </div>
    </div>
  );
        }

  export default Projects;